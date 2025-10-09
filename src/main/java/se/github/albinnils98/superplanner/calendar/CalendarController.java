package se.github.albinnils98.superplanner.calendar;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import se.github.albinnils98.superplanner.calendar.dto.CalendarBasicDto;
import se.github.albinnils98.superplanner.calendar.dto.CalendarDto;
import se.github.albinnils98.superplanner.calendar.dto.CalendarItemDto;
import se.github.albinnils98.superplanner.user.UserPrincipal;

import java.time.LocalDate;
import java.util.List;

@PreAuthorize("isAuthenticated()")
@Controller
public class CalendarController {

  private final CalendarService calendarService;
  public CalendarController(CalendarService calendarService) {
    this.calendarService = calendarService;
  }


  @QueryMapping
  public List<CalendarBasicDto> getCalendars(
      @AuthenticationPrincipal UserPrincipal user
  ) {
    return calendarService.getCalendars(user.getId());
  }

  @QueryMapping
  public CalendarDto getCalendar(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer calendarId
  ){
    return calendarService.getCalendar(user.getId(), calendarId);
  }

  @MutationMapping
  public CalendarDto addCalendar(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument String name
  ) {
    return calendarService.createCalendar(user.getId(), name);
  }

  @MutationMapping
  public CalendarDto updateCalendar(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer calendarId,
      @Argument String name) {
    return calendarService.updateCalendar(user.getId(), calendarId, name);
  }

  @MutationMapping
  public Boolean deleteCalendar(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer calendarId
  ){
    return calendarService.deleteCalendar(user.getId(), calendarId);
  }

  @MutationMapping
  public CalendarItemDto addCalendarItem(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer calendarId,
      @Argument String text,
      @Argument LocalDate date
      ){
    return calendarService.addCalendarItem(user.getId(), calendarId, text, date);
  }

  @MutationMapping
  public CalendarItemDto updateCalendarItem(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer itemId,
      @Argument String text
  ){
    return calendarService.updateCalendarItem(user.getId(), itemId, text);
  }

  @MutationMapping
  public Boolean deleteCalendarItem(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer itemId
  ){
    return calendarService.deleteCalendarItem(user.getId(), itemId);
  }
}

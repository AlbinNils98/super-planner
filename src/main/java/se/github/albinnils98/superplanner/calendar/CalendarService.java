package se.github.albinnils98.superplanner.calendar;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.github.albinnils98.superplanner.calendar.dto.CalendarDto;
import se.github.albinnils98.superplanner.calendar.dto.CalendarItemDto;
import se.github.albinnils98.superplanner.calendar.entity.Calendar;
import se.github.albinnils98.superplanner.calendar.entity.CalendarItem;
import se.github.albinnils98.superplanner.calendar.repository.CalendarItemRepository;
import se.github.albinnils98.superplanner.calendar.repository.CalendarRepository;
import se.github.albinnils98.superplanner.exception.GraphqlException;
import se.github.albinnils98.superplanner.user.UserEntity;
import se.github.albinnils98.superplanner.user.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalendarService {

  private final UserRepository userRepository;
  private final CalendarRepository calendarRepository;
  private final CalendarItemRepository calendarItemRepository;

  public CalendarService(CalendarRepository calendarRepository, CalendarItemRepository calendarItemRepository, UserRepository userRepository) {
    this.calendarRepository = calendarRepository;
    this.calendarItemRepository = calendarItemRepository;
    this.userRepository = userRepository;
  }

  public List<CalendarDto> getCalendars(Integer userId) {
    return calendarRepository.findByUserId(userId).stream()
        .map(CalendarDto::fromEntity)
        .toList();
  }

  @Transactional
  public CalendarDto createCalendar(Integer userId, String name) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new GraphqlException("User not found"));

    Calendar calendar = new Calendar();
    if (name.trim().isEmpty()) {
      throw new GraphqlException("Name has to contain at least one character");
    }
    calendar.setName(name);
    calendar.setUser(user);

    try{
      Calendar saved = calendarRepository.save(calendar);
      return CalendarDto.fromEntity(saved);
    } catch (Exception e) {
      throw new GraphqlException("Failed to create calendar");
    }
  }

  @Transactional
  public CalendarDto updateCalendar(Integer userId, Integer calendarId, String name) {
    Calendar calendar = calendarRepository.findById(calendarId)
        .orElseThrow(() -> new GraphqlException("No calendar found for id " + calendarId));

    if(!calendar.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this calendar");
    }

    if (name != null && !name.trim().isEmpty()) {
      calendar.setName(name);
    }

    try {
      Calendar saved = calendarRepository.save(calendar);
      return CalendarDto.fromEntity(saved);
    }catch (Exception e) {
      throw new GraphqlException("Failed to update calendar");
    }

  }

  @Transactional
  public Boolean deleteCalendar(Integer userId, Integer calendarId) {
    Calendar calendar = calendarRepository.findById(calendarId)
        .orElseThrow(() -> new GraphqlException("No calendar found for id " + calendarId));

    if (!calendar.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to delete this calendar");
    }

    try{
      calendarRepository.delete(calendar);
      return true;
    }catch (Exception e) {
      throw new GraphqlException("Failed to delete calendar");
    }
  }

@Transactional
  public CalendarItemDto addCalendarItem(Integer userId, Integer calendarId, String text, LocalDate date) {
    Calendar calendar = calendarRepository.findById(calendarId)
        .orElseThrow(() -> new GraphqlException("No calendar found for id " + calendarId));

    if (!calendar.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to add items to this calendar");
    }

    CalendarItem item = new CalendarItem();

    if(text.trim().isEmpty()){
      throw new GraphqlException("Text has to contain at least one character");
    }

    item.setCalendar(calendar);
    item.setText(text);
    item.setDate(date);

    try {
      CalendarItem saved = calendarItemRepository.save(item);
      return CalendarItemDto.fromEntity(saved);
    }catch (Exception e) {
      throw new GraphqlException("Failed to add calendar item");
    }
  }

  @Transactional
  public CalendarItemDto updateCalendarItem(Integer userId, Integer itemId, String text) {
    CalendarItem item = calendarItemRepository.findById(itemId)
        .orElseThrow(() -> new GraphqlException("No calendar item found for id " + itemId));

    if(!item.getCalendar().getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this calendar item");
    }

    if(text != null && !text.trim().isEmpty()){
      item.setText(text);
    }

    try {
      CalendarItem saved = calendarItemRepository.save(item);
      return CalendarItemDto.fromEntity(saved);
    }catch (Exception e) {
      throw new GraphqlException("Failed to update calendar item");
    }
  }

  @Transactional
  public Boolean deleteCalendarItem(Integer userId, Integer itemId) {
    CalendarItem item = calendarItemRepository.findById(itemId)
        .orElseThrow(() -> new GraphqlException("No calendar item found for id " + itemId));

    if(!item.getCalendar().getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to delete this calendar item");
    }

    try {
      calendarItemRepository.delete(item);
      return true;
    }catch (Exception e) {
      throw new GraphqlException("Failed to delete calendar item");
    }
  }
}

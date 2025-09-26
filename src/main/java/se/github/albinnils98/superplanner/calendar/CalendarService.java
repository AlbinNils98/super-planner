package se.github.albinnils98.superplanner.calendar;

import org.springframework.stereotype.Service;
import se.github.albinnils98.superplanner.calendar.dto.CalendarDto;
import se.github.albinnils98.superplanner.calendar.entity.Calendar;
import se.github.albinnils98.superplanner.calendar.repository.CalendarItemRepository;
import se.github.albinnils98.superplanner.calendar.repository.CalendarRepository;
import se.github.albinnils98.superplanner.exception.GraphqlException;
import se.github.albinnils98.superplanner.user.UserEntity;
import se.github.albinnils98.superplanner.user.UserRepository;

import java.util.List;

@Service
public class CalendarService {

  private final UserRepository userRepository;
  private CalendarRepository calendarRepository;
  private CalendarItemRepository calendarItemRepository;

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

  public CalendarDto createCalendar(Integer userId, String name) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User with not found"));

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

}

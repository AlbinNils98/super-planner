package se.github.albinnils98.superplanner.calendar.dto;

import se.github.albinnils98.superplanner.calendar.entity.CalendarItem;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record CalendarItemDto(
    Integer id,
    String text,
    LocalDate date,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static CalendarItemDto fromEntity(CalendarItem calendarItem) {
    return new CalendarItemDto(
        calendarItem.getId(),
        calendarItem.getText(),
        calendarItem.getDate(),
        calendarItem.getCreatedAt().atOffset(ZoneOffset.UTC),
        calendarItem.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

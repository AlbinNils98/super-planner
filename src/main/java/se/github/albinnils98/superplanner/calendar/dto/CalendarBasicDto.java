package se.github.albinnils98.superplanner.calendar.dto;

import se.github.albinnils98.superplanner.calendar.entity.Calendar;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record CalendarBasicDto(
    Integer id,
    String name,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static CalendarBasicDto fromEntity(Calendar entity) {
    return new CalendarBasicDto(
        entity.getId(),
        entity.getName(),
        entity.getCreatedAt().atOffset(ZoneOffset.UTC),
        entity.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

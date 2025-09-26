package se.github.albinnils98.superplanner.calendar.dto;

import se.github.albinnils98.superplanner.calendar.entity.Calendar;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

public record CalendarDto(
    Integer id,
    String name,
    List<CalendarItemDto> items,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static CalendarDto fromEntity(Calendar calendar) {
    List<CalendarItemDto> items = calendar.getItems() == null
        ? List.of()
        : calendar.getItems().stream()
        .map(CalendarItemDto::fromEntity)
        .collect(Collectors.toList());
    return new CalendarDto(
        calendar.getId(),
        calendar.getName(),
        items,
        calendar.getCreatedAt().atOffset(ZoneOffset.UTC),
        calendar.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

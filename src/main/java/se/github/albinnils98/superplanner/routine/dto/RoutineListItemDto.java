package se.github.albinnils98.superplanner.routine.dto;

import se.github.albinnils98.superplanner.routine.entity.RoutineListItem;

import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record RoutineListItemDto(
    Integer id,
    String text,
    String timeOfDay,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static RoutineListItemDto fromEntity(RoutineListItem item){
    return new RoutineListItemDto(
        item.getId(),
        item.getText(),
        item.getTimeOfDay().toString(),
        item.getCreatedAt().atOffset(ZoneOffset.UTC),
        item.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

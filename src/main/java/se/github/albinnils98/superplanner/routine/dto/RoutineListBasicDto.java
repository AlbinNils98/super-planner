package se.github.albinnils98.superplanner.routine.dto;

import se.github.albinnils98.superplanner.routine.entity.RoutineList;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record RoutineListBasicDto(
    Integer id,
    String name,
    Boolean completed,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static RoutineListBasicDto fromEntity(RoutineList entity) {
    return new RoutineListBasicDto(
        entity.getId(),
        entity.getName(),
        entity.getCompleted(),
        entity.getCreatedAt().atOffset(ZoneOffset.UTC),
        entity.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

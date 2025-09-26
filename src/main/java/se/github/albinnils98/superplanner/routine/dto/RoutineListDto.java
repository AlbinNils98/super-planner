package se.github.albinnils98.superplanner.routine.dto;

import se.github.albinnils98.superplanner.routine.entity.RoutineList;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

public record RoutineListDto(
    Integer id,
    String name,
    Boolean completed,
    List<RoutineListItemDto> items,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static RoutineListDto fromEntity(RoutineList routineList) {
    List<RoutineListItemDto> items = routineList.getItems() == null
        ? List.of()
        : routineList.getItems().stream()
        .map(RoutineListItemDto::fromEntity)
        .collect(Collectors.toList());

    return new RoutineListDto(
        routineList.getId(),
        routineList.getName(),
        routineList.getCompleted(),
        items,
        routineList.getCreatedAt().atOffset(ZoneOffset.UTC),
        routineList.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

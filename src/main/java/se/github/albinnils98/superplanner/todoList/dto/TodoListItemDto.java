package se.github.albinnils98.superplanner.todoList.dto;

import se.github.albinnils98.superplanner.todoList.entity.TodoListItem;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record TodoListItemDto(
    Integer id,
    String text,
    Boolean completed,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static TodoListItemDto fromEntity(TodoListItem item) {
    return new TodoListItemDto(
        item.getId(),
        item.getText(),
        item.isCompleted(),
        item.getCreatedAt().atOffset(ZoneOffset.UTC),
        item.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

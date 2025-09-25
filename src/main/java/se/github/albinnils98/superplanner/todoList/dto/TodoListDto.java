package se.github.albinnils98.superplanner.todoList.dto;

import se.github.albinnils98.superplanner.todoList.entity.TodoList;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

public record TodoListDto(
    Integer id,
    String name,
    List<TodoListItemDto> items,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static TodoListDto fromEntity(TodoList todoList) {
    List<TodoListItemDto> items = todoList.getItems() == null
        ? List.of()
        : todoList.getItems().stream()
        .map(TodoListItemDto::fromEntity)
        .collect(Collectors.toList());

    return new TodoListDto(
        todoList.getId(),
        todoList.getName(),
        items,
        todoList.getCreatedAt().atOffset(ZoneOffset.UTC),
        todoList.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

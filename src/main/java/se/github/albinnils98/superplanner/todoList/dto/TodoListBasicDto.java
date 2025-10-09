package se.github.albinnils98.superplanner.todoList.dto;

import se.github.albinnils98.superplanner.todoList.entity.TodoList;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record TodoListBasicDto(
    Integer id,
    String name,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt

) {
  public static TodoListBasicDto fromEntity(TodoList entity){
    return new TodoListBasicDto(
        entity.getId(),
        entity.getName(),
        entity.getCreatedAt().atOffset(ZoneOffset.UTC),
        entity.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

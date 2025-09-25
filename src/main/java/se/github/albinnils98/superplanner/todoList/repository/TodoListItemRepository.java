package se.github.albinnils98.superplanner.todoList.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.todoList.entity.TodoListItem;

public interface TodoListItemRepository extends JpaRepository<TodoListItem, Integer> {
}

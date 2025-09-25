package se.github.albinnils98.superplanner.todoList.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.todoList.entity.TodoList;

import java.util.List;

public interface TodoListRepository extends JpaRepository<TodoList, Integer> {
  List<TodoList> findByUserId(Integer userId);
}

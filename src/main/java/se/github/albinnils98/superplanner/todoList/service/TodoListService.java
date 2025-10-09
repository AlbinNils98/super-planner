package se.github.albinnils98.superplanner.todoList.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.github.albinnils98.superplanner.exception.GraphqlException;
import se.github.albinnils98.superplanner.todoList.dto.TodoListBasicDto;
import se.github.albinnils98.superplanner.todoList.dto.TodoListDto;
import se.github.albinnils98.superplanner.todoList.dto.TodoListItemDto;
import se.github.albinnils98.superplanner.todoList.entity.TodoList;
import se.github.albinnils98.superplanner.todoList.entity.TodoListItem;
import se.github.albinnils98.superplanner.todoList.repository.TodoListItemRepository;
import se.github.albinnils98.superplanner.todoList.repository.TodoListRepository;
import se.github.albinnils98.superplanner.user.UserEntity;
import se.github.albinnils98.superplanner.user.UserRepository;

import java.util.List;

@Service
public class TodoListService {

  private final TodoListRepository todoListRepository;
  private final TodoListItemRepository todoListItemRepository;
  private final UserRepository userRepository;

  public TodoListService(TodoListRepository todoListRepository, TodoListItemRepository todoListItemRepository, UserRepository userRepository) {
    this.todoListRepository = todoListRepository;
    this.todoListItemRepository = todoListItemRepository;
    this.userRepository = userRepository;
  }

  public List<TodoListBasicDto> getTodoLists(Integer userId) {
    return todoListRepository.findByUserId(userId).stream()
        .map(TodoListBasicDto::fromEntity)
        .toList();
  }

  public TodoListDto getTodoList(Integer userId, Integer listId) {
    TodoList list = todoListRepository.findById(listId)
        .orElseThrow(() -> new GraphqlException("No list found for id " + listId));

    if(!list.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to access this list");
    }

    return TodoListDto.fromEntity(list);
  }

@Transactional
  public TodoListDto createTodoList(Integer userId, String name){
    UserEntity user = userRepository.findById(userId).orElseThrow(() -> new GraphqlException("User not found"));

    TodoList todoList = new TodoList();
    todoList.setName(name);
    todoList.setUser(user);

    try {
      TodoList saved = todoListRepository.save(todoList);
      return TodoListDto.fromEntity(saved);
    } catch (Exception ex) {
      throw new GraphqlException("Failed to save todo list");
    }
  }

  @Transactional
  public TodoListDto updateTodoList(Integer userId, Integer listId, String name) {
    TodoList list = todoListRepository.findById(listId)
        .orElseThrow(() -> new GraphqlException("No list found for id " + listId));

    if (!list.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this list");
    }

    if(name != null){
      if(name.length() > 20) {
        throw new GraphqlException("Name cannot exceed 20 characters");
      }
      list.setName(name);
    }

    try{
      TodoList saved = todoListRepository.save(list);
      return TodoListDto.fromEntity(saved);
    } catch (Exception e) {
      throw new GraphqlException("Failed to update list");
    }
  }

  @Transactional
  public Boolean deleteTodoList(Integer userId, Integer listId) {
    TodoList list = todoListRepository.findById(listId)
        .orElseThrow(() -> new GraphqlException("No list found for id " + listId));

    if (!list.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this list");
    }

    try{
      todoListRepository.delete(list);
      return true;
    } catch (Exception e) {
      throw new GraphqlException("Failed to delete list");
    }
  }

@Transactional
  public TodoListItemDto createTodoListItem(Integer userId, Integer listId, String text){
    TodoList list = todoListRepository.findById(listId).orElseThrow(() -> new GraphqlException("No list found for id " + listId));

  if (!list.getUser().getId().equals(userId)) {
    throw new GraphqlException("You do not have permission to update this list");
  }

    TodoListItem item = new TodoListItem();
    item.setText(text);
    item.setTodoList(list);

    try {
      TodoListItem saved = todoListItemRepository.save(item);
      return TodoListItemDto.fromEntity(saved);
    } catch (Exception ex) {
      throw new GraphqlException("Failed to save todo list item");
    }
  }

  @Transactional
  public TodoListItemDto updateTodoListItem(Integer userId, Integer itemId, Boolean isCompleted) {
    TodoListItem item = todoListItemRepository.findById(itemId)
        .orElseThrow(() -> new GraphqlException("No list item found for id " + itemId));

    if (!item.getTodoList().getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this item");
    }

    if(isCompleted != null){
      item.setCompleted(isCompleted);
    }

    try{
      TodoListItem saved = todoListItemRepository.save(item);
      return TodoListItemDto.fromEntity(saved);
    } catch (Exception e) {
      throw new GraphqlException("Failed to update list item");
    }
  }

  @Transactional
  public Boolean deleteTodoListItem(Integer userId, Integer itemId) {
    TodoListItem item = todoListItemRepository.findById(itemId)
        .orElseThrow(() -> new GraphqlException("No list item found for id " + itemId));

    if (!item.getTodoList().getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this item");
    }

    try{
      todoListItemRepository.delete(item);
      return true;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}

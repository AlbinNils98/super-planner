package se.github.albinnils98.superplanner.todoList;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import se.github.albinnils98.superplanner.todoList.dto.TodoListBasicDto;
import se.github.albinnils98.superplanner.todoList.dto.TodoListDto;
import se.github.albinnils98.superplanner.todoList.dto.TodoListItemDto;
import se.github.albinnils98.superplanner.todoList.service.TodoListService;
import se.github.albinnils98.superplanner.user.UserPrincipal;

import java.util.List;

@PreAuthorize("isAuthenticated()")
@Controller
public class TodoListController {

  private final TodoListService todoListService;

  public TodoListController(TodoListService todoListService){
    this.todoListService = todoListService;
  }

  @QueryMapping
  public List<TodoListBasicDto> getTodoLists(@AuthenticationPrincipal UserPrincipal user) throws Exception{
    return todoListService.getTodoLists(user.getId());
  }

  @QueryMapping
  public TodoListDto getTodoList(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer listId
  ){
    return todoListService.getTodoList(user.getId(), listId);
  }

  @MutationMapping
  public TodoListDto createTodoList(@AuthenticationPrincipal UserPrincipal user, @Argument String name) throws Exception{
    return todoListService.createTodoList(user.getId(), name);
  }

  @MutationMapping
  public TodoListDto updateTodoList(@AuthenticationPrincipal UserPrincipal user, @Argument Integer listId, @Argument String name ) throws Exception{
    return todoListService.updateTodoList(user.getId(), listId, name);
  }

  @MutationMapping
  public Boolean deleteTodoList(@AuthenticationPrincipal UserPrincipal user, @Argument Integer listId) throws Exception{
    return todoListService.deleteTodoList(user.getId(), listId);
  }

  @MutationMapping
  public TodoListItemDto addTodoListItem(@AuthenticationPrincipal UserPrincipal user, @Argument Integer listId, @Argument String text) throws Exception{
    return todoListService.createTodoListItem(user.getId(), listId, text);
  }

  @MutationMapping
  public TodoListItemDto updateTodoListItem(@AuthenticationPrincipal UserPrincipal user, @Argument Integer itemId, @Argument Boolean isCompleted) throws Exception {
    return todoListService.updateTodoListItem(user.getId(), itemId, isCompleted);
  }
  @MutationMapping
  public Boolean deleteTodoListItem(@AuthenticationPrincipal UserPrincipal user, @Argument Integer itemId) throws Exception{
    return todoListService.deleteTodoListItem(user.getId(), itemId);
  }
}

package se.github.albinnils98.superplanner.routine;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import se.github.albinnils98.superplanner.routine.dto.RoutineListDto;
import se.github.albinnils98.superplanner.routine.dto.RoutineListItemDto;
import se.github.albinnils98.superplanner.user.UserPrincipal;

import java.util.List;

@Controller
public class RoutineController {

  private final RoutineListService routineListService;

  public RoutineController(RoutineListService routineListService) {
    this.routineListService = routineListService;
  }

  @QueryMapping
  public List<RoutineListDto> getRoutineLists(
      @AuthenticationPrincipal UserPrincipal user
      ){
    return routineListService.getRoutineLists(user.getId());
  }

  @MutationMapping
  public RoutineListDto createRoutineList(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument String name
      ){
    return routineListService.createRoutineList(user.getId(), name);
  }

  @MutationMapping
  public RoutineListDto updateRoutineList(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer listId,
      @Argument String name,
      @Argument Boolean isCompleted
  ){
    return routineListService.updateRoutineList(user.getId(), listId, name, isCompleted);
  }

  @MutationMapping
  public Boolean deleteRoutineList(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer listId
  ){
    return routineListService.deleteRoutineList(user.getId(), listId);
  }

  @MutationMapping
  public RoutineListItemDto addRoutineListItem(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer listId,
      @Argument String text,
      @Argument String timeOfDay
  ){
    return routineListService.createRoutineListItem(user.getId(), listId, text, timeOfDay);
  }

  @MutationMapping
  public Boolean deleteRoutineListItem(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer itemId
  ){
    return routineListService.deleteRoutineListItem(user.getId(), itemId);
  }
}

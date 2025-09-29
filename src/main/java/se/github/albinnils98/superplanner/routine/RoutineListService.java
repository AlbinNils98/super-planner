package se.github.albinnils98.superplanner.routine;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.github.albinnils98.superplanner.exception.GraphqlException;
import se.github.albinnils98.superplanner.routine.dto.RoutineListDto;
import se.github.albinnils98.superplanner.routine.dto.RoutineListItemDto;
import se.github.albinnils98.superplanner.routine.entity.RoutineList;
import se.github.albinnils98.superplanner.routine.entity.RoutineListItem;
import se.github.albinnils98.superplanner.routine.repository.RoutineListItemRepository;
import se.github.albinnils98.superplanner.routine.repository.RoutineListRepository;
import se.github.albinnils98.superplanner.user.UserEntity;
import se.github.albinnils98.superplanner.user.UserRepository;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;
import java.util.List;

@Service
public class RoutineListService {

  private final RoutineListRepository routineListRepository;
  private final RoutineListItemRepository routineListItemRepository;
  private final UserRepository userRepository;

  public RoutineListService(
      RoutineListRepository routineListRepository,
      RoutineListItemRepository routineListItemRepository,
      UserRepository userRepository) {
    this.routineListRepository = routineListRepository;
    this.routineListItemRepository = routineListItemRepository;
    this.userRepository = userRepository;
  }

  public List<RoutineListDto> getRoutineLists(Integer userId) {
    return routineListRepository.findByUserId(userId).stream()
        .map(RoutineListDto::fromEntity)
        .toList();
  }

  @Transactional
  public RoutineListDto createRoutineList(Integer id, String name) {
    UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new GraphqlException("User not found"));

    RoutineList list = new RoutineList();
    if(name.isEmpty()){
      throw new GraphqlException("Name has to include at least one character");
    }
    if(name.length() > 20) {
      throw new GraphqlException("Name cannot be longer than 20 characters");
    }
    list.setName(name);
    list.setUser(user);
     try{
       RoutineList saved = routineListRepository.save(list);
       return RoutineListDto.fromEntity(saved);
     }catch(Exception e) {
       throw new GraphqlException("Failed to create routine list");
     }
  }

  @Transactional
  public RoutineListDto updateRoutineList(Integer userId, Integer listId, String name, Boolean isCompleted) {
    RoutineList list = routineListRepository.findById(listId)
        .orElseThrow(() -> new GraphqlException("No routine list found for id " + listId));

    if (!list.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this list");
    }

    if(name != null && !name.isEmpty()) {
      if(name.length() > 20) {
        throw new GraphqlException("Name cannot be longer than 20 characters");
      }
      list.setName(name);
    }

    if(isCompleted != null) {
      list.setCompleted(isCompleted);
    }

    try{
      RoutineList saved = routineListRepository.save(list);
      return RoutineListDto.fromEntity(saved);
    } catch (Exception e) {
      throw new GraphqlException("Failed to update routine list");
    }
  }

  @Transactional
  public Boolean deleteRoutineList(Integer userId, Integer listId) {
    RoutineList list = routineListRepository.findById(listId)
            .orElseThrow(() -> new GraphqlException("No routine list found for id " + listId));

    if (!list.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this list");
    }

    try {
      routineListRepository.delete(list);
      return true;
    } catch (Exception e) {
      throw new GraphqlException("Failed to delete routine list");
    }
  }

  @Transactional
  public RoutineListItemDto createRoutineListItem(Integer userId, Integer listId, String text, String timeOfDay) {
    RoutineList list = routineListRepository.findById(listId)
        .orElseThrow(() -> new GraphqlException("No routine list found for id " + listId));

    if (!list.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this list");
    }

    RoutineListItem item = new RoutineListItem();
    item.setRoutineList(list);

    if(text.trim().isEmpty()) {
      throw new GraphqlException("Text has to include at least one character");
    }

    item.setText(text);

    DateTimeFormatter hhmmFormatter = DateTimeFormatter
        .ofPattern("HH:mm")
        .withResolverStyle(ResolverStyle.STRICT);

    try {
      LocalTime localTime = LocalTime.parse(timeOfDay, hhmmFormatter);
      item.setTimeOfDay(localTime);
    } catch (Exception ex) {
      throw new GraphqlException("timeOfDay must be in HH:mm format");
    }

    try{
      RoutineListItem saved = routineListItemRepository.save(item);
      return RoutineListItemDto.fromEntity(saved);
    } catch (Exception e) {
      throw new GraphqlException("Failed to create routine list item");
    }
  }

  @Transactional
  public Boolean deleteRoutineListItem(Integer userId, Integer itemId) {
    RoutineListItem item = routineListItemRepository.findById(itemId)
        .orElseThrow(() -> new GraphqlException("No routine list item found for id " + itemId));
    if (!item.getRoutineList().getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this list");
    }

    try{
      routineListItemRepository.delete(item);
      return true;
    } catch (Exception e) {
      throw new GraphqlException("Failed to delete routine list item");
    }
  }
}

package se.github.albinnils98.superplanner.routine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.routine.entity.RoutineListItem;

public interface RoutineListItemRepository extends JpaRepository<RoutineListItem, Integer> {
}

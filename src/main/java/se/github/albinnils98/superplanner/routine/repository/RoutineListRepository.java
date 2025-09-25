package se.github.albinnils98.superplanner.routine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.routine.entity.RoutineList;

public interface RoutineListRepository extends JpaRepository<RoutineList, Integer> {
}

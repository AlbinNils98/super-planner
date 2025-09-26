package se.github.albinnils98.superplanner.routine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.routine.entity.RoutineList;

import java.util.List;

public interface RoutineListRepository extends JpaRepository<RoutineList, Integer> {
  List<RoutineList> findByUserId(Integer userId);
}

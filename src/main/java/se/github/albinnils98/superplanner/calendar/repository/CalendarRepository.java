package se.github.albinnils98.superplanner.calendar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.calendar.entity.Calendar;

import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
  List<Calendar> findByUserId(Integer userId);
}

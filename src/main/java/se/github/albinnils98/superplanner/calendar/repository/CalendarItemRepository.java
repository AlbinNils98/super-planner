package se.github.albinnils98.superplanner.calendar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.calendar.entity.CalendarItem;

public interface CalendarItemRepository extends JpaRepository<CalendarItem, Integer> {
}

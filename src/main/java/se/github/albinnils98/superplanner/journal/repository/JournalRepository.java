package se.github.albinnils98.superplanner.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.journal.entity.Journal;

import java.util.List;

public interface JournalRepository extends JpaRepository<Journal, Integer> {
  List<Journal> findByUserId(Integer userId);
}

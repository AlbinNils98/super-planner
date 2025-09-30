package se.github.albinnils98.superplanner.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.github.albinnils98.superplanner.journal.entity.JournalEntry;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Integer> {
}

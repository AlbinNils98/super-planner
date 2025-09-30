package se.github.albinnils98.superplanner.journal.dto;

import se.github.albinnils98.superplanner.journal.entity.JournalEntry;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record JournalEntryDto(
    Integer id,
    String text,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {

  public static JournalEntryDto fromEntity(JournalEntry journalEntry) {
    return new JournalEntryDto(
        journalEntry.getId(),
        journalEntry.getText(),
        journalEntry.getCreatedAt().atOffset(ZoneOffset.UTC),
        journalEntry.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

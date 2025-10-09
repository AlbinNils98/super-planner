package se.github.albinnils98.superplanner.journal.dto;

import se.github.albinnils98.superplanner.journal.entity.Journal;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record JournalBasicDto(
    Integer id,
    String name,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public static JournalBasicDto fromEntity(Journal journal) {
    return new JournalBasicDto(
        journal.getId(),
        journal.getName(),
        journal.getCreatedAt().atOffset(ZoneOffset.UTC),
        journal.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

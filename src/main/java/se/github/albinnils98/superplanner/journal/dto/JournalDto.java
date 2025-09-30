package se.github.albinnils98.superplanner.journal.dto;

import se.github.albinnils98.superplanner.journal.entity.Journal;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

public record JournalDto(
    Integer id,
    String name,
    List<JournalEntryDto> entries,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {

  public static JournalDto fromEntity(Journal journal){

    List<JournalEntryDto> entries = journal.getEntries() == null
        ? List.of()
        : journal.getEntries().stream()
        .map(JournalEntryDto::fromEntity)
        .collect(Collectors.toList());

    return new JournalDto(
        journal.getId(),
        journal.getName(),
        entries,
        journal.getCreatedAt().atOffset(ZoneOffset.UTC),
        journal.getUpdatedAt().atOffset(ZoneOffset.UTC)
    );
  }
}

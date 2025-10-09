package se.github.albinnils98.superplanner.journal;

import org.springframework.stereotype.Service;
import se.github.albinnils98.superplanner.exception.GraphqlException;
import se.github.albinnils98.superplanner.journal.dto.JournalBasicDto;
import se.github.albinnils98.superplanner.journal.dto.JournalDto;
import se.github.albinnils98.superplanner.journal.dto.JournalEntryDto;
import se.github.albinnils98.superplanner.journal.entity.Journal;
import se.github.albinnils98.superplanner.journal.entity.JournalEntry;
import se.github.albinnils98.superplanner.journal.repository.JournalEntryRepository;
import se.github.albinnils98.superplanner.journal.repository.JournalRepository;
import se.github.albinnils98.superplanner.user.UserEntity;
import se.github.albinnils98.superplanner.user.UserRepository;

import java.util.List;

@Service
public class JournalService {

  private final JournalRepository journalRepository;
  private final JournalEntryRepository journalEntryRepository;
  private final UserRepository userRepository;

  public JournalService(JournalRepository journalRepository, JournalEntryRepository journalEntryRepository, UserRepository userRepository) {
    this.journalRepository = journalRepository;
    this.journalEntryRepository = journalEntryRepository;
    this.userRepository = userRepository;
  }

  public List<JournalBasicDto> getJournals(Integer userId) {
    return journalRepository.findByUserId(userId).stream()
        .map(JournalBasicDto::fromEntity).toList();
  }

  public JournalDto getJournal(Integer userId, Integer listId) {
    Journal journal = journalRepository.findById(listId)
        .orElseThrow(() -> new GraphqlException("No list found for id " + listId));

    if(!journal.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to access this journal");
    }

    return JournalDto.fromEntity(journal);
  }

  public JournalDto createJournal(Integer userId, String name) {
    UserEntity user = userRepository.findById(userId)
        .orElseThrow(() -> new GraphqlException("User not found"));

    Journal journal = new Journal();
    journal.setUser(user);
    journal.setName(name);

    try{
      Journal saved = journalRepository.save(journal);
      return JournalDto.fromEntity(saved);
    } catch (Exception e) {
      throw new GraphqlException("Failed to create journal");
    }
  }

  public JournalDto updateJournal(Integer userId, Integer journalId, String name) {
    Journal journal = journalRepository.findById(journalId)
        .orElseThrow(() -> new GraphqlException("Could not find journal for id " + journalId));

    if(!journal.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this journal");
    }

    if(name != null && !name.trim().isEmpty()) {
      journal.setName(name);
    }else {
      throw new GraphqlException("Name has to contain atleast one character");
    }

    try {
      Journal saved = journalRepository.save(journal);
      return JournalDto.fromEntity(saved);
    }catch (Exception e) {
      throw new GraphqlException("Failed to update journal");
    }
  }

  public Boolean deleteJournal(Integer userId, Integer journalId) {
    Journal journal = journalRepository.findById(journalId)
        .orElseThrow(() -> new GraphqlException("Could not find journal for id " + journalId));

    if(!journal.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to delete this journal");
    }

    try {
      journalRepository.delete(journal);
      return true;
    }catch (Exception e) {
      throw new GraphqlException("Failed to delete journal");
    }
  }

  public JournalEntryDto addJournalEntry(Integer userId, Integer journalId, String text) {
    Journal journal = journalRepository.findById(journalId)
        .orElseThrow(() -> new GraphqlException("Could not find journal for id " + journalId));

    if(!journal.getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to add entries to this journal");
    }

    JournalEntry entry = new JournalEntry();
    entry.setJournal(journal);

    if(text != null && !text.trim().isEmpty()) {
      entry.setText(text);
    }else {
      throw new GraphqlException("Text has to contain at least one character");
    }

    try {
      JournalEntry saved = journalEntryRepository.save(entry);
      return JournalEntryDto.fromEntity(saved);
    }catch (Exception e) {
      throw new GraphqlException("Failed to add journal entry");
    }
  }

  public JournalEntryDto updateJournalEntry(Integer userId, Integer entryId, String text) {
    JournalEntry entry = journalEntryRepository.findById(entryId)
        .orElseThrow(() -> new GraphqlException("Could not find journal entry for id " + entryId));

    if(!entry.getJournal().getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to update this journal");
    }

    if(text != null && !text.trim().isEmpty()) {
      entry.setText(text);
    }

    try {
      JournalEntry saved = journalEntryRepository.save(entry);
      return JournalEntryDto.fromEntity(saved);
    }catch (Exception e) {
      throw new GraphqlException("Failed to update journal entry");
    }
  }

  public Boolean deleteJournalEntry(Integer userId, Integer entryId) {
    JournalEntry entry = journalEntryRepository.findById(entryId)
        .orElseThrow(() -> new GraphqlException("Could not find journal entry for id " + entryId));

    if(!entry.getJournal().getUser().getId().equals(userId)) {
      throw new GraphqlException("You do not have permission to delete this journal");
    }

    try {
      journalEntryRepository.delete(entry);
      return true;
    }catch (Exception e) {
      throw new GraphqlException("Failed to delete journal entry");
    }
  }
}

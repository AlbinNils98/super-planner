package se.github.albinnils98.superplanner.journal;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import se.github.albinnils98.superplanner.journal.dto.JournalBasicDto;
import se.github.albinnils98.superplanner.journal.dto.JournalDto;
import se.github.albinnils98.superplanner.journal.dto.JournalEntryDto;
import se.github.albinnils98.superplanner.user.UserPrincipal;

import java.util.List;

@PreAuthorize("isAuthenticated()")
@Controller
public class JournalController {

  private final JournalService journalService;
  public JournalController(JournalService journalService) {
    this.journalService = journalService;
  }

  @QueryMapping
  public List<JournalBasicDto> getJournals(
      @AuthenticationPrincipal UserPrincipal user
  ) {
  return journalService.getJournals(user.getId());
  }

  @QueryMapping
  public JournalDto getJournal(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer journalId
  ){
    return journalService.getJournal(user.getId(), journalId);
  }

  @MutationMapping
  public JournalDto addJournal(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument String name
      ) {
  return journalService.createJournal(user.getId(), name);
  }

  @MutationMapping
  public JournalDto updateJournal(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer journalId,
      @Argument String name
  ){
    return journalService.updateJournal(user.getId(), journalId, name);
  }

  @MutationMapping
  public Boolean deleteJournal(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer journalId
  ){
    return journalService.deleteJournal(user.getId(), journalId);
  }

  @MutationMapping
  public JournalEntryDto addJournalEntry(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer journalId,
      @Argument String text
  ){
  return journalService.addJournalEntry(user.getId(), journalId, text);
  }

  @MutationMapping
  public JournalEntryDto updateJournalEntry(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer entryId,
      @Argument String text
  ){
  return journalService.updateJournalEntry(user.getId(), entryId, text);
  }

  @MutationMapping
  public Boolean deleteJournalEntry(
      @AuthenticationPrincipal UserPrincipal user,
      @Argument Integer entryId
  ){
  return journalService.deleteJournalEntry(user.getId(), entryId);
  }
}

package se.github.albinnils98.superplanner.journal.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import se.github.albinnils98.superplanner.BaseEntity;

@Getter
@Setter
@Entity
@Table(name = "journal_entry", schema = "superplannerdb")
public class JournalEntry extends BaseEntity {

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "journal_id", nullable = false)
  private Journal journal;

  @Size(max = 255)
  @Column(name = "text")
  private String text;

}
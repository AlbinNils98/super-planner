package se.github.albinnils98.superplanner.calendar.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import se.github.albinnils98.superplanner.BaseEntity;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "calendar_item")
public class CalendarItem extends BaseEntity {

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "calendar_id", nullable = false)
  private Calendar calendar;

  @Lob
  @Column(name = "text")
  private String text;

  @Column(name = "date")
  private LocalDate date;

}
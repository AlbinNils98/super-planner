package se.github.albinnils98.superplanner.routine.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import se.github.albinnils98.superplanner.BaseEntity;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "routine_list_item", schema = "superplannerdb")
public class RoutineListItem extends BaseEntity {

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "routine_list_id", nullable = false)
  private RoutineList routineList;

  @Lob
  @Column(name = "text")
  private String text;

  @NotNull
  @Column(name = "time_of_day", nullable = false)
  private LocalTime timeOfDay;

}
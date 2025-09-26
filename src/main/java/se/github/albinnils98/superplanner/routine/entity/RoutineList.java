package se.github.albinnils98.superplanner.routine.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import se.github.albinnils98.superplanner.BaseEntity;
import se.github.albinnils98.superplanner.user.UserEntity;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "routine_list", schema = "superplannerdb")
public class RoutineList extends BaseEntity {

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @Size(max = 255)
  @NotNull
  @Column(name = "name", nullable = false)
  private String name;

  @NotNull
  @Column(name = "completed", nullable = false)
  private Boolean completed = false;

  @OneToMany(mappedBy = "routineList", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<RoutineListItem> items;

}
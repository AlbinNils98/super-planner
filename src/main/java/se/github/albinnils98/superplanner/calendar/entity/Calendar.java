package se.github.albinnils98.superplanner.calendar.entity;

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
@Table(name = "calendar")
public class Calendar extends BaseEntity {

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @Size(max = 255)
  @Column(name = "name")
  private String name;

  @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<CalendarItem> items;

}
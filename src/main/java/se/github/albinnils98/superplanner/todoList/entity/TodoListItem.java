package se.github.albinnils98.superplanner.todoList.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import se.github.albinnils98.superplanner.BaseEntity;

@Getter
@Setter
@Entity
@Table(name = "todo_list_item", schema = "superplannerdb")
public class TodoListItem extends BaseEntity {

  @NotNull
  @ManyToOne
  @JoinColumn(name = "todo_list_id", nullable = false)
  private TodoList todoList;

  @Size(max = 255)
  @NotNull
  @Column(name = "text", nullable = false)
  private String text;

  @NotNull
  @Column(name = "completed", nullable = false)
  private boolean completed;

}

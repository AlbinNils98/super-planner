package se.github.albinnils98.superplanner.todoList.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import se.github.albinnils98.superplanner.BaseEntity;
import se.github.albinnils98.superplanner.user.UserEntity;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "todo_list", schema = "superplannerdb")
public class TodoList extends BaseEntity {

  @Size(max = 255)
  @NotNull
  @Column(name = "name", nullable = false)
  private String name;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @OneToMany(mappedBy = "todoList", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<TodoListItem> items;

}

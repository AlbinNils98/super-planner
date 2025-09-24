package se.github.albinnils98.superplanner.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import se.github.albinnils98.superplanner.BaseEntity;

@Getter
@Setter
@Entity
@Table(name = "users", schema = "superplannerdb")
public class UserEntity extends BaseEntity {

  @Size(max = 255)
  @NotNull
  @Column(name = "username", nullable = false, unique = true)
  private String username;

  @Size(max = 60)
  @NotNull
  @JsonIgnore
  @Column(name = "password", nullable = false, length = 60)
  private String password;

  @Size(max = 255)
  @NotNull
  @Column(name = "email", nullable = false)
  private String email;

}
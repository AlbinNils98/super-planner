package se.github.albinnils98.superplanner.auth;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @MutationMapping
  public String signIn(
      @Argument String username,
      @Argument String password
  ) {
  return authService.signIn(username, password);
  }

  @MutationMapping
  public Boolean signUp(
      @Argument String username,
      @Argument String email,
      @Argument String password
  ) {
    return authService.signUp(username, email, password);
  }
}
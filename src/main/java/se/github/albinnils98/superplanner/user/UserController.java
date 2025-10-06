package se.github.albinnils98.superplanner.user;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;

@PreAuthorize("isAuthenticated()")
@Controller
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @QueryMapping
  public UserDto me(@AuthenticationPrincipal UserDetails user) {
    return userService.getUser(user.getUsername());
  }
}

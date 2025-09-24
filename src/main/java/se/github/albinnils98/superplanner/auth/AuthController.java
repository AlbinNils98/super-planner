package se.github.albinnils98.superplanner.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import se.github.albinnils98.superplanner.user.UserService;

@RestController
public class AuthController {

  UserService userService;

  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping(value = "/register", consumes = "application/json")
  public ResponseEntity<String> register(@RequestBody RegisterRequest req) {
    userService.registerUser(req);
    return ResponseEntity.ok("User created successfully");
  }
}

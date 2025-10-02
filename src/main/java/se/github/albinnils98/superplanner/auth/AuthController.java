package se.github.albinnils98.superplanner.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import se.github.albinnils98.superplanner.security.JwtUtil;
import se.github.albinnils98.superplanner.user.UserDetailsServiceImpl;
import se.github.albinnils98.superplanner.user.UserService;

import java.util.Map;

@RestController
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final UserDetailsServiceImpl userDetailsService;
  UserService userService;

  public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {

    this.userService = userService;
    this.authenticationManager = authenticationManager;
    this.jwtUtil = jwtUtil;
    this.userDetailsService = userDetailsService;
  }

  @PostMapping(value = "/login", consumes = "application/json")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password())
      );

      UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.username());
      String token = jwtUtil.generateToken(userDetails);

      return ResponseEntity.ok(Map.of("token", token));
    } catch (BadCredentialsException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("error", "Invalid username or password"));
    }
  }


  @PostMapping(value = "/register", consumes = "application/json")
  public ResponseEntity<String> register(@RequestBody RegisterRequest req) {
    userService.registerUser(req);
    return ResponseEntity.ok("User created successfully");
  }
}
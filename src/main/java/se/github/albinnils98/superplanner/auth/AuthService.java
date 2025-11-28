package se.github.albinnils98.superplanner.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.github.albinnils98.superplanner.exception.GraphqlException;
import se.github.albinnils98.superplanner.security.JwtUtil;
import se.github.albinnils98.superplanner.user.UserDetailsServiceImpl;
import se.github.albinnils98.superplanner.user.UserEntity;
import se.github.albinnils98.superplanner.user.UserRepository;
import se.github.albinnils98.superplanner.user.UserService;

import java.util.regex.Pattern;

@Service
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final UserDetailsServiceImpl userDetailsService;
  private final UserService userService;

  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

  public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService, UserService userService) {
    this.authenticationManager = authenticationManager;
    this.jwtUtil = jwtUtil;
    this.userDetailsService = userDetailsService;
    this.userService = userService;
  }

  public String signIn(String username, String password) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(username, password)
      );

      UserDetails userDetails = userDetailsService.loadUserByUsername(username);

      return jwtUtil.generateToken(userDetails);
    } catch (Exception e) {
      throw new GraphqlException("Invalid username or password");
    }
  }

  public Boolean signUp(String username, String email, String password) {

    userService.validateNewUser(username, email, password);

    UserEntity user = new UserEntity();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(encoder.encode(password));

    return userService.saveUser(user);
  }
}

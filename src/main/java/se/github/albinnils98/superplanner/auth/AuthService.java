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

import java.util.regex.Pattern;

@Service
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final UserDetailsServiceImpl userDetailsService;
  private final UserRepository userRepository;

  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

  public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService, UserRepository userRepository) {
    this.authenticationManager = authenticationManager;
    this.jwtUtil = jwtUtil;
    this.userDetailsService = userDetailsService;
    this.userRepository = userRepository;
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

@Transactional
  public Boolean signUp(String username, String email, String password) {
    if (username.length() < 4 || username.length() > 12) {
      throw new GraphqlException("Username must be 4-12 characters");
    }
    if (password.length() < 8) {
      throw new GraphqlException("Password must be at least 8 characters");
    }

    String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
    if (!Pattern.matches(emailRegex, email)) {
      throw new GraphqlException("Invalid email format");
    }

    if (userRepository.findByUsername(username).isPresent()) {
      throw new GraphqlException("Username is already taken");
    }
    if (userRepository.findByEmail(email).isPresent()) {
      throw new GraphqlException("Email is already registered");
    }

    UserEntity user = new UserEntity();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(encoder.encode(password));

    try{
      userRepository.save(user);
      return true;
    } catch (Exception e) {
      throw new GraphqlException("Failed to save user");
    }

  }
}

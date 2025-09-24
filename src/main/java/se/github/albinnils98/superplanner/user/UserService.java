package se.github.albinnils98.superplanner.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import se.github.albinnils98.superplanner.auth.RegisterRequest;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

  public UserDto getUser(String username) {
    Optional<UserEntity> userOpt = userRepository.findByUsername(username);

    UserEntity user = userOpt.orElseThrow();

    return new UserDto(user.getUsername());

  }
  public void registerUser(RegisterRequest registerRequest) {
    if (registerRequest.username().length() < 4 || registerRequest.username().length() > 12) {
      throw new IllegalArgumentException("Username must be 4-12 characters");
    }
    if (registerRequest.password().length() < 8) {
      throw new IllegalArgumentException("Password must be at least 8 characters");
    }


    String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
    if (!Pattern.matches(emailRegex, registerRequest.email())) {
      throw new IllegalArgumentException("Invalid email format");
    }

    if (userRepository.findByUsername(registerRequest.username()).isPresent()) {
      throw new IllegalArgumentException("Username is already taken");
    }
    if (userRepository.findByEmail(registerRequest.email()).isPresent()) {
      throw new IllegalArgumentException("Email is already registered");
    }

    UserEntity user = new UserEntity();
    user.setUsername(registerRequest.username());
    user.setEmail(registerRequest.email());
    user.setPassword(encoder.encode(registerRequest.password()));
    userRepository.save(user);
  }
}

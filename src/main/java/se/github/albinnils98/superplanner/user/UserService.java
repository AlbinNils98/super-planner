package se.github.albinnils98.superplanner.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.github.albinnils98.superplanner.exception.GraphqlException;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserDto getUser(String username) {
    Optional<UserEntity> userOpt = userRepository.findByUsername(username);

    UserEntity user = userOpt.orElseThrow();

    return new UserDto(user.getUsername());
  }

  public void validateNewUser(String username, String email, String password) {
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
  }

  @Transactional
  public Boolean saveUser(UserEntity user) {
    try {
      userRepository.save(user);
      return true;
    } catch (Exception e) {
      throw new GraphqlException("Failed to save user");
    }
  }
}

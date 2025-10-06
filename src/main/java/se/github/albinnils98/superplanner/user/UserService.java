package se.github.albinnils98.superplanner.user;

import org.springframework.stereotype.Service;

import java.util.Optional;

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
}

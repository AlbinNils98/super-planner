package se.github.albinnils98.superplanner.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepository userRepository;

  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
    Optional<UserEntity> userOpt = userRepository.findByUsername(identifier);

    if (userOpt.isEmpty()) {
      userOpt = userRepository.findByEmail(identifier);
    }

    UserEntity user = userOpt.orElseThrow(() -> new UsernameNotFoundException("User not found"));

    return new UserPrincipal(user);
  }
}

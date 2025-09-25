package se.github.albinnils98.superplanner.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import se.github.albinnils98.superplanner.user.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final UserDetailsServiceImpl userDetailsService;
  private final AuthSuccessHandlerImpl authSuccessHandler;

  public SecurityConfig(UserDetailsServiceImpl userDetailsService, AuthSuccessHandlerImpl authSuccessHandler) {
    this.userDetailsService = userDetailsService;
    this.authSuccessHandler = authSuccessHandler;
  }

  @Bean
  @Profile("development")
  public SecurityFilterChain developmentSecurityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll()
        )
        .build();
  }

  @Bean
  @Profile("production")
  public SecurityFilterChain productionSecurityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.POST, "/register").permitAll()
            .anyRequest().authenticated()
        )
        .formLogin(formLogin -> formLogin
            .loginProcessingUrl("/login")
            .successHandler(authSuccessHandler)
            .failureHandler((request, response, exception) -> {
              response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
              response.setContentType("application/json");
              response.getWriter().write("{\"error\": \"Invalid username or password\"}");
            })
        )
        .logout(logout -> logout
            .logoutUrl("/logout")
            .logoutSuccessHandler((request, response, authentication) -> response.setStatus(HttpStatus.OK.value()))
            .deleteCookies("JSESSIONID")
        )
        .build();
  }

  // Modern way to expose AuthenticationManager
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}

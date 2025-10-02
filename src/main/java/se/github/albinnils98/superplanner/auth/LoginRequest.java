package se.github.albinnils98.superplanner.auth;

public record LoginRequest(
    String username,
    String password
) {
}

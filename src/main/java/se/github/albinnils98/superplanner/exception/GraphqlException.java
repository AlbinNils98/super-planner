package se.github.albinnils98.superplanner.exception;

public class GraphqlException extends RuntimeException {
  private final String clientMessage;

  public GraphqlException(String clientMessage) {
    super(clientMessage);          // you can still log/stacktrace this
    this.clientMessage = clientMessage;
  }

  public String getClientMessage() {
    return clientMessage;
  }
}

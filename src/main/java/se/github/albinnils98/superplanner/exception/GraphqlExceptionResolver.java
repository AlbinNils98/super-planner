package se.github.albinnils98.superplanner.exception;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.stereotype.Component;

@Component
public class GraphqlExceptionResolver extends DataFetcherExceptionResolverAdapter {

  @Override
  protected GraphQLError resolveToSingleError(
      Throwable ex,
      DataFetchingEnvironment env) {

    if (ex instanceof GraphqlException gqlEx) {
      return GraphqlErrorBuilder.newError(env)
          .message(gqlEx.getClientMessage())
          .build();
    }
    return null;
  }
}

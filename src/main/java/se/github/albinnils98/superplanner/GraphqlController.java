package se.github.albinnils98.superplanner;

import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GraphqlController {

  @QueryMapping
  public String testQuery() {
    return "test";
  }

  @MutationMapping
  public String testMutation() {
    return "test";
  }
}

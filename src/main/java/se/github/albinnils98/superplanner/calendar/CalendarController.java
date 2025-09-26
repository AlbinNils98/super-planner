package se.github.albinnils98.superplanner.calendar;

import org.springframework.stereotype.Controller;

@Controller
public class CalendarController {

  private CalendarService calendarService;
  public CalendarController(CalendarService calendarService) {
    this.calendarService = calendarService;
  }


}

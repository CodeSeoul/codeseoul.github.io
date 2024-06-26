const countMeetupEventResults = 4;

/**
 * Meetup API
 * Returns an array from the API
 */
function getMeetupEvents() {
  $.ajax({
    url: `https://api.meetup.com/CodeSeoul/events?page=${countMeetupEventResults}`,
    jsonp: "callback",
    dataType: "jsonp",
    data: {
      format: "json",
    },
    success: function (response) {
      let events = response.data;
      createMeetupEvents(events);
    },
  });
}
getMeetupEvents();

function createBaseEventCard(eventName) {
  let eventCard = document.createElement("div");
  eventCard.setAttribute("class", "card");

  //Create card body
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  eventCard.appendChild(cardBody);

  //Create card title
  let cardTitle = document.createElement("h4");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = eventName;
  cardBody.appendChild(cardTitle);
  return {eventCard, cardBody};
}

/**
 * Function to create new elements for each event
 * @param {Array} data
 */
function createMeetupEvents(data) {
  let eventsDiv = document.querySelector(`#events-container`);

  if (data.length < 1) {
    //Create card
    let {eventCard, cardBody} = createBaseEventCard("No Events Scheduled");

    //Create card text
    let cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerHTML =
      "We don't have any events scheduled currently. Ask in our Discord if you have a recommendation, or check back soon!";
    cardBody.appendChild(cardText);

    eventsDiv.appendChild(eventCard);
  } else {
    for (let i = 0; i < data.length; i++) {
      // TODO: Make parsing more robust
      let eventItem = data[i];

      //Create card
      let {eventCard, cardBody} = createBaseEventCard(eventItem["name"]);

      //Create card text
      let cardText = document.createElement("p");
      cardText.setAttribute("class", "card-text");
      cardText.innerHTML =
        "Date: " +
        eventItem["local_date"] +
        "<br/>" +
        "Time: " +
        eventItem["local_time"];
      cardBody.appendChild(cardText);

      //Create location text
      let cardTextLocation = document.createElement("p");
      cardTextLocation.setAttribute("class", "card-text");
      if (!eventItem["is_online_event"]) {
        eventItem["venue"]["address_1"] = eventItem["venue"]["address_1"] !== undefined ? eventItem["venue"]["address_1"] : "";
        cardTextLocation.innerHTML =
          `Location: ${eventItem["venue"]["name"]}<br/>
            ${eventItem["venue"]["address_1"]}`;
      } else {
        cardTextLocation.innerHTML = "Location: Online! See event for details";
      }
      cardBody.appendChild(cardTextLocation);

      //Create Link Button
      let cardButton = document.createElement("a");
      cardButton.setAttribute("class", "btn btn-blue stretched-link");
      cardButton.setAttribute("href", eventItem["link"]);
      cardButton.innerHTML = "More Info";
      cardBody.appendChild(cardButton);

      eventsDiv.appendChild(eventCard);
    }
  }
}

/**
 * Smooth Scrolling
 */
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on("click", function() {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      let target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 100,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").on("click", function() {
    $(".navbar-collapse").collapse("hide");
  });
})(jQuery); // End of use strict

import React, { useState, useEffect } from "react";
import { Grid, Flex } from "@chakra-ui/react";

import EventCard from "../../components/EventCard/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch("http://localhost:5000/api/events");
      const data = await response.json();
      setEvents(data);
    };

    getEvents();
  }, []);

  return (
    <div>
      <Grid templateColumns="repeat(4, 1fr)" gap={10} minW={100} m={8}>
        {events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            description={event.description}
            isApproved={event.isApproved}
            time={event.time}
            date={event.date}
            image={event.image}
            mode={event.mode}
            location={event.location}
            price={event.price}
            tickets={event.tickets}
            organizer={event.organizer}
            domain={event.domain}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Events;

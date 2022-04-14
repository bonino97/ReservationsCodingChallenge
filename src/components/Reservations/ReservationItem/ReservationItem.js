import React from "react";

import { MONTHS } from "../../../constants/months";

import "./ReservationItem.css";

/**
 * @param {reservation} reservation - reservation item
 */

const ReservationItem = ({ reservation }) => {
  const getFormattedTimes = (start, end) => {
    const startTime = new Date(start).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endTime = new Date(end).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedTime = `${startTime} - ${endTime}`;
    return formattedTime;
  };

  const getFormattedDate = (date) => {
    const newDate = new Date(date);
    const month = MONTHS[newDate.getMonth()];
    const day = newDate.getDate();
    const year = newDate.getFullYear();

    const formattedDate = `${month} ${day} ${year}`;
    return formattedDate;
  };

  return (
    <article className="content" key={reservation?.id}>
      <img
        className="image"
        src={reservation?.room?.imageUrl}
        alt="Room Image"
      />
      <div className="date__content">
        <h3 className="time">
          {getFormattedTimes(reservation?.start, reservation?.end)}
        </h3>
        <p className="date"> {getFormattedDate(reservation?.start)}</p>
      </div>
      <div className="name__content">
        <p className="name">{reservation?.room?.name}</p>
      </div>
    </article>
  );
};

export default ReservationItem;

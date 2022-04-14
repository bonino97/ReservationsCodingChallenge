import React from "react";

import { MONTHS } from "../../constants/months";

import "./ReservationList.css";
/**
 * @param {reservations[]} options - list of reservations
 */

const ReservationList = ({ reservations }) => {
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
    <div className="container">
      <main className="grid">
        {reservations?.map((reservation) => (
          <article key={reservation?.id}>
            <img src={reservation?.room?.imageUrl} alt="Room Image" />
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
        ))}
        {!reservations.length && <div>No reservations.</div>}
      </main>
    </div>
  );
};

export default ReservationList;

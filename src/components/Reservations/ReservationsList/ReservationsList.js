import React, { memo } from "react";
import ReservationItem from "../ReservationItem/ReservationItem";

import "./ReservationsList.css";
/**
 * @param {reservations[]} options - list of reservations
 */

const ReservationsList = ({ reservations }) => {
  return (
    <div className="container">
      <section className="grid">
        {reservations?.map((reservation) => (
          <ReservationItem key={reservation.id} reservation={reservation} />
        ))}
        {!reservations.length && <div>No reservations.</div>}
      </section>
    </div>
  );
};

export default memo(ReservationsList);

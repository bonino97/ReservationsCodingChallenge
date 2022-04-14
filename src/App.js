import React, { useMemo, useState, useEffect } from "react";

import DatePicker from "./components/DatePicker/DatePicker";
import DropDownSelect from "./components/DropDownSelect/DropDownSelect";
import ReservationsList from "./components/Reservations/ReservationsList/ReservationsList";

import Error from "./components/Error/Error";
import Loading from "./components/Loading/Loading";

import { getReservations } from "./services/reservations";
import { isDateBetween } from "./utils/utils";

import { DROPDOWN_OPTIONS, ROOMS_OPTIONS } from "./constants/options";

import "./App.css";

const App = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("room-a");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getReservations()
      .then((reservations) => {
        const sortedReservations = sortReservations(reservations);
        setFilteredReservations(sortedReservations);
        setReservations(sortedReservations);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const sortReservations = useMemo(
    () => (reservations) =>
      reservations.sort((a, b) => (a.start > b.start ? 1 : -1)),
    []
  );

  const handleSelectedRoom = (room) => {
    setSelectedRoom(room);
    setFilteredReservations(
      reservations.filter(
        (reservation) => reservation?.room?.name === ROOMS_OPTIONS[room]
      )
    );
  };

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    setFilteredReservations(
      reservations.filter((reservation) =>
        isDateBetween(date, reservation?.start, reservation?.end)
      )
    );
  };

  return (
    <main className="app">
      <section className="app-filters">
        <div className="app-filter-item">
          <DatePicker
            value={selectedDate}
            onChange={(newDate) => handleSelectedDate(newDate)}
          />
        </div>
        <div className="app-filter-item">
          <DropDownSelect
            value={selectedRoom}
            onChange={(newRoom) => handleSelectedRoom(newRoom)}
            options={DROPDOWN_OPTIONS}
          />
        </div>
      </section>
      <section className="app-reservations">
        {loading && <Loading />}
        {!loading && filteredReservations && (
          <ReservationsList reservations={filteredReservations} />
        )}
        {error && <Error error={error} />}
      </section>
    </main>
  );
};

export default App;

import { isScheduleConflict } from "./utils";

import {
  reservationsWithConflictMock,
  reservationsWithoutConflictMock,
  reservationsMock,
} from "../mocks/reservations";

describe("isScheduleConflict", () => {
  it("returns [false] for an empty list", () => {
    expect(isScheduleConflict([])).toBe(false);
  });

  it("returns [false] for unexistent or wrong values", () => {
    expect(isScheduleConflict(null)).toBe(false);
  });

  it("returns [false] for unexistent or wrong values", () => {
    expect(isScheduleConflict(undefined)).toBe(false);
  });

  it("returns [false] for unexistent or wrong values", () => {
    expect(isScheduleConflict()).toBe(false);
  });

  it("returns [false] for unexistent or wrong values", () => {
    expect(isScheduleConflict(100)).toBe(false);
  });

  it("returns [false] for a list without conflicts", () => {
    expect(isScheduleConflict(reservationsWithoutConflictMock)).toBe(false);
  });

  it("returns [true] for a list with conflicts", () => {
    expect(isScheduleConflict(reservationsWithConflictMock)).toBe(true);
  });

  it("returns [true] for a long list with conflicts", () => {
    expect(isScheduleConflict(reservationsMock)).toBe(true);
  });
});

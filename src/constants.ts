import { Driver } from "./driver";

export const DRIVER_COMMAND = 'Driver';
export const TRIP_COMMAND = 'Trip';

//sort function to sort Drivers in order of descending miles driven
export const sortByDescendingMiles = (a: Driver, b: Driver) => b.milesDriven - a.milesDriven;

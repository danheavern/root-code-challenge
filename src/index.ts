import { DRIVER_COMMAND, TRIP_COMMAND } from "./constants";
import { Driver, Trip } from "./model";

/**
 * Returns the command used in a given line of input, and null if there is no valid command
 * @param line One line of input
 */
export function parseCommand(line: string): string {
    switch (line.split(' ')[0]) {
        case DRIVER_COMMAND: return DRIVER_COMMAND
        case TRIP_COMMAND: return TRIP_COMMAND
        default: return null 
    }}

/**
 * Returns given array with new driver appended
 * @param drivers Array of drivers to register to 
 * @param name Name of the driver to be registered
 */
export function registerDriver(drivers: Array<Driver>, name: string): Array<Driver> {
    const newDriver = new Driver;
    newDriver.name = name;
    return [...drivers, newDriver];
}

/**
 * Returns given array with new trip appended
 * @param driverName Name of driver
 * @param trips Array of trips to add to
 * @param start Start time in minutes
 * @param end End time in minutes
 * @param dist Distance in miles
 */
export function addTrip(trips: Array<Trip>, driverName: string, start: number, end: number, dist: number): Array<Trip> {
    return;
}


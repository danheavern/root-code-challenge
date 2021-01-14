import { DRIVER_COMMAND, TRIP_COMMAND } from "./constants";
import { Driver, Trip } from "./model";
import readline = require('readline');

/**
 * Returns the command used in a given line of input, and null if there is no valid command
 * @param line One line of input
 */
export function parseCommand(line: string): string {
    switch (line.split(' ')[0]) {
        case DRIVER_COMMAND: return DRIVER_COMMAND
        case TRIP_COMMAND: return TRIP_COMMAND
        default: return null 
    }
}

/**
 * Returns a Driver constructed from input line
 * @param line string
 */
export function parseDriverCommand(line: string): Driver {
    const driver = new Driver;
    driver.name = line.split(' ')[1];
    return driver;
}

/**
 * Returns a Trip from input line
 * @param line string
 */
export function parseTripCommand(line: string): Trip {
    const words = line.split(' ');
    const driverName = words[1];
    const start = parseTime(words[2]);
    const end = parseTime(words[3]);
    const dist = parseFloat(words[4]);
    return new Trip(driverName, start, end, dist);
}

/**
 * Returns time in minutes
 * @param str time as string, HH:mm format
 */
export function parseTime(str: string): number {
    const parts = str.split(':');
    const hours = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    return minutes + (hours * 60);
}

/**
 * Returns given array with new driver appended
 * @param drivers Array of drivers to register to 
 * @param driver Name of the driver to be registered
 */
export function registerDriver(drivers: Array<Driver>, driver: Driver): Array<Driver> {
    return [...drivers, driver];
}

/**
 * Returns given array with new trip appended
 * @param driverName Name of driver
 * @param trips Array of trips to add to
 * @param start Start time in minutes
 * @param end End time in minutes
 * @param dist Distance in miles
 */
export function addTrip(trips: Array<Trip>, trip: Trip): Array<Trip> {
    return [...trips, trip];
}

const drivers: Array<Driver> = [];
const trips: Array<Trip> = [];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    switch(parseCommand(line)){
        case DRIVER_COMMAND: {
            // registerDriver(drivers, parseDriverCommand(line))
        }
        case TRIP_COMMAND: {

        }
        //returned null - invalid command
        default: {
            rl.write('')
        }
    }
}).on('close', () => {
    //done reading
    process.exit(0);
})

import { DRIVER_COMMAND, TRIP_COMMAND } from "./constants";
import { Driver, Trip } from "./model";
import * as readline from 'readline';

main();

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
    return new Driver(line.split(' ')[1]);
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
 * @param trips Array of trips to add to
 * @param trip Trip onject to append to return array
 */
export function addTrip(trips: Array<Trip>, trip: Trip): Array<Trip> {
    return [...trips, trip];
}

/**
 * takes a trip and returns array drivers with updated Driver named in trip
 * @param drivers array of drivers
 * @param trip new trip to update drivers
 */
export function updateDrivers(drivers: Array<Driver>, trip: Trip): Array<Driver> {
    const tripDriver = drivers.find(d => d.name === trip.driverName);
    tripDriver.updateDriver(trip);
    return drivers.map(d => d.name === tripDriver.name ? tripDriver : d);
}

export function generateReport(drivers: Array<Driver>) {
    drivers.sort((a, b) => b.milesDriven - a.milesDriven);
    drivers.forEach(driver => {
        if(driver.milesDriven > 0) {
            console.log(`${driver.name}: ${Math.round(driver.milesDriven)} miles @ ${Math.round(driver.avgSpeed)} mph`);
        } else {
            console.log(`${driver.name}: 0 miles`);
        }
    })
}

export default function main() {
    var drivers: Array<Driver> = [];
    var trips: Array<Trip> = [];

    // setup readline interface
    // stdin and stdout will be the input/output
    // we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    // terminal: false allows us to suppress the input from being printed, and we can write the output using console.log
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity,
        terminal: false
    });

    rl.on('line', (line) => {
        const command = parseCommand(line);
        if(command === DRIVER_COMMAND) {
            drivers = registerDriver(drivers, parseDriverCommand(line));
        } else if(command === TRIP_COMMAND) {
            const trip = parseTripCommand(line);
            //trip is valid - add to trips, and update drivers
            if(trip.isValid) {
                trips = addTrip(trips, trip);
                drivers = updateDrivers(drivers, trip);
            }
        } else {
            //returned null - invalid command
            console.log('Encountered invalid command.');
        }
    }).on('close', () => {
        //done reading
        generateReport(drivers);
        process.exit(0);
    })
}

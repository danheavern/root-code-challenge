import { DRIVER_COMMAND, sortByDescendingMiles, TRIP_COMMAND } from "./constants";
import { Driver } from "./driver";
import { Trip } from "./trip";
import * as readline from 'readline';

export class Report {
    drivers: Array<Driver>;
    trips: Array<Trip>;

    constructor(){
        this.drivers = [];
        this.trips = [];
    }

    /**
     * creates interface for readline, and assigns callbacks for
     * new lines being read (line) and end of input (close)
     */
    run() {
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

        rl.on('line', this.handleLine)       //handle each line
        .on('close', this.handleClose);      //done reading
    }

    /**
     * Handles each line of input as the callback function for rl.on(event, listener)
     * @param line line of input
     */
    handleLine = (line: string) => {
        const command = this.parseCommand(line);
        if(command === DRIVER_COMMAND) {
            this.handleDriver(line);
        } else if(command === TRIP_COMMAND) {
            this.handleTrip(line);
        } else {                //returned null - invalid command
            console.log('Encountered invalid command.');
        }
    }

    /**
     * Callback for rl.on('close') -> calls generateReport and exits the process
     */
    handleClose = () => {
        this.generateReport(this.drivers);
    }

    /**
     * Writes formatted text to console
     */
    generateReport(drivers: Array<Driver>) {
        drivers.sort(sortByDescendingMiles);
        drivers.forEach(driver => {
        console.log(this.generateLine(driver));
        });
    }

    /**
     * Generates a single line of the report for a given Driver
     * @param driver Driver to generate report line for
     */
    generateLine(driver: Driver): string {
        if(driver.milesDriven > 0) {
            return `${driver.name}: ${Math.round(driver.milesDriven)} miles @ ${Math.round(driver.avgSpeed)} mph`;
        } else {
            return `${driver.name}: 0 miles`;
        }
    }

    /**
     * 
     * @param line line read from input
     * @param driversToUpdate array of drivers to modify
     */
    handleDriver(line: string) {
        this.registerDriver(this.parseDriverCommand(line));
    }

    /**
     * Returns given array with new driver appended
     * @param drivers Array of drivers to register to 
     * @param driver Name of the driver to be registered
     */
    registerDriver(driver: Driver){
        this.drivers = [...this.drivers, driver];
    }

    /**
     * 
     * @param line line read from input
     * @param tripsToUpdate array of trips to modify
     * @param driversToUpdate array of drivers to modify
     */
    handleTrip(line: string) {
        const trip = this.parseTripCommand(line);
        if(trip.isValid()) {  //trip is valid - add to trips, and update drivers
            this.addTrip(trip);
            this.updateDrivers(trip);
        }
    }

    /**
     * appends trip to this.trips
     * @param trip Trip onject to append to return array
     */
    addTrip(trip: Trip){
        this.trips = [...this.trips, trip];
    }

    /**
     * updates this.drivers, replacing previous driver with updated one
     * @param trip new trip to update drivers
     */
    updateDrivers(trip: Trip) {
        const tripDriver = this.drivers.find(d => d.name === trip.driverName);
        tripDriver.updateDriver(trip);
        this.drivers = this.drivers.map(d => d.name === tripDriver.name ? tripDriver : d);
    }

    /**
     * Returns the command used in a given line of input, and null if there is no valid command
     * @param line One line of input
     */
    parseCommand(line: string): string {
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
    parseDriverCommand(line: string): Driver {
        return new Driver(line.split(' ')[1]);
    }

    /**
     * Returns a Trip from input line
     * @param line string
     */
    parseTripCommand(line: string): Trip {
        const words = line.split(' ');
        const driverName = words[1];
        const start = this.parseTime(words[2]);
        const end = this.parseTime(words[3]);
        const dist = parseFloat(words[4]);
        return new Trip(driverName, start, end, dist);
    }

    /**
     * Returns time in minutes
     * @param str time as string, HH:mm format
     */
    parseTime(str: string): number {
        const parts = str.split(':');
        const hours = parseFloat(parts[0]);
        const minutes = parseFloat(parts[1]);
        return minutes + (hours * 60);
    }
}
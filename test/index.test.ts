import { addTrip, generateLine, parseCommand, parseDriverCommand, parseTime, parseTripCommand, registerDriver, sortByDescendingMiles, updateDrivers } from "..";
import { DRIVER_COMMAND, TRIP_COMMAND } from "../src/constants"
import { Driver, Trip } from "../src/model";

describe('index.ts - main body of code', () => {
    describe('parseCommand', () => {
        test('parseCommand returns DRIVER_COMMAND if first word is Driver', () => {
            expect(parseCommand('Driver Dan')).toEqual(DRIVER_COMMAND);
        });
        test('parseCommand should return TRIP_COMMAND if first word is Trip', () => {
            expect(parseCommand('Trip Dan 07:15 07:45 17.3')).toEqual(TRIP_COMMAND);
        });
        test('parseCommand should return null if no valid command present', () => {
            expect(parseCommand('Drip is a combination of Driver and Trip')).toBeNull();
        });
    });
    describe('parseDriverCommand', () => {
        test('parseDriverCommand returns a new Driver object', () => {
            expect(parseDriverCommand('Driver Dan')).toBeInstanceOf(Driver);
        });
        test('parseDriverCommand returns a Driver with the correct name', () => {
            expect(parseDriverCommand('Driver Dan').name).toEqual('Dan');
        });
    });
    describe('parseTripCommand', () => {
        test('parseTripCommand returns a new Trip object', () => {
            expect(parseTripCommand('Trip Dan 07:15 07:45 17.3')).toBeInstanceOf(Trip);
        });
        test('parseTripCommand returns Trip object with correct values', () => {
            const res = parseTripCommand('Trip Dan 07:15 07:45 17.3');
            expect(res.driverName).toEqual('Dan');
            expect(res.start).toEqual(435);
            expect(res.end).toEqual(465);
            expect(res.dist).toEqual(17.3);
        });
    });
    describe('parseTime', () => {
        test('parse 02:00', () => {
            expect(parseTime('02:00')).toEqual(120);
        })
        test('parse 12:30', () => {
            expect(parseTime('12:30')).toEqual(750);
        });
        test('parse 20:00', () => {
            expect(parseTime('20:00')).toEqual(1200);
        });
    })
    describe('registerDriver', () => {
        test('registerDriver should return an array of length drivers.length + 1', () => {
            expect(registerDriver([], new Driver('Test'))).toHaveLength(1);
        });
        test('registerDriver should return an array of Driver objects', () => {
            const res = registerDriver([], new Driver('Test'));
            res.forEach(d => expect(d).toBeInstanceOf(Driver));
        });
        test('registerDriver should return an array which contains a Driver with the name provided', () => {
            const driver = new Driver('Test');
            expect(registerDriver([], driver).some(d => d.name === 'Test')).toBe(true);
        });
    });
    describe('addTrip', () => {
        test('addTrip should return an array of length trips.length + 1', () => {
            expect(addTrip([], new Trip('Test', 0, 60, 60))).toHaveLength(1);
        });
        test('addTrip should return an array of Trip objects', () => {
            const res = addTrip([], new Trip('Test', 0, 60, 60));
            res.forEach(d => expect(d).toBeInstanceOf(Trip));
        });
        test('addTrip should return an array which contains a Trip with the values provided', () => {
            expect(addTrip([], new Trip ('Test', 0, 60, 60)).some(t => (
                t.driverName === 'Test'
                && t.start === 0
                && t.end === 60
                && t.dist === 60
                ))).toEqual(true);
        });
    });
    describe('updateDrivers', () => {
        test('updateDrivers returns array of Drivers', () => {
            const drivers: Array<Driver> = [];
            drivers.push(new Driver('Dan'));
            drivers.push(new Driver('Lauren'));
            drivers.push(new Driver('Kumi'));
            const res = updateDrivers(drivers, new Trip('Dan', 0, 60, 60));
            res.forEach(driver => {
                expect(driver).toBeInstanceOf(Driver);
            });
        });
        test('updateDriver returns array of length drivers.length', () => {
            const drivers: Array<Driver> = [];
            drivers.push(new Driver('Dan'));
            drivers.push(new Driver('Lauren'));
            drivers.push(new Driver('Kumi'));
            const res = updateDrivers(drivers, new Trip('Dan', 0, 60, 60));
            expect(res.length).toEqual(drivers.length);
        });
        test('updateDriver updates the driver specified in trip', () => {
            const drivers: Array<Driver> = [];
            drivers.push(new Driver('Dan'));
            drivers.push(new Driver('Lauren'));
            drivers.push(new Driver('Kumi'));
            const res = updateDrivers(drivers, new Trip('Dan', 0, 60, 60));
            expect(res.find(d => d.name === 'Dan').milesDriven).toEqual(60);
            expect(res.find(d => d.name === 'Dan').avgSpeed).toEqual(60);
        })
    });
    describe('generateReport', () => {
        test('sort function returns Array<Driver> sorted by milesDriven, desc.', () => {
            var drivers: Array<Driver> = [];
            drivers.push(new Driver('Dan'));
            drivers.push(new Driver('Lauren'));
            drivers.push(new Driver('Kumi'));
            drivers = updateDrivers(drivers, new Trip('Dan', 0, 60, 60));
            drivers = updateDrivers(drivers, new Trip('Lauren', 0, 70, 70));
            drivers = updateDrivers(drivers, new Trip('Kumi', 0, 80, 80));
            //line to be tested
            drivers.sort(sortByDescendingMiles);
            expect(drivers.findIndex(d => d.name === 'Dan')).toEqual(2);
            expect(drivers.findIndex(d => d.name === 'Lauren')).toEqual(1);
            expect(drivers.findIndex(d => d.name === 'Kumi')).toEqual(0);
        });
        test('generateLine prints correct name', () => {
            expect(generateLine(new Driver('Dan'))).toContain('Dan');
        });
        test('generateLine contains 0 miles and no average speed if milesDriven <= 0', () => {
            expect(generateLine(new Driver('Dan'))).toContain('0 miles');
            expect(generateLine(new Driver('Dan'))).not.toContain('mph');
        });
        test('generateLine contains miles and mph when milesDriven > 0', () => {
            const driver = new Driver('Dan');
            driver.updateDriver(new Trip('Dan', 0,60,60));
            expect(generateLine(driver)).toContain('miles');
            expect(generateLine(driver)).toContain('mph');
        })
    });
});
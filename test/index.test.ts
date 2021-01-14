import { addTrip, parseCommand, parseDriverCommand, parseTime, parseTripCommand, registerDriver } from "../src";
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
        test('parse 12:30', () => {
            expect(parseTime('12:30')).toEqual(750);
        });
        test('parse 20:00', () => {
            expect(parseTime('20:00')).toEqual(1200);
        })
    })
    describe('registerDriver', () => {
        test('registerDriver should return an array of length drivers.length + 1', () => {
            expect(registerDriver([], new Driver)).toHaveLength(1);
        });
        test('registerDriver should return an array of Driver objects', () => {
            const res = registerDriver([], new Driver);
            res.forEach(d => expect(d).toBeInstanceOf(Driver));
        });
        test('registerDriver should return an array which contains a Driver with the name provided', () => {
            const driver = new Driver;
            driver.name = 'Test';
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

});
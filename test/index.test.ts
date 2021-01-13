import { addTrip, parseCommand, registerDriver } from "../src";
import { DRIVER_COMMAND, TRIP_COMMAND } from "../src/constants"
import { Driver, Trip } from "../src/model";

describe('index.ts - main body of code', () => {
    test('parseCommand returns DRIVER_COMMAND if first word is Driver', () => {
        expect(parseCommand('Driver Dan')).toEqual(DRIVER_COMMAND);
    });
    test('parseCommand should return TRIP_COMMAND if first word is Trip', () => {
        expect(parseCommand('Trip Dan 07:15 07:45 17.3')).toEqual(TRIP_COMMAND);
    });
    test('parseCommand should return null if no valid command present', () => {
        expect(parseCommand('Drip is a combination of Driver and Trip')).toBeNull();
    });
    test('registerDriver should return an array of length drivers.length + 1', () => {
        expect(registerDriver([], 'Test')).toHaveLength(1);
    });
    test('registerDriver should return an array of Driver objects', () => {
        const res = registerDriver([], 'Test');
        res.forEach(d => expect(d).toBeInstanceOf(Driver));
    });
    test('registerDriver should return an array which contains a Driver with the name provided', () => {
        expect(registerDriver([], 'Test').some(d => d.name === 'Test')).toBe(true);
    });
    test('addTrip should return an array of length trips.length + 1', () => {
        expect(addTrip([], 'Test', 0, 60, 60)).toHaveLength(1);
    });
    test('addTrip should return an array of Trip objects', () => {
        const res = addTrip([], 'Test', 0, 60, 60);
        res.forEach(d => expect(d).toBeInstanceOf(Trip));
    });
    test('addTrip should return an array which contains a Trip with the values provided', () => {
        expect(addTrip([], 'Test', 0, 60, 60).some(t => (
            t.driverName === 'Test'
            && t.start === 0
            && t.end === 60
            && t.dist === 60
            ))).toEqual(true);
    });
})
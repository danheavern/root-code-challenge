import { parseCommand, registerDriver } from "../src";
import { DRIVER_COMMAND, TRIP_COMMAND } from "../src/constants"
import { Driver } from "../src/model";

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
    test('registerDriver returns an array of length drivers.length + 1', () => {
        expect(registerDriver([], 'Test')).toHaveLength(1);
    });
    test('registerDriver returns an array of Driver objects', () => {
        const res = registerDriver([], 'Test');
        res.forEach(d => expect(d).toBeInstanceOf(Driver));
    });
    test('registerDriver returns an array which contains a Driver with the name provided', () => {
        expect(registerDriver([], 'Test').some(d => d.name === 'Test')).toBe(true);
    });
})
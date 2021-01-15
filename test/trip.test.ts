import { Trip } from "../src/trip";

//Trip Tests
describe('Trip class', () => {
    test('speed getter properly calculates speed in mph', () => {
        const trip = new Trip('Test', 0,60,60);
        expect(trip.speed).toEqual(60);
    })
    test('isValid returns a Boolean', () => {
        const trip = new Trip('Test', 0, 60, 60);
        expect(trip.isValid()).toEqual(expect.any(Boolean));
    })
    test('isValid returns true for 60mph trip', () => {
        const trip = new Trip('Test', 0, 60, 60);
        expect(trip.isValid()).toBe(true);
    });
    test('isValid returns true for 5mph trip', () => {
        const trip = new Trip('Test', 0, 60, 5);
        expect(trip.isValid()).toBe(true);
    });
    test('isValid returns true for 100mph trip', () => {
        const trip = new Trip('Test', 0, 60, 100);
        expect(trip.isValid()).toBe(true);
    });
    test('isValid returns false for 4.999mph trip', () => {
        const trip = new Trip('Test', 0, 60, 4.999);
        expect(trip.isValid()).toBe(false);
    });
    test('isValid returns false for 100.001mph trip', () => {
        const trip = new Trip('Test', 0, 60, 100.001);
        expect(trip.isValid()).toBe(false);
    });
    test('isValid returns false for -60mph trip', () => {
        const trip = new Trip('Test', 0, 60, -60);
        expect(trip.isValid()).toBe(false);
    });
    test('isValid returns false for 999999mph trip', () => {
        const trip = new Trip('Test', 0, 60, 999999);
        expect(trip.isValid()).toBe(false);
    });
});
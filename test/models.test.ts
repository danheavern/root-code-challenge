import { Trip } from "../src/model"

describe('Trip class', () => {
    test('isValid returns a Boolean', () => {
        const trip = new Trip;
        expect(trip.isValid()).toEqual(expect.any(Boolean));
    })
    test('isValid returns true for 60mph trip', () => {
        const trip = new Trip;
        trip.driverName = 'Test';
        trip.start = 0;
        trip.end = 1;
        trip.dist = 60;
        expect(trip.isValid()).toBe(true);
    });
    test('isValid returns true for 5mph trip', () => {
        const trip = new Trip;
        trip.driverName = 'Test';
        trip.start = 0;
        trip.end = 1;
        trip.dist = 5;
        expect(trip.isValid()).toBe(true);
    });
    test('isValid returns true for 100mph trip', () => {
        const trip = new Trip;
        trip.driverName = 'Test';
        trip.start = 0;
        trip.end = 1;
        trip.dist = 100;
        expect(trip.isValid()).toBe(true);
    });
    test('isValid returns false for 4.999mph trip', () => {
        const trip = new Trip;
        trip.driverName = 'Test';
        trip.start = 0;
        trip.end = 1;
        trip.dist = 4.999;
        expect(trip.isValid()).toBe(false);
    });
    test('isValid returns false for 100.001mph trip', () => {
        const trip = new Trip;
        trip.driverName = 'Test';
        trip.start = 0;
        trip.end = 1;
        trip.dist = 100.001;
        expect(trip.isValid()).toBe(false);
    });
    test('isValid returns false for -60mph trip', () => {
        const trip = new Trip;
        trip.driverName = 'Test';
        trip.start = 0;
        trip.end = 1;
        trip.dist = -60;
        expect(trip.isValid()).toBe(false);
    });
    test('isValid returns false for 999999mph trip', () => {
        const trip = new Trip;
        trip.driverName = 'Test';
        trip.start = 0;
        trip.end = 1;
        trip.dist = 999999;
        expect(trip.isValid()).toBe(false);
    });
});
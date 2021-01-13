import { Driver, Trip } from "../src/model"

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

//Driver Tests
describe('Driver class', () => {
    test('updateMilesDriven leaves name and avgSpeed unchanged', () => {
        const driver = new Driver;
        driver.name = 'Test';
        driver.milesDriven = 100;
        driver.avgSpeed = 60;
        driver.updateMilesDriven(60);
        expect(driver.name).toEqual('Test');
        expect(driver.avgSpeed).toEqual(60);
    });
    test('updateMilesDriven sets milesDriven when previously undefined', () => {
        const driver = new Driver;
        driver.name = 'Test';
        driver.updateMilesDriven(60);
        expect(driver.milesDriven).toEqual(60);
    })
    test('updateMilesDriven adds correct number of miles', () => {
        const driver = new Driver;
        driver.name = 'Test';
        driver.milesDriven = 100;
        driver.updateMilesDriven(60);
        expect(driver.milesDriven).toEqual(160);
    });
    test('updateAvgSpeed leaves name and milesDriven unchanged', () => {
        const driver = new Driver;
        driver.name = 'Test';
        driver.milesDriven = 100;
        driver.avgSpeed = 60;
        driver.updateAvgSpeed(60);
        expect(driver.name).toEqual('Test');
        expect(driver.milesDriven).toEqual(100);
    });
    test('updateAvgSpeed sets avgSpeed when previously undefined', () => {
        const driver = new Driver;
        driver.name = 'Test';
        driver.updateAvgSpeed(60);
        expect(driver.avgSpeed).toEqual(60);
        expect(driver.totalTrips).toEqual(1);
    });
    test('updateAvgSpeed updates avgSpeed correctly with 1 previous Trip', () => {
        const driver = new Driver;
        driver.name = 'Test';
        driver.totalTrips = 1;
        driver.avgSpeed = 40;
        driver.updateAvgSpeed(60);
        expect(driver.avgSpeed).toEqual(50);
        expect(driver.totalTrips).toEqual(2);
    });
    test('updateAvgSpeed updates avgSpeed correctly with several previous Trip', () => {
        const driver = new Driver;
        driver.name = 'Test';
        driver.totalTrips = 6;
        driver.avgSpeed = 35;
        driver.updateAvgSpeed(70);
        expect(driver.avgSpeed).toEqual(40);
        expect(driver.totalTrips).toEqual(7);
    });
})
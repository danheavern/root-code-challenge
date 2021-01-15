import { Driver } from "../src/driver";
import { Trip } from "../src/trip";

//Driver Tests
describe('Driver class', () => {
    test('Driver constructor sets milesDriven and avgSpeed to 0', () => {
        const driver = new Driver('Test');
        expect(driver.name).toEqual('Test');
        expect(driver.milesDriven).toEqual(0);
        expect(driver.avgSpeed).toEqual(0);
    });
    test('updateMilesDriven leaves name and avgSpeed unchanged', () => {
        const driver = new Driver('Test');
        driver.milesDriven = 100;
        driver.avgSpeed = 60;
        driver.updateMilesDriven(60);
        expect(driver.name).toEqual('Test');
        expect(driver.avgSpeed).toEqual(60);
    });
    test('updateMilesDriven sets milesDriven when previously undefined', () => {
        const driver = new Driver('Test');
        driver.updateMilesDriven(60);
        expect(driver.milesDriven).toEqual(60);
    })
    test('updateMilesDriven adds correct number of miles', () => {
        const driver = new Driver('Test');
        driver.milesDriven = 100;
        driver.updateMilesDriven(60);
        expect(driver.milesDriven).toEqual(160);
    });
    test('updateAvgSpeed leaves name and milesDriven unchanged', () => {
        const driver = new Driver('Test');
        driver.milesDriven = 120;
        driver.avgSpeed = 60;
        driver.updateAvgSpeed(new Trip('Test', 0, 60, 60));
        expect(driver.name).toEqual('Test');
        expect(driver.milesDriven).toEqual(120);
    });
    test('updateAvgSpeed sets avgSpeed to trip speed when milesDriven == trip.dist', () => {
        const driver = new Driver('Test');
        const trip = new Trip('Test', 0, 60, 60)
        driver.name = 'Test';
        driver.updateMilesDriven(60);
        driver.updateAvgSpeed(trip);
        expect(driver.avgSpeed).toEqual(trip.speed);
    });
    test('updateAvgSpeed sets avgSpeed to -0 when milesDriven < trip.dist', () => {
        const driver = new Driver('Test');
        driver.name = 'Test';
        driver.updateMilesDriven(50);
        driver.updateAvgSpeed(new Trip('Test', 0, 100, 100));
        expect(driver.avgSpeed).toEqual(-0);
    });
    test('updateAvgSpeed updates avgSpeed correctly with previous miles at the same speed', () => {
        const driver = new Driver('Test');
        driver.avgSpeed = 60;
        driver.updateMilesDriven(120);
        driver.updateAvgSpeed(new Trip('Test', 0, 60, 60));
        expect(driver.avgSpeed).toEqual(60);
    });
    test('updateAvgSpeed using provided test case', () => {
        const driver = new Driver('Dan');
        driver.avgSpeed = 34.6;
        driver.milesDriven = 17.3
        driver.updateMilesDriven(21.8);
        driver.updateAvgSpeed(new Trip('Dan', 372, 392, 21.8));
        expect(Math.round(driver.avgSpeed)).toEqual(47);
    })
})
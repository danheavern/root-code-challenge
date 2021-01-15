import { DRIVER_COMMAND, TRIP_COMMAND } from "../src/constants"
import { Driver, Trip, Report, sortByDescendingMiles } from "../src/model";
import * as readline from 'readline';

var report: Report = new Report;

describe('Report', () => {
    beforeEach(() => {
        report = new Report;
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });
    describe('run', () => {
        var handleLineMock;
        var handleCloseMock;
        var stdin;
        beforeEach(() => {
            handleLineMock = jest.spyOn(report, 'handleLine');
            handleCloseMock = jest.spyOn(report, 'handleClose');
            stdin = require('mock-stdin').stdin();
        });
        test('handleLine called', () => {
            report.run();
            stdin.send("Driver Test");
            stdin.end();
            expect(handleLineMock).toHaveBeenCalled();
        });
        test('handleClose called', () => {
            report.run();
            stdin.send("Driver Test");
            stdin.end();
            expect(handleCloseMock).toHaveBeenCalled();
        });
    });
    describe('report.parseCommand', () => {
        test('report.parseCommand returns DRIVER_COMMAND if first word is Driver', () => {
            expect(report.parseCommand('Driver Dan')).toEqual(DRIVER_COMMAND);
        });
        test('report.parseCommand should return TRIP_COMMAND if first word is Trip', () => {
            expect(report.parseCommand('Trip Dan 07:15 07:45 17.3')).toEqual(TRIP_COMMAND);
        });
        test('report.parseCommand should return null if no valid command present', () => {
            expect(report.parseCommand('Drip is a combination of Driver and Trip')).toBeNull();
        });
    });
    describe('report.parseDriverCommand', () => {
        test('report.parseDriverCommand returns a new Driver object', () => {
            expect(report.parseDriverCommand('Driver Dan')).toBeInstanceOf(Driver);
        });
        test('report.parseDriverCommand returns a Driver with the correct name', () => {
            expect(report.parseDriverCommand('Driver Dan').name).toEqual('Dan');
        });
    });
    describe('report.parseTripCommand', () => {
        test('report.parseTripCommand returns a new Trip object', () => {
            expect(report.parseTripCommand('Trip Dan 07:15 07:45 17.3')).toBeInstanceOf(Trip);
        });
        test('report.parseTripCommand returns Trip object with correct values', () => {
            const res = report.parseTripCommand('Trip Dan 07:15 07:45 17.3');
            expect(res.driverName).toEqual('Dan');
            expect(res.start).toEqual(435);
            expect(res.end).toEqual(465);
            expect(res.dist).toEqual(17.3);
        });
    });
    describe('report.parseTime', () => {
        test('parse 02:00', () => {
            expect(report.parseTime('02:00')).toEqual(120);
        })
        test('parse 12:30', () => {
            expect(report.parseTime('12:30')).toEqual(750);
        });
        test('parse 20:00', () => {
            expect(report.parseTime('20:00')).toEqual(1200);
        });
    })
    describe('report.registerDriver', () => {
        test('report.registerDriver should increase the length of report.drivers', () => {
            report.registerDriver(new Driver('Test'));
            expect(report.drivers).toHaveLength(1);
        });
        test('report.registerDriver should add Driver with correct name', () => {
            report.registerDriver(new Driver('Test'));
            expect(report.drivers.some(d => d.name === 'Test')).toBeTruthy();
        });
    });
    describe('report.addTrip', () => {
        test('report.addTrip should update report.trips', () => {
            report.addTrip(new Trip('Test', 0, 60, 60));
            expect(report.trips).toHaveLength(1);
        });
        test('report.addTrip should result in report.trips containing a Trip with the values provided', () => {
            report.addTrip(new Trip ('Test', 0, 60, 60))
            expect(report.trips.some(t => (
                t.driverName === 'Test'
                && t.start === 0
                && t.end === 60
                && t.dist === 60
                ))).toBeTruthy();
        });
    });
    describe('report.updateDrivers', () => {
        test('updateDrivers does not change length of report.drivers', () => {
            report.drivers = [
                new Driver('Dan'),
                new Driver('Lauren'),
                new Driver('Kumi')
            ];
            report.updateDrivers(new Trip('Dan', 0, 60, 60));
            expect(report.drivers).toHaveLength(3);
        });
        test('updateDrivers updates the driver specified in trip', () => {
            report.drivers = [
                new Driver('Dan'),
                new Driver('Lauren'),
                new Driver('Kumi')
            ];
            report.updateDrivers(new Trip('Dan', 0, 60, 60));
            expect(report.drivers.find(d => d.name === 'Dan').milesDriven).toEqual(60);
            expect(report.drivers.find(d => d.name === 'Dan').avgSpeed).toEqual(60);
        })
    });
    describe('report.generateReport', () => {
        test('report.generateReport prints line correctly', () => {
            const driver = new Driver('Test');
            driver.milesDriven = 100;
            driver.avgSpeed = 60;
            console.log = jest.fn();
            report.generateReport([driver]);
            expect(console.log).toHaveBeenCalledWith('Test: 100 miles @ 60 mph');
        })
        test('sort function returns Array<Driver> sorted by milesDriven, desc.', () => {
            const driverA: Driver = new Driver('Dan');
            const driverB: Driver = new Driver('Lauren');
            const driverC: Driver = new Driver('Kumi');
            driverA.updateDriver(new Trip('Dan', 0, 40, 40));
            driverB.updateDriver(new Trip('Lauren', 0, 50, 50));
            driverC.updateDriver(new Trip('Kumi', 0, 60, 60));
            const drivers = [driverA, driverB, driverC];
            //line to be tested
            drivers.sort(sortByDescendingMiles);
            expect(drivers.findIndex(d => d.name === 'Dan')).toEqual(2);
            expect(drivers.findIndex(d => d.name === 'Lauren')).toEqual(1);
            expect(drivers.findIndex(d => d.name === 'Kumi')).toEqual(0);
        });
        test('report.generateLine prints correct name', () => {
            expect(report.generateLine(new Driver('Dan'))).toContain('Dan');
        });
        test('report.generateLine contains 0 miles and no average speed if milesDriven <= 0', () => {
            expect(report.generateLine(new Driver('Dan'))).toContain('0 miles');
            expect(report.generateLine(new Driver('Dan'))).not.toContain('mph');
        });
        test('report.generateLine contains miles and mph when milesDriven > 0', () => {
            const driver = new Driver('Dan');
            driver.updateDriver(new Trip('Dan', 0,60,60));
            expect(report.generateLine(driver)).toContain('miles');
            expect(report.generateLine(driver)).toContain('mph');
        });

    });
    describe('report.handleLine', () => {
        var handleDriverMock;
        var handleTripMock;
        beforeEach(() => {
            handleDriverMock = jest.spyOn(report, 'handleDriver');
            handleTripMock = jest.spyOn(report, 'handleTrip');
            handleDriverMock.mockImplementation(() => {});
            handleTripMock.mockImplementation(() => {});
        });
        test('report.handleLine logs error message if invalid command encountered', () => {
            console.log = jest.fn();
            report.handleLine('InvalidCommand Given Here');
            expect(console.log).toHaveBeenCalledWith('Encountered invalid command.');
        });
        test('report.handleLine calls handleDriver if Driver command used', () => {
            report.handleLine('Driver Test');
            expect(handleDriverMock).toHaveBeenCalled();
        });
        test('report.handleLine calls handleTrip if Trip command used', () => {
            report.handleLine('Trip Test 00:00 02:00 120');
            expect(handleTripMock).toHaveBeenCalled();
        });
    });
    describe('handleDriver', () => {
        test('updates report.drivers', () => {
            report.handleDriver('Driver Test');
            expect(report.drivers).toHaveLength(1);
        });
    }); 
    describe('handleTrip', () => {
        beforeEach(() => {
            report = new Report;
        })
        test('updates report.trips', () => {
            report.drivers.push(new Driver('Test'));
            report.handleTrip('Trip Test 00:00 02:00 120');
            expect(report.trips).toHaveLength(1);
        });
        test('updates report.drivers', () => {
            report.drivers.push(new Driver('Test'));
            report.handleTrip('Trip Test 00:00 02:00 120');
            expect(report.drivers.find(d => d.name === 'Test').milesDriven).toEqual(120);
        });
        test('aborts if trip is invalid', () => {
            report.drivers.push(new Driver('Test'));
            report.handleTrip('Trip Test 00:00 01:00 999');
            expect(report.trips).toHaveLength(0);
        })
    });
    describe('handleClose', () => {
        var generateReportMock;
        beforeEach(() => {
            generateReportMock = jest.spyOn(report, 'generateReport');
            generateReportMock.mockImplementation(() => {});
        });
        test('handleClose calls generateReport', () => {
            report.handleClose();
            expect(generateReportMock).toHaveBeenCalled();
        });
    });
});
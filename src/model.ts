export class Trip {
    driverName: string; //name of driver
    start: number;      //start time in minutes
    end: number;        //end time in minutes
    dist: number;       //distance travelled in miles

    //use getter as shortcut for calculating speed
    get speed(): number {
        return this.dist / (this.end - this.start) * 60;
    }

    constructor (
        driverName: string, //name of driver
        start: number,      //start time in minutes
        end: number,        //end time in minutes
        dist: number        //distance travelled in miles
    ) {
        this.driverName = driverName;
        this.start = start;
        this.end = end;
        this.dist = dist;
    }

    /**
     * Returns true if 5mph <= speed <= 100mph
     */
    isValid(): Boolean {
        return this.speed <= 100 && this.speed >= 5;
    }
}

export class Driver {
    name: string;
    milesDriven?: number;    //total miles driven
    avgSpeed?: number;       //average speed in mph

    constructor(name: string) {
        this.name = name;
        this.milesDriven = 0;
        this.avgSpeed = 0;
    }

    /**
     * Updates *milesDriven*, adding *miles* to the total
     * Runs before updating the new average speed
     * @param miles miles to be added
     */
    updateMilesDriven(miles: number) {
        this.milesDriven+= miles;
    }

     /**
     * Update *avgSpeed* using a new trip speed.
     * Runs after *updateMilesDriven*, so the calculation uses this.milesDriven and the trip distance to adjust the average.
     * @param tripSpeed speed in mph to include in avg
     */
    updateAvgSpeed(trip: Trip) {
        this.avgSpeed = this.milesDriven / (((this.milesDriven - trip.dist) / this.avgSpeed) + (trip.dist / trip.speed));
    }

    updateDriver(trip: Trip) {
        //updateAvgSpeed is dependent on having the current mile total, so update milesDriven first.
        this.updateMilesDriven(trip.dist);
        this.updateAvgSpeed(trip);
    }
}
import { Trip } from "./trip";

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
     * this.milesDriven must be greater than trip.dist
     * @param trip trip used to update avg
     */
    updateAvgSpeed(trip: Trip) {
        if(this.milesDriven !== trip.dist) {
            this.avgSpeed = this.milesDriven / (((this.milesDriven - trip.dist) / this.avgSpeed) + (trip.dist / trip.speed));
        } else {
            this.avgSpeed = trip.speed;
        }
    }

    updateDriver(trip: Trip) {
        //updateAvgSpeed is dependent on having the current mile total, so update milesDriven first.
        this.updateMilesDriven(trip.dist);
        this.updateAvgSpeed(trip);
    }
}

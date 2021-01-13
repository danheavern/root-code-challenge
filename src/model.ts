export class Trip {
    driverName: string; //name of driver
    start: number;      //start time in minutes
    end: number;        //end time in minutes
    dist: number;       //distance travelled in miles

    /**
     * Returns true if 5mph <= speed <= 100mph
     */
    isValid(): Boolean {
        return this.dist / (this.end - this.start) * 60 <= 100 && this.dist / (this.end - this.start) * 60 >= 5;
    }
}

export class Driver {
    name: string;
    totalTrips: number;      //total trips taken - used in updating average speed
    milesDriven?: number;    //total miles driven
    avgSpeed?: number;       //average speed in mph

    /**
     * Update *avgSpeed* using a new trip speed, increments totalTrips
     * @param tripSpeed speed in mph to include in avg
     */
    updateAvgSpeed(tripSpeed: number){
        this.totalTrips = this.totalTrips ? this.totalTrips + 1 : 1;
        this.avgSpeed = this.avgSpeed ? this.avgSpeed * ((this.totalTrips - 1) / this.totalTrips) + (tripSpeed / this.totalTrips) : tripSpeed;
    }

    /**
     * Updates *milesDriven*, adding *miles* to the total 
     * @param miles miles to be added
     */
    updateMilesDriven(miles: number){}
}
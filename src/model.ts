export class Trip {
    driverName: string; //name of driver
    start: number;      //start time in minutes
    end: number;        //end time in minutes
    dist: number;       //distance travelled in miles

    /**
     * Returns true if 5mph <= speed <= 100mph
     */
    isValid(){}
}

export class Driver {
    name: string;
    milesDriven?: number;    //total miles driven
    avgSpeed?: number;       //average speed in mph

    /**
     * Update avgSpeed using a new trip speed
     * @param tripSpeed speed in mph to include in avg
     */
    updateAvgSpeed(tripSpeed: number){}
}
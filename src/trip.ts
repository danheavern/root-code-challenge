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

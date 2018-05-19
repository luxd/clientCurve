export class Car {
    carId: number;
    make: String;
    model: String;
    madeYear: number;
    odometer: number;
    carType: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

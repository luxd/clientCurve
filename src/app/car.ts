export class Car {
    carId?: number = 0;
    make: String;
    model: String;
    madeYear: number;
    odometer: number;
    carTypeId?: number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class CarType {
    carTypeId?: number = 0;
    carTypeName: String;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

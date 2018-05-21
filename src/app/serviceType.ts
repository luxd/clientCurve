export class ServiceType {
    serviceTypeId?: number = 0;
    serviceTypeName: String;


    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

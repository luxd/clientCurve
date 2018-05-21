import { ServiceType } from "./serviceType";

export class ServiceRecord {
    serviceId?: number = 0;
    serviceDate: Date;
    serviceTypes: ServiceType[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}


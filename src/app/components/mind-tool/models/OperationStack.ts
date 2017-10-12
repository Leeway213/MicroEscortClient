import { Type } from '@angular/core';
export class OperationStack<T> extends Array<Operation<T>> {
}

export class Operation<T> {
    constructor(
        public type: Type<T>
    ) {}
}

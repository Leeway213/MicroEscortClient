

export interface TaskSetModel {
    id: string;
    name: string;
    dataType: string;
    type: string;
    description: string;
    labelPrice: number;
    verificationPrice: number;
    verificationTimes: number;
    quiz: boolean;
    complete: boolean;
    requester: string;
    project: string;
    createdAt: Date;
    updatedAt: Date;
}
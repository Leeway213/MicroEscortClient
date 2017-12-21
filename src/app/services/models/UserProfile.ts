export class UserProfile {
    id: string;
    username: string;
    nickname: string;
    realname: string;
    passportId: string;
    passportPhotoFront: string;
    passportPhotoBack: string;
    certificationPassed: boolean;

    gender: "male" | "female";
    age: number;
    email: string;
    phone: string;
    career: string;
    level: number;
    money: number;
    currency: "CNY" | "USD";
    createdAt: Date;
    updatedat: Date;
}
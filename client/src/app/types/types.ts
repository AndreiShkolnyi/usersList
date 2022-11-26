export interface IProfession {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface IComment {
    _id: string;
    content: string;
    userId: string;
    pageId: string;
    created_at: string;
    updatedAt: string;
}
export interface IQuality {
    _id: string;
    color: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface IToken {
    _id: string;
    user: IUser;
    refreshToken: string;
}
export interface IUser {
    bookmark: boolean;
    _id: string;
    name: string;
    email: string;
    password: string;
    completedMeetings: number;
    image: string;
    rate: number;
    sex: string;
    profession: IProfession;
    qualities: [IQuality];
}

export interface IErrors {
    email?: string;
    name?: string;
    password?: string;
    profession?: string;
    licence?: string;
}

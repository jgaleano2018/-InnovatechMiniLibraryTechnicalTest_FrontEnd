export interface CurrentUser {

    userId:number;

    email:string;

    firstName:string;

    lastName:string;

    token:string;

    expiration:string;

    roles:string[];

    permissions:string[];

}
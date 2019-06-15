export class User{
    constructor(
        public name:string,
        public surname:string,
        public email:string,
        public phone:string,
        public password:string,
        public pet:string,
        public address:Address,
        public consents:Consents
    ){}
}

export class Address{
    constructor(
        public city:string,
        public street:string,
        public building:string,
        public flatNo:string
    ){}
}

export class Consents{
    constructor(
        public newsletter:boolean,
        public sms:boolean
    ){}
}

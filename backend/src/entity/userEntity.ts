
export class UserEntity{
    constructor(
        public id : string | null , 
        public username : string,
        public email : string , 
        public password : string
    ){

    }

    changePassword(newPassword : string){
        this.password = newPassword
    }
}
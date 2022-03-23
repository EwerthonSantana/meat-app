export class User{
    constructor(public email: string,
         public name: string,
          public password: string){
    }

    matches(another: User): boolean {
        return another !== undefined && 
        another.email === this.email && 
        another.password === this.password
    }
}

export const users: {[key:string]: User} = {
    "ewerthon@gmail.com": new User('ewerthon@gmail.com','Ewerthon', 'ewerthon123'),
    "amanda@gmail.com": new User('amanda@gmail.com','Amanda', 'amanda123')
}
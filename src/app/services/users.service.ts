import { Injectable } from "@angular/core";
import {Users} from '../../app/class/users'
import { User } from "../class";

@Injectable()
export class UsersService{

    users: Users[]=[]
    constructor(){
        this.loadData();
    }
updateData(){
    localStorage.setItem("data",JSON.stringify(this.users));
}

loadData(){
    if (localStorage.getItem("data")){
        this.users=JSON.parse(localStorage.getItem("data"));
    return (this.users);
    }
   
}

addData(user:Users){
    this.users.push(user);
    this.updateData();

}

}
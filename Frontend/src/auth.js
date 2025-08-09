import { ID } from "appwrite";
import { account } from "./appwrite";

export function signUp({email,password,name}) {
    console.log(email);
    console.log(password);
    console.log(name);
    return account.create(ID.unique(),email,password,name);
}

export function signIn({ email, password}) {
    return account.createEmailPasswordSession(email,password);
}

export function getCurrentUser(){
    return account.get();
}

export function signOut(){
    return account.deleteSession("current");
}

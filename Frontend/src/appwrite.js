import {Client, Account} from "appwrite";

export const client = new Client() 
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export const account = new Account(client);

//account.get()
   // .then(() => console.log("Connected to appwrite"))
   // .catch(err => console.log("SDK reachable. No session yet",err.message));
import {ID, Query, Permission, Role} from "appwrite";
import { account, databases } from "./appwrite";

const DB_ID = import.meta.env.VITE_DB_ID;
const COL_GOALS = import.meta.env.VITE_COL_GOALS;

export async function createGoal({title, description, hours_pw, plan = null}){

    const user = await account.get();
    const userId = user.$id;

    return databases.createDocument(
        DB_ID,
        COL_GOALS,
        ID.unique(),
        {
            title,
            description,
            hours_pw,
            status: "active",
            owner: userId,
        },
        [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
            Permission.write(Role.user(userId)),
        ]
    );
}

export async function listMyGoals(){
    const { $id: userId} = await account.get();
    return databases.listDocuments(DB_ID,COL_GOALS, [
        Query.equal("owner",userId),
        Query.orderDesc("$createdAt"),
    ]);
}

export function getGoal(id){
    return databases.getDocument(DB_ID,COL_GOALS,id);
}

export function updateGoal(id,patch){
    return databases.updateDocument(DB_ID,COL_GOALS,id,patch);
}

export function deleteGoal(id){
    return databases.deleteDocument(DB_ID,COL_GOALS,id);
}


import {functions} from "./appwrite";
const FUNC_ID = import.meta.env.VITE_FUNC_PLANNER_ID

export async function makePlan(goal){
    console.log(FUNC_ID);
    try{
        const body = JSON.stringify({goal});
        const exec = await functions.createExecution(
            FUNC_ID,
            body,
            false,
            "/",
            "POST"
        );
        console.log("exec: ",exec);
        console.log("responseBOdy: ", exec.responseBody);
        const out = JSON.parse(exec.responseBody);
        console.log(out);
        return out;
    }
    catch(err){
        console.error("makePlan failed:",err);
        throw err;
    }
}
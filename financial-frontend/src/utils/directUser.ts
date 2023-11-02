import { User } from "../../typings/structures"
import { store } from "../state"

export const AccessUser=()=>{
    const state=store.getState()
    const {currentUser}=state as any
    const {user}=currentUser as any
   
    return user as User
}

/*

 Special Report
 Simple Report
 Training
 Rules and laws
 Archive
 

*/

import { store } from "../state"


export const handle=()=>{
   
      const {currentUser}= store.getState()
      

     return currentUser
}



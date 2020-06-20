const INITIAL_STATE = {
    text: ""
 }
  
 export default (state = INITIAL_STATE, action) {
    switch(action.type) {
       case "CHANGED_TEXT":
          return { ...state, text: action.payload }
          break;
       default:
          return state
    }
 }
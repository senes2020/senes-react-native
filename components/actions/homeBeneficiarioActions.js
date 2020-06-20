export function changeText(newValue) {
    return {
       type: "TEXT_CHANGED",
       payload: newValue
    }
 }
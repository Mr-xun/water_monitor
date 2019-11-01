export default function(state = [], action) {
    let { type, payload } = action;
    switch (type) {
        case "ADD_TODO":
            let newState = [...state];
            newState.push(payload);
            return newState;
        default:
            return state;
    }
}

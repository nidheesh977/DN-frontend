const userReducer = (state = {}, action) => {
    switch(action.type) {
        case "LIST_USERS":
            return {...state, users: action.payload}; 
        default:
            return state;
        }
}

export default userReducer;
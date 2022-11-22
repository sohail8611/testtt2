const INITIAL_STATE = {
    leaderlist_search_zone: "",
    leaderlist_search_teamleadername: "",
    loginStatus: false,

};


export default (state = INITIAL_STATE, action) => {
    if (action.type == "SETZONESEARCH") {
        state.leaderlist_search_zone = action.value;
        return state
    }

    else if (action.type == "SETLEADERNAMESEARCH") {
        state.leaderlist_search_teamleadername = action.value;
        return state
    }

   

    return state;
}
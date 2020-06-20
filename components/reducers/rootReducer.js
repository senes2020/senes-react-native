//Ele diz que podem ter vários reducers, então é bom criar um root
//Pesquisar como integrar vários reducers em um root

const initState = {
    posts: [],
    text: 'texto teste'
}

const rootReducer = (state = initState, action) => {
    return state;
}

export default rootReducer
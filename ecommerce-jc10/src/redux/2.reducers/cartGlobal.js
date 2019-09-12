const INITIAL_STATE = {cartLength : 0}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'TESTCART' :
            return{...state, cartLength : action.payload.panjangCart}
        default :
        return state
    }
}
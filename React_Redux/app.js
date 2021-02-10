const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const reduxLogger =  require('redux-logger')
const logger = reduxLogger.createLogger() 
const applyMiddleware =  redux.applyMiddleware

const Buy_Cake = 'Buy_Cake';
const Buy_Icecream = 'Buy_Icecreams'

const BuyCake = () => {
    return {
        type : Buy_Cake,
        info : 'first redux action'
    }
}

const BuyIcecreams = () => {
    return {
        type : Buy_Icecream,
        info : 'first redux action'
    }
}

let InitialCakeState = {
    CakeCount : 10   
}

let InitialIcecreamCount = {
    IcecreamCount : 10
} 

const CakeReducer = (state = InitialCakeState , action) => {
        switch(action.type) {
            case Buy_Cake:
                return {
                    ...state,
                    CakeCount : state.CakeCount-1
                }

            default:
                return state
        }
    }

const IceCreamReducer = (state = InitialIcecreamCount , action) => {
        switch(action.type) {
            case Buy_Icecream:
                return {
                    ...state,
                    IcecreamCount : state.IcecreamCount-1
                }

            default:
                return state
        }
    }


const rootReducers = combineReducers({
    cake : CakeReducer,
    icecream : IceCreamReducer
})
const store = createStore(rootReducers,applyMiddleware(logger))
console.log(store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(BuyCake())
store.dispatch(BuyCake())
store.dispatch(BuyIcecreams())
store.dispatch(BuyIcecreams())
store.dispatch(BuyCake())
unsubscribe()









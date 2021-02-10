const redux = require('redux')
const applyMiddleware =  redux.applyMiddleware
const reduxThunk = require('redux-thunk').default
const axios = require('axios')

const InitalState = {
    loading : false ,
    data : [],
    error : ""
}

const Fetch_User_Request = 'Fetch_User_Request'
const Fetch_User_Success = 'Fetch_User_Success'
const Fetch_User_Failure = 'Fetch_User_Failure'

const fetchUserRequest = () => {
    return {
        type : Fetch_User_Request
    }
}

const FetchUserSuccess = (users) => {
    return {
        type : Fetch_User_Success,
        payload : users
    }
}

const FetchUserError = (err) => {
    return {
        type : Fetch_User_Failure ,
        payload : err
    }
}


const fetchUser = () => {
    return function(dispatch) {
        dispatch(fetchUserRequest)
        axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
            let resTitle = res.data.map(data => {
                return data.title
            })
        dispatch(FetchUserSuccess(resTitle))
        }).catch(ex => {
            dispatch(FetchUserError(ex.message))
        })

    }
}

const reducer = (state = InitalState , action) => {

    switch(action.type) {

        case Fetch_User_Request:
            return {
                ...state,
                loading:true,
                data : [],
                error : ""
            }
        
        case Fetch_User_Success :
            return {
                ...state,
                loading:false,
                data : action.payload,
                error : ""
            }

        case Fetch_User_Failure :
                return {
                    ...state,
                    loading:false,
                    data : [],
                    error : action.payload
                }       
    }
}

const store = redux.createStore(reducer,applyMiddleware(reduxThunk))
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(fetchUser())







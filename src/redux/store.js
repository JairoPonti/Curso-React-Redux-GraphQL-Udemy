import { createStore, combineReducers, compose, applyMiddleware} from 'redux' ;
import userReducer, { restoreSessionAction } from './userDuck';
import charsReducer, {getCharactersAction} from './charsDuck'
import thunk from 'redux-thunk'; // Se usa para poder consumir al Backend a través de promesas

let rootReducer = combineReducers({   //Dentro del rootReducer combinamos todos los reducers, acá user es el userReducer
    user: userReducer,
    characters: charsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    let store = createStore(
        rootReducer,
        composeEnhancers ( applyMiddleware(thunk))
    )

    // Consiguiendo los persojanes por 1ra vez
    getCharactersAction()(store.dispatch, store.getState)
    restoreSessionAction()(store.dispatch)  // Esta func se usa para loguear con los datos ya guardados en el localStorage, 
                                            //Hace que persistan los datos del usuario en Redux, aunque se recargue la pág
    return store
}
import { loginWithGoogle, signOutGoogle } from '../firebase' //importo el servicio creado con firebase


// constants

let initialData = {
    loggedIn: false,
    fetching: false
}

let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"

let LOG_OUT = "LOG_OUT"

// reducer
export default function (state= initialData, action){
   switch (action.type) {
       case LOGIN:
       return {...state, fetching: true}
       case LOG_OUT:
       return {...initialData}    //Copia estado inicial del store, limpia todo
       case LOGIN_SUCCESS:
       return {...state, fetching: false, ...action.payload, loggedIn: true}    
       case LOGIN_ERROR:
       return {...state, fetching: false, error: action.payload}        
       default:
           return state;
   }

}

//Función auxiliar, respaldo del store, recargas de página
function saveStorage(storage){
  localStorage.storage = JSON.stringify(storage)
}


// action (action creator)
export let logOutAction = () => (dispatch, getState) => {
    signOutGoogle()
    dispatch({
        type:  LOG_OUT
    })
    localStorage.removeItem('storage')
}


export let restoreSessionAction = () => dispatch => {   // Recupera la sesión, para persistir en Redux
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)  //EL parse convierte a obj, el stringify a string
    if(storage && storage.user){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        })
    }
}


export let doGoogleLoginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()  //Me devuelve la data del usuario
    .then(user=> {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
        })
        saveStorage(getState()) //Pasamos todo el store de Redux ya con el usuario logueado
    })
     .catch(e=> {
         console.log(e)
         dispatch({
             type: LOGIN_ERROR,
             payload: e.message  //En firebase el error viene directo en el message
         })
     })
} 
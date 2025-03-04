import {configureStore} from "@reduxjs/toolkit"
import activeCard from '../slices/Cardslice'
import loaderReducer from '../slices/Loaderslice'
import patientRequestReducer from '../slices/PatientRequestSlice'
import loggerDataReducer from '../slices/loggerSlice'
import registerDataReducer from '../slices/Registerslice'

 const store = configureStore({
    devTools:true,
    reducer:{
        cards:activeCard,
        loader:loaderReducer,
        patientRequestData:patientRequestReducer,
        loggerData:loggerDataReducer,
        registerData:registerDataReducer,
    }
         
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
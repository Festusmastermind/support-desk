import { Navigate, Outlet } from 'react-router-dom' 
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'


const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus() 
   
    //if the checkingStatus is true..then keep loading the spinner ..
    if(checkingStatus) {
        return <Spinner /> 
    }
    //Outlet enables the dom to render the nexted route element..i.e. the children component..
    return loggedIn ? <Outlet /> : <Navigate to='/login' />
}


export default PrivateRoute
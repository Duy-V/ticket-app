import {useState, useEffect} from "react-redux";
import {useSelector} from "react-redux";
export const useAuthStatus = () =>{
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus]  = useState()

    const {user} = useSelector((state)=> state.auth)

    useEffect(()=>{
if(user){
    setLoggedIn(true)
} else {
    setLoggedIn(false)
}
setCheckingStatus(false)
    },[user])
    return {loggedIn, checkingStatus}
}
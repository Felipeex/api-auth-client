
/* imports */
import Cookie from "js-cookie"
import { useState, useEffect } from "react"
import { Notify } from "../../services/api/utils"

/* notify */
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* components */
import Login from "../../components/Login"
import SignIn from "../../components/SignIn"
import SignUp from "../../components/SignUp"

/* styles */
import "./index.css"

export default function Home() {
    const CookieToken = Cookie.get('token')
    const [signup, setSignup] = useState(false)
    const [token, setToken] = useState(false)

    useEffect(() => {
        if(CookieToken)
        return setToken(CookieToken)
    }, [CookieToken])

    return (
        <div className="container">
            <form>
                <ToastContainer />
                {   !token ?
                    !signup ?
                    <SignIn 
                    setSignup={setSignup} 
                    setToken={setToken} 
                    Notify={Notify}/> :
                    
                    <SignUp 
                    setSignup={setSignup} 
                    Notify={Notify}/> :

                    <Login 
                    token={token} 
                    setToken={setToken}></Login>
                }
            </form>
        </div>
    )
}
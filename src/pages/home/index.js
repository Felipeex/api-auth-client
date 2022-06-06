import Cookie from "js-cookie"
import { useState, useEffect } from "react"

/* components */
import Login from "../../components/Login"
import SignIn from "../../components/SignIn"
import SignUp from "../../components/SignUp"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* styles */
import "./index.css"

export default function Home() {
    const [signup, setSignup] = useState(false)
    const [token, setToken] = useState(false)

    useEffect(() => {
        const token = Cookie.get('token')
        if(token)
        return setToken(token)
    }, [])

    function Notify(type, desc) {
        if (type === 'warn') {
            toast.warn(desc, { position: "top-center" })
        } else if(type === 'error'){
            toast.error(desc, { position: "top-center" })
        } else if(type === 'success'){
            toast.success(desc, { position: "top-center" })
        } else {
            toast(desc, { position: "top-center" })
        }
    }

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
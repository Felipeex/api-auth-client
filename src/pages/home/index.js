import Cookie from "js-cookie"
import { useState, useEffect } from "react"

/* components */
import Login from "../../components/login"
import SignIn from "../../components/signin"
import SignUp from "../../components/signup"

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

    return (
        <div className="container">
            <form>
                {   !token ? 
                    !signup ?
                    <SignIn setSignup={setSignup} setToken={setToken}/> :
                    <SignUp setSignup={setSignup}/> :
                    <Login token={token} setToken={setToken}></Login>
                }
            </form>
        </div>
    )
}
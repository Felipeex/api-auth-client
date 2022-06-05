import { useState } from "react"
import SignIn from "../../components/signin"
import SignUp from "../../components/signup"
import "./index.css"

export default function Home() {

    const [signup, setSignup] = useState(false)

    return (
        <div className="container">
            <form>
                { !signup ? <SignIn setSignup={setSignup}/> : ''}
            </form>
        </div>
    )
}
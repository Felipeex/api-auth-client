/* imports */
import Loading from "../Loading"
import { useState } from "react"
import { SignInRequest } from "../../services/api/utils"

export default function SignIn({ setSignup, setToken, Notify }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [IsSubmitRequest, setIsSubmitRequest] = useState(false)

    async function SubmitRequest() {
        if (!email)
            return Notify('warn', 'Preecha seu email.')

        if (!password)
            return Notify('warn', 'Preecha sua senha.')

        await SignInRequest(setIsSubmitRequest, setToken, email, password)
    }

    return (
        <>
            <h1>Login</h1>

            <input type="email" placeholder="Seu email" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Sua senha" onChange={(e) => setPassword(e.target.value)}></input>

            <button
                onClick={(e) => SubmitRequest(e.preventDefault())}
                disabled={IsSubmitRequest}
            >{IsSubmitRequest ? <Loading /> : 'Entrar'}</button>

            <h4>Ainda não tem uma conta? <span onClick={() => setSignup(true)}>Criar conta</span></h4>
        </>
    )
}
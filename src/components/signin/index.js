import { useState } from "react"

import api from "../../services/api"
import Cookies from 'js-cookie'
import Loading from "../Loading"

export default function SignIn({ setSignup, setToken, Notify }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [IsSubmitRequest, setIsSubmitRequest] = useState(false)

    async function SubmitRequest() {
        if(!email)
        return Notify('warn', 'Preecha seu email.')

        if(!password)
        return Notify('warn', 'Preecha sua senha.')

        try {
            setIsSubmitRequest(true)

            const login = await api.post('/signin', { email, password })
            setToken(login.data.message.token)
            Cookies.set('token', login.data.message.token, { expires: 1 })

            setIsSubmitRequest(false)
        } catch (err) {
            setIsSubmitRequest(false)

            if(err.response.status === 0)
            return Notify('error', 'Ocorreu um erro.')
            return Notify('error', err.response.data.error)
        }
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
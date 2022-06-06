import { useState } from "react"

import api from "../../services/api"
import Loading from "../Loading"

export default function SignIn({ setSignup, Notify }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [IsSubmitRequest, setIsSubmitRequest] = useState(false)

    async function SubmitRequest() {
        if(!email)
        return Notify('warn', 'Preecha seu email.')

        if(!password)
        return Notify('warn', 'Preecha sua senha.')

        if(!repeatPassword)
        return Notify('warn', 'Preecha sua senha novamente.')

        if(password !== repeatPassword)
        return Notify('warn', 'Suas senhas não são iguais.')

        try {
            setIsSubmitRequest(true)

            const login = await api.post('/signup', { email, password })
            Notify('success', login.data.message)
            setSignup(false)
            
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
            <h1>Criar conta</h1>
                
            <input type="email" placeholder="Seu email" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Sua senha" onChange={(e) => setPassword(e.target.value)}></input>
            <input type="password" placeholder="Confirmar senha" onChange={(e) => setRepeatPassword(e.target.value)}></input>
        
            <button
            onClick={(e) => SubmitRequest(e.preventDefault())}
            disabled={IsSubmitRequest}
            >{IsSubmitRequest ? <Loading /> : 'Cadastrar'}</button>
        
            <h4>Já tem uma conta? <span onClick={() => setSignup(false)}>Fazer Login</span></h4>
        </>
    )
}
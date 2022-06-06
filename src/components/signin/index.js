import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from "../../services/api"
import Cookies from 'js-cookie'
import Loading from "../Loading"

export default function SignIn({ setSignup, setToken }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [IsSubmitRequest, setIsSubmitRequest] = useState(false)

    async function Submit() {
        if(!email)
        return toast.warn('Preecha o seu email!', { position: "top-center" })

        if(!password)
        return toast.warn('Preecha a sua senha!', { position: "top-center" })

        try {
            setIsSubmitRequest(true)

            const login = await api.post('/signin', { email, password })
            setToken(login.data.message.token)
            Cookies.set('token', login.data.message.token, { expires: 1 })

            setIsSubmitRequest(false)
        } catch (err) {
            setIsSubmitRequest(false)

            if(err.response.status === 0)
            return toast.error('Ocorreu um erro!', { position: "top-center" })
            return toast.warn(err.response.data.error, { position: "top-center" })
        }
    }

    return (
        <>
            <ToastContainer />
            <h1>Login</h1>
                
            <input type="email" placeholder="Seu email" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Sua senha" onChange={(e) => setPassword(e.target.value)}></input>
        
            <button 
            onClick={(e) => Submit(e.preventDefault())}
            disabled={IsSubmitRequest}
            >{IsSubmitRequest ? <Loading /> : 'Entrar'}</button>
        
            <h4>Ainda não tem uma conta? <span onClick={() => setSignup(true)}>Criar conta</span></h4>
        </>
    )
}
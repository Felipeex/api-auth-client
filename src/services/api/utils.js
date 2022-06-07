/* imports */
import api from "../../services/api"
import Cookies from 'js-cookie'
import { toast } from "react-toastify"

/* notify function */
function Notify(type, desc) {
    const position = { position: "top-center" }

    if (type === 'warn') {
        toast.warn(desc, position)
    } else if(type === 'error') {
        toast.error(desc, position)
    } else if(type === 'success') {
        toast.success(desc, position)
    } else {
        toast(desc, position)
    }
}

/* request sign-Up */
async function SignUpRequest(setIsSubmitRequest, setSignup, email, password) {
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

/* request sign-Up */
async function SignInRequest(setIsSubmitRequest, setToken, email, password) {
    try {
        setIsSubmitRequest(true)

        const login = await api.post('/signin', { email, password })
        const { token } = login.data.message
        setToken(token)
        Cookies.set('token', token, { expires: 1 })

        setIsSubmitRequest(false)
    } catch (err) {
        setIsSubmitRequest(false)

        const { status, data } = err.response
        if (status === 0)
        return Notify('error', 'Ocorreu um erro.')
        Notify('error', data.error)
    }
}

export { Notify, SignUpRequest, SignInRequest }
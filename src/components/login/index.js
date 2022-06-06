import Cookies from 'js-cookie'

export default function Login({ token, setToken }) {
    function LogOff() {
        Cookies.remove('token')
        setToken(false)
    }
    
    return(
        <>
            <h1>Token: <span>{token}</span></h1>
            <button onClick={(e) => LogOff(e.preventDefault())}>Sair</button>
        </>
    )
}
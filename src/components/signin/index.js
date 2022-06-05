export default function SignIn({ setSignup }) {

    return (
        <>
            <h1>Login</h1>
                
            <input type="email" placeholder="Seu email"></input>
            <input type="password" placeholder="Sua senha"></input>
        
            <button>Entrar</button>
        
            <h4>Ainda não tem uma conta? <span onClick={() => setSignup(true)}>Criar conta</span></h4>
        </>
    )
}
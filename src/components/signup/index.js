export default function SignIn({ setSignup }) {

    return (
        <>
            <h1>Criar conta</h1>
                
            <input type="email" placeholder="Seu email"></input>
            <input type="password" placeholder="Sua senha"></input>
            <input type="password" placeholder="Confirmar senha"></input>
        
            <button>Cadastrar</button>
        
            <h4>Já tem uma conta? <span onClick={() => setSignup(false)}>Fazer Login</span></h4>
        </>
    )
}
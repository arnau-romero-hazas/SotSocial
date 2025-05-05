
export function Landing({ onLoginClick, onRegisterClick }){
    return <div className="landing"> 
        <h1>s📷ts</h1>
        <a onClick={onLoginClick}>Login </a>
        or
        <a onClick={onRegisterClick}> Register</a>
    </div>
}
function Landing({ onLoginClick, onRegisterClick }){
    return <div> 
        <h1>LANDING</h1>
        <a onClick={onLoginClick}>Login </a>
        or
        <a onClick={onRegisterClick}> Register</a>
    </div>
}
//<a onClick={onRegisterClick}>Register</a>or<a onClick={onLoginClick}>Login</a>
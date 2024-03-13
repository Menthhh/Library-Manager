import "./register.css"

export default function Register() {
    return (
        <div className="register">
            <form className="registerForm">
                <h1>Register</h1>
                <input type="text" placeholder="Username" className="username" />
                <input type="email" placeholder="Email" className="email" />
                <input type="password" placeholder="Password" className="password" />
                <input type="password" placeholder="Confirm Password" className="confirmPassword" />
                <button className="registerButton">Register</button>
            </form>
        </div>
    );
}
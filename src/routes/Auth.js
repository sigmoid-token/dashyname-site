import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const { target: { name, value }, } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            const authorize = getAuth();
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authorize, email, password);
            } else {
                data = await signInWithEmailAndPassword(authorize, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    }
    return (
        <div>
            <form onSubmit={ onSubmit }>
                <input name="email" type="text" placeholder="Email" required value={ email } onChange={ onChange } />
                <input name="password" type="password" placeholder="Password" required value={ password } onChange={ onChange } />
                <input type="submit" value={newAccount ? "Create Account" : "Login"} required />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create new account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
)};
export default Auth;
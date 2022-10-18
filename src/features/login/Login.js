import React, { useState } from "react";
import fetchAPI from "../../common/fetchAPI";
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetchAPI('http://localhost:8000/api/auth/userlogin', 'POST', '', { email, password });
        const json = await response.json();
        console.log(json);
        if (response.status === 200) {
            localStorage.setItem('authToken', json.authToken)
            navigate('/');
        }
        else {
            props.showAlert('Invalid credentials', 'danger');
        }
    }
    const updateEmailInState = (e) => {
        setEmail(e.target.value);
    }
    const updatePasswordInState = (e) => {
        setPassword(e.target.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={updateEmailInState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={updatePasswordInState} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;
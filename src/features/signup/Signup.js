import React, { useState } from "react";
import fetchAPI from "../../common/fetchAPI";
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const [signUpFields, setSignUpFields] = useState({ name: "", email: "", password: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signUpFields;
        const response = await fetchAPI('http://localhost:8000/api/auth/createuser', 'POST', '', { name, email, password });
        const json = await response.json();
        console.log(json);
        if (response.status === 200) {
            localStorage.setItem('authToken', json.authToken)
            navigate('/');
        }
        else {
            alert('Invalid credentials')
        }
    }
    const updateSignUpFieldsInState = (e) => {
        setSignUpFields({ ...signUpFields, [e.target.id]: e.target.value });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" value={signUpFields.name} onChange={updateSignUpFieldsInState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={signUpFields.email} onChange={updateSignUpFieldsInState} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={signUpFields.password} onChange={updateSignUpFieldsInState} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup;
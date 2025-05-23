import React, { useState } from 'react';
import './RegisterPage.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })

            });
            const json = await response.json();
            console.log('json data', json);
            console.log('er', json.error);

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                setIsLoggedIn(true);
                navigate('/app')
            }
            if (json.error) {
                setShowerr(json.error);
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        {/* firstname  */}
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label><br />
                            <input id="firstName" type="text" className="form-control" placeholder="Enter your first name"
                                value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        {/* lastname  */}
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label><br />
                            <input id="lastName" type="text" className="form-control" placeholder="Enter your last name"
                                value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        {/* email  */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label><br />
                            <input id="email" type="email" className="form-control" placeholder="Enter your email address"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="text-danger">{showerr}</div>
                        {/* password  */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label><br />
                            <input id="password" type="password" className="form-control" placeholder="Enter your password"
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    );//end of return
}

export default RegisterPage;
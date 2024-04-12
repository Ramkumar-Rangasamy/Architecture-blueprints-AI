import React, { useState } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './signup.css';
import picture from '../Assets/login-gif.gif';

import { useNavigate } from "react-router-dom";

function Login() {
      
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2023/login', {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                toast.success('Login successful!');
                setTimeout(() => {
                    navigate('/aienter');
                }, 3000);

            } else if (response.status === 401) {
                toast.error('Invalid email or password. Please try again.');
            } else {
                toast.error('Login failed. Please check your details and try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>

           <div className="breadcrumbs-admin">
                <nav>
                    <div className="container">
                        <ol>
                            <li><a href="#">Login Page</a></li>
                            <li>User</li>
                        </ol>
                    </div>
                </nav>
            </div>



            <div className=" Auth-form-container order col-lg  ">
                <div className="row no-gutters">
                    <div className="col-lg-6  ">
                        <form className="Auth-form col-lg-12 auth_login">
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">Login Page</h3>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                    
                                
                                    <div className="d-grid gap-2 ">
                                       <div className='row'>
                                          <div>
                                            <button type="submit" className="btn btn-success"  onClick={handleLogin}>Login</button>
                                          </div>
                                          <div className='pl-2 pt-4 text-light'>
                                          <p>Don't have an account ?<a className='atag pl-2' href='/signup'>Click here</a></p>
                                          </div>
                                       </div> 
                                    
                            
                                    <ToastContainer/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 p-5 ">
                        <h1 className='text-end text-light'>Welcome, let's login an account</h1>   
                        <img src={picture} className=" order col-lg pt-5 " alt="Loading image"/>
                    </div>
                </div>
            </div>



            
        </>
    );
}

export default Login;


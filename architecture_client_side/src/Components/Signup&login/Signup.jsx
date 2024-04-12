import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './signup.css';
import picture from '../Assets/3d-image-give.gif';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
function Signup() {
        const navigate = useNavigate();

        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [roles, setRoles] = useState('');
        const [password, setPassword] = useState('');
        const [checkbox, setCheckbox] = useState(false);
    
        const handleSignup = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:2023/signup', {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    roles: roles,
                    password: password,
                    checkbox: checkbox,
                });
                if (response.status === 201) {
                    toast.success('Signup successful!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);

                } else if (response.status === 409) {
                    toast.error('Email already exists. Please use a different email address.');
                } else {
                    toast.error('Signup failed. Please check your details and try again.');
                }
            } catch (error) {
                toast.error('Same Account details. Please try again.');
            }
        }
    
        
    

    return (
        <>
            <div className="breadcrumbs-admin">
                <nav>
                    <div className="container">
                        <ol>
                            <li><a href="#">SignUp Page</a></li>
                            <li>User</li>
                        </ol>
                    </div>
                </nav>
            </div>

            <div className=" Auth-form-container order col-lg p-5">
                <div className="row no-gutters">
                    <div className="col-lg-6  d-flex justify-content-center justify-content-center">
                        <form className="Auth-form col-lg-11">
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">SignUp Page</h3>
                                <div className="form-group ">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter first name" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter last name" 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group ">
                                    <label>Work Email</label>
                                    <input
                                        type="email"
                                        className="form-control "
                                        placeholder="Enter email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>What describe the best your role ?</label>
                                    <select
                                        className="form-control"
                                        value={roles}
                                        onChange={(e) => setRoles(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a option</option>
                                        <option value="Architect">Architect</option>
                                        <option value="Interior Designer">Interior Designer</option>
                                        <option value="Real Estate Agent">Real Estate Agent</option>
                                        <option value="Real Estate Developer">Real Estate Developer</option>
                                        <option value="student">Student</option>
                                        <option value="homeBuilder">Home Builder</option>
                                        <option value="homeBuilder">Hobbyist</option>
                                    </select>
                                </div>


                                <div className="form-group ">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control "
                                        placeholder="Enter password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input "
                                            id="gridCheck"
                                            checked={checkbox}
                                            onChange={() => setCheckbox(!checkbox)}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="gridCheck">By continuing you agree to the ----- terms of service and privacy policy.</label>
                                    </div>
                                </div>
                                <div className=" d-grid gap-2 ">
                                   <div className='row'>
                                   <div className=''>
                                    <button type="submit" className="btn btn-success" onClick={handleSignup}>Continue</button>
                                    </div>
                                   <div className='pl-4 pt-4 text-light'>
                                    <p>Already registered ?<a className='atag pl-2' href='/login'>Sign in</a></p>  
                                   </div>
                                   </div>
                                   <ToastContainer/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 p-5 ">
                        <h1 className='text-end text-light'>Welcome, let's create an account</h1>   
                        <img src={picture} className=" order col-lg pt-5 " alt="Loading image"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;

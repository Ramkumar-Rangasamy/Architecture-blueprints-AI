import React, { useState } from 'react';
import axios from 'axios';

import './Estimate.css';

import {Link} from 'react-router-dom';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Estimate() {
    const [apartmentType, setApartmentType] = useState('2bhk');
    const [roomType, setRoomType] = useState('Master Bedroom,...');
    const [modularKitchen, setModularKitchen] = useState('yes');
    const [carpetArea, setCarpetArea] = useState('');
    const [estimateResult, setEstimateResult] = useState(null);
  
    const calculateEstimate = () => {
      const requestData = {
        apartmentType,
        roomType,
        modularKitchen,
        carpetArea,
      };
  
      axios.post('http://localhost:2023/api/estimate', requestData)
        .then(response => {
          setEstimateResult(response.data.result);
          toast.success('Estimate calculated successfully!');
        })
        .catch(error => {
          console.error('Error calculating estimate:', error.message);
          toast.error('Error calculating estimate. Please try again.');
        });
    };
  
  return (
    <>
        <div className='container-fuild first-division'>
            <div className='container-fuild  secound-division '>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='formdiv p-5'>
                      <div className='inner-form'>
                        <form>
                            <div className='form-row'>
                                <div className='form-group col-md-3 p-2'>
                                <label htmlFor='inputState diging'>Select apartment type</label>
                                <select
                                    id='inputState'
                                    className='form-control'
                                    value={apartmentType}
                                    onChange={(e) => setApartmentType(e.target.value)}
                                >
                                    <option value='2bhk'>2bhk</option>
                                    <option value='3bhk'>3bhk</option>
                                    <option value='3.5bhk'>3.5bhk</option>
                                    <option value='4bhk'>4bhk</option>
                                </select>
                                </div>

                                <div className='form-group col-md-3 p-2'>
                                <label htmlFor='inputState diging '>Select type of rooms</label>
                                <select
                                    id='inputState'
                                    className='form-control'
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                >
                                    <option value='Master Bedroom,...'>Master Bedroom,...</option>
                                    <option value='Master Bedroom'>Master Bedroom</option>
                                    <option value='Home Office Study'>Home Office Study</option>
                                    <option value='Parents'>Parents</option>
                                    <option value='Kids Bedroom'>Kids Bedroom</option>
                                    <option value='Kids Room 1'>Kids Room 1</option>
                                    <option value='Kids Room 2'>Kids Room 2</option>
                                    <option value='Guest Bedroom'>Guest Bedroom</option>
                                </select>
                                </div>

                                <div className='form-group col-md-3 p-2'>
                                <label htmlFor='inputState diging'>Need a modular kitchen ?</label>
                                <select
                                    id='inputState'
                                    className='form-control'
                                    value={modularKitchen}
                                    onChange={(e) => setModularKitchen(e.target.value)}
                                >
                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>
                                </select>
                                </div>

                                <div className='form-group col-md-3 p-2'>
                                <label htmlFor='inputState diging'>Carpet area in sqft.</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={carpetArea}
                                    onChange={(e) => setCarpetArea(e.target.value)}
                                />
                                </div>
                            </div>

                            <div className='d-flex justify-content-center align-items-center estm-btn'>
                                <button
                                type='button'
                                className='btn btn-success pl-5 pr-5'
                                onClick={calculateEstimate}
                                >
                                Get Estimate
                                </button>
                            </div>
                           
                        </form>
                            {estimateResult !== null && (
                                <div className='mt-3'>
                                <p className='text-light door'>Estimated Result : $ {estimateResult}</p>
                                <Link to='/ainame'><button  className='btn bg-primary text-light pl-5 pr-5'> Back </button></Link>
                                </div>
                            )}
                      </div>
                    </div>  
                </div> 
                 
            </div>
            <ToastContainer />
        </div>

        
     
    </>
  )
}

export default Estimate





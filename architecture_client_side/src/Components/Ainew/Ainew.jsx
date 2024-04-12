import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faImage, faBox, faPalette ,faArrowRight} from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  Link,useNavigate } from "react-router-dom";
import axios from 'axios';

import './aninew.css';

function Ainew() {
    
  const [projectName, setProjectName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!projectName.trim()) {
      toast.error('Please enter a project name.');
      return;
    }

    if (!selectedOption) {
      toast.error('Please select an AI tool.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:2023/submitForm', {
        projectName,
        selectedOption,
      });

      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/ailogic', { state: { projectName, selectedOption } });
      }, 3000);
    } catch (error) {
      console.error('Error during form submission:', error.message);
      toast.error(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };


  return (
   <div className='head-form-ainew p-5'>
    <div className="container mt-5 ">
         <ToastContainer />
      <form onSubmit={handleFormSubmit}>
        <h1 className=''>New project</h1>
        <div className='form-group p-3'>
          <label>Name your project</label>
          <input
            className="form-control col-lg-5"
            type="text"
            placeholder="Enter the project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
            <h2 className='text-light p-4'>Which AI tool would you like to start with?</h2>
            
            <div className=' row d-flex justify-content-center'>
                <button type="button" value='plan' className='btn btn-outline-success  color-draw col-lg-2' onClick={() => setSelectedOption('plan')}>
                    <h6 className='text-light head-6'>BETA</h6>
                    <FontAwesomeIcon icon={faFile}  className='pb-3 font' />
                    <p className='para-style'>Plans</p>
                </button>

                <button type="button" value='visualize' className='btn btn-outline-success color-draw col-lg-2' onClick={() => setSelectedOption('visualize')}>
                    <FontAwesomeIcon icon={faImage}  className='pb-3 font'/>
                    <p className='para-style'>Visualize</p>
                </button>

                <button type="button" value='render' className='btn btn-outline-success color-draw col-lg-2' onClick={() => setSelectedOption('render')}>
                    <FontAwesomeIcon icon={faBox}  className='pb-3 font' />
                    <p className='para-style'>Render</p>
                </button>

                <button type="button" value='restyle' className='btn btn-outline-success color-draw col-lg-2' onClick={() => setSelectedOption('restyle')}>
                    <FontAwesomeIcon icon={faPalette} className='pb-3 font' />
                    <p className='para-style'>Restyle</p>
                </button>
                
            </div>
        <div className='text-center mt-4'>
          <button type="submit" className="btn btn-success"> Create<FontAwesomeIcon  className="pl-3 pr-3" icon={faArrowRight} /></button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Ainew;

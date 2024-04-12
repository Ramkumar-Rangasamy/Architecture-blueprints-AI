import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

import './ailogic.css';

function Ailogic() {
  const location = useLocation();
  const { state } = location;
  const { projectName, selectedOption } = state || {};



  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    floors: '',
    unit: '',
    totalArea: '',
    bedrooms: '',
    bathrooms: '',
    garage: '',
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile || null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      toast.error('Please choose a file.');
      return;
    }
  
    const formDataObj = new FormData();
    formDataObj.append('profile', file);
  
    for (const [key, value] of Object.entries(formData)) {
      formDataObj.append(key, value);
    }
  
    try {
      const response = await axios.post('http://localhost:2023/post/imagedetails', formDataObj);
  
     
        const data = response.data;
        toast.success('Upload successful:', data);
        setTimeout(() => {
          navigate('/image-details/:BlueprintID');
        }, 4000);
        
    } catch (error) {
      
        console.error('Error during upload:', error);
     
  
      toast.error('Upload failed. Check console for details.');
    }
  };

  return (
    <>
      <div className='aliogic text-light d-flex justify-content-center align-items-center'>
        <div className='row'>
          <div className='p-5 col-lg-6'>
            <h2 className='text-light text-center p-5'>Ai automatically generate architecture design</h2>
            <div className='col-lg-6 row'>
              <div className='col-lg-6 pt-5'>
                {projectName && <h3 className='pt-3'> <FontAwesomeIcon icon={faArrowLeft}/> {projectName}</h3>}
              </div>
              <div className='col-lg-6'>
                {selectedOption && <h4 className='enter_ailogic d-flex justify-content-center align-items-center ml-5 '>{selectedOption}</h4>}
              </div>
            </div>
          </div>

          <div className='col-lg-6 '>
            <ToastContainer />
            <form className='p-5 form-ailogic' onSubmit={handleSubmit}>
              <h1 className='text-center pb-3'>Create your floorplan</h1>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1" className='label-ailogic '>Choose a file</label>
                <input type="file" className="form-control-file " id="exampleFormControlFile1" onChange={handleFileChange} />
              </div>

              <div className="row">
                <div className="col-6">
                  <label className='label-ailogic' htmlFor="inputState">Type</label>
                  <select id="inputState" className="form-control" value={formData.type} onChange={handleInputChange} name="type">
                    <option defaultValue>Select an Option</option>
                    <option>Technical</option>
                    <option>Stylized</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className='label-ailogic' htmlFor="inputStateone">Floors</label>
                  <select id="inputStateone" className="form-control" value={formData.floors} onChange={handleInputChange} name="floors">
                    <option defaultValue>Select an Option</option>
                    <option>1 floor</option>
                    <option>2 floor</option>
                  </select>
                </div>
              </div>

              <div className="row pt-4">
                <div className="col-6">
                  <label className='label-ailogic' htmlFor="inputStatetwo">Unit</label>
                  <select id="inputStatetwo" className="form-control" value={formData.unit} onChange={handleInputChange} name="unit">
                    <option defaultValue>Select an Option</option>
                    <option>Meter</option>
                    <option>Feet</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className='label-ailogic' htmlFor="inputAddress">Total area</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={formData.totalArea} onChange={handleInputChange} name="totalArea" />
                </div>
              </div>

              <div className="row pt-4">
                <div className="form-group col-6">
                  <label className='label-ailogic' htmlFor="Bedrooms">Bedrooms</label>
                  <input type="number" className="form-control" id="Bedrooms" value={formData.bedrooms} onChange={handleInputChange} name="bedrooms" />
                </div>

                <div className="form-group col-6">
                  <label className='label-ailogic' htmlFor="Bathrooms">Bathrooms</label>
                  <input type="number" className="form-control" id="Bathrooms" value={formData.bathrooms} onChange={handleInputChange} name="bathrooms" />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-6">
                  <label className='label-ailogic' htmlFor="Garage">Garage</label>
                  <input type="number" className="form-control" id="Garage" value={formData.garage} onChange={handleInputChange} name="garage" />
                </div>
                <div className="form-group col-6 pt-3">
                  <button type="submit" className="btn btn-success p-2  col-10">Generate</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ailogic;

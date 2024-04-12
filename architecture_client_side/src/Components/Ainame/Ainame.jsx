import React, { useState, useEffect } from 'react';
import './ainame.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt, faDownLong ,faTags,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import heder_2 from './assets-chi/header-2.jpg';
import heder_3 from './assets-chi/them-12.jpg';
import heder_4 from './assets-chi/modtiy.jpg';
import heder_5 from './assets-chi/heder-speed.png';
import heder_6 from './assets-chi/soical.jpg';
import heder_7 from './assets-chi/thankyou.png'; 

function Ainame() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        setProjects([]);
        const response = await fetch('http://localhost:2023/getprojects');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteProjectId, setDeleteProjectId] = useState('');

  const handleDelete = (projectId) => {
    setDeleteProjectId(projectId);
    fetch(`http://localhost:2023/deleteProject/${projectId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setDeleteMessage(data.message);
        setProjects(projects.filter(project => project.id !== projectId));
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
        setDeleteMessage('An error occurred while deleting the project.');
      });
  };

  return (
    <>
      <div className='enter_header'>
        <div className='enter_frist'>
          <h4>My Project</h4>
        </div>

        <div className='pl-5'>
          <div className=''>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='enter_project pt-5'>
                <FontAwesomeIcon icon={faPlus} className='font' />
                <Link to='/ainew'><p>New Project</p></Link>
              </div>
            </div>

            <div className=''>
              <h1 className='text-light'>Project List</h1>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className='d-flex justify-content-start align-items-center col-lg-12 row'>
                  {projects.map(project => (
                    <div className='enter_project p-4 m-5 col-lg-4' key={project.id}>
                      <p>{project.project}</p>
                      <h5>{project.tool}</h5>
                      <Link to='/ainew'><button className='btn bg-warning text-light'>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                        </button></Link>
                      <button onClick={() => handleDelete(project.id)} className='btn bg-danger text-light'>
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                      <Link to='/estimate'><button onClick={() => handleDelete(project.id)} className='btn bg-success text-light'>
                      <FontAwesomeIcon icon={faTags} /> Price
                      </button></Link>
                    </div>
                  ))}
                </div>
              )}
              {deleteMessage && <p className='text-light p-5'>{deleteMessage}</p>}
            </div>
          </div>

          <div>
            <div className='text-light p-5'>
              <h2 className='text-light'>Quick actions <FontAwesomeIcon icon={faDownLong} className='font' /></h2>
              <p>Get started by clicking on an action below</p>
            </div>
            <div className='row container pl-5 '>
                   <div className="card m-2" style={{"width":"18rem"}}>
                        <img src={heder_2} className="card-img-top p-2" alt="..."/>
                        <div className="card-body">
                            <h5>Generate a Floorplan</h5>
                            <p className="card-text">Residential AI-generated floorplans in seconds </p>
                        </div>
                    </div>
                    <div className="card m-2" style={{"width":" 18rem"}}>
                        <img src={heder_3} className="card-img-top p-2" alt="..."/>
                        <div className="card-body">
                            <h5>Visualize Your Concepts</h5>
                            <p className="card-text"> Bring your ideas to life. Create a circle having any radius.</p>
                        </div>
                    </div>
                    <div className="card m-2" style={{"width":" 18rem"}}>
                        <img src={heder_4} className="card-img-top p-2" alt="..."/>
                        <div className="card-body">
                            <h5>Modify your existing floorplan</h5>
                            <p className="card-text">Ai-powered floorplan refinement</p>
                        </div>
                    </div>
                    <div className="card m-2"style={{"width":" 18rem"}}>
                        <img src={heder_5} className="card-img-top p-2" alt="..."/>
                        <div className="card-body">
                            <h5>Speed up your design process</h5>
                            <p className="card-text"> Accelerate Early-Stage Planning</p>
                        </div>
                    </div>
                    <div className="card m-2" style={{"width":" 18rem"}}>
                        <img src={heder_6} className="card-img-top p-2" alt="..."/>
                        <div className="card-body">
                            <h5>Social Media Content Generator</h5>
                            <p className="card-text"> Create photo-realistic renderings in seconds</p>
                        </div>
                    </div>
                    <div className="card m-2" style={{"width":" 18rem"}}>
                        <img src={heder_7} className="card-img-top p-2" alt="..."/>
                        <div className="card-body">
                            <h5>Get inspired </h5>
                            <p className="card-text">Create the designs of tomorrow, today</p>
                        </div>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ainame;





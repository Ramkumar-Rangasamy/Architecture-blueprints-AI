import React from 'react';

import './aienter.css';
import imageai_one from '../Assets/imageai-1.gif';
import imageai_two from '../Assets/imageai-2.gif';
import imageai_three from '../Assets/imageai-3.gif';
import imageai_four from '../Assets/imageai-4.gif';



import {Link} from 'react-router-dom';

function Aienter() {
  return (
    <>
     <div className='start-interfacr'>
           <div className='page-header'>
            
                <div className="card-body text-center p-4">
                    <h1 className="card-title">AI Generative Stack for Apartment Building Design</h1>
                    <p className="card-text p-3">OPAL.AI enables instant generation of floor plans in AutoCAD, Revit, and BIM using smartphones. Scan a space, get a detailed 2D or 3D floor plan, and edit it easily. Create a floorplan BIM with just a smartphone. Automatically declutter and provide a comprehensive floor plan.</p>       
                </div>


                <div className=' p-5 '>
                    <div className="card-group"> 
                        <div className="card  col-lg-3">
                            <img src={imageai_one} className="card-img-top" alt="..."/>
                        
                        </div>
                        <div className="card  col-lg-3">
                            <img src={imageai_three} className="card-img-top" alt="..."/>   
                        </div>
                      
                        <div className="card  col-lg-3">
                            <img src={imageai_two} className="card-img-top" alt="..."/>
                            
                        </div>
                        <div className="card  col-lg-3">
                            <img  src={imageai_four} className="card-img-top" alt="..."/>
                            
                        </div>   

                    </div>
                    
                    <div className='pt-4 text-center '>
                        <h4>
                        Seamlessly design, explore, and comply—empowering your creative vision with intelligent automation
                        </h4>
                    </div>
                    <div className='p-4 d-flex justify-content-end align-items-center'>
                     <Link to='/ainame' className="nav-link"> <button type="button" className=" colorbutton pl-5 pr-5">GET STARTED</button></Link> 
                    </div>

                </div>
               
            </div>
        </div>
    </>
  )
}

export default Aienter
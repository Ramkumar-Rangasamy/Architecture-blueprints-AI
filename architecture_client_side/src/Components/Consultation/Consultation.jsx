import React from 'react'
import'./consultation.css';
function Consultation() {
  return (
    <>
     <div className='container'>
        <div className='text-center consul'>
            <h1 className='p-4'>Talk to an Expert Interior Designer!</h1>
            <p className='para'>(Currently operating only in Mumbai, and the MMR region)</p>
            <p className='para-one col-lg-12'>End-to-end interior design & execution services for homes, offices & other commercial spaces. Handpicked designers, 
            warranty backed solutions, fully customised!</p>
        </div>
        
        <div className='d-flex justify-content-center align-items-center p-4'>
        <form>
            <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="inputEmail4" className='lllabel'>Name <span>(required)</span></label>
                    <div>
                        <label for="inputEmail4" className='lllabel'>First Name</label>
                        <input type="email" className="form-control" id="inputEmail4"/>
                    </div>    
                </div>

                <div className="form-group col-md-6 pt-2">
                <label for="inputEmail4" ></label>
                    <div>
                    <label for="inputPassword4" className='lllabel'>Last Name</label>
                    <input type="password" className="form-control" id="inputPassword4"/>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label for="inputAddress" className='lllabel'>Email Address <span>(required)</span></label>
                <input type="text" className="form-control" id="inputAddress" />
            </div>
            <div className="form-group">
                <label for="inputAddress2" className='lllabel'>Phone Number <span>(required)</span></label>
                <input type="text" className="form-control" id="inputAddress2" />
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                 <label for="inputState" className='lllabel'>Approx. Budget <span>(required)</span></label>
                  <p className='this-amout'>This is the total amount you are willing to spend</p>
                    <select id="inputState" className="form-control">
                        <option selected>Select an option</option>
                        <option>0  to 25 Lakhs</option>
                        <option>25 to 35 Lakhs</option>
                        <option>35 to 55 Lakhs</option>
                        <option>55 to 80 Lakhs</option>
                        <option>80 Lakhs to 1.5Cr</option>
                        <option>1.5Cr+</option>
                    </select>
                </div>
               
            </div>
            <div className='d-flex justify-content-center align-items-center pt-5'>
             <button type="button" className="btn btn-success pr-5 pl-5">Contact Me</button>
            </div>
           
        </form>
        </div>
    </div>
    </>
  )
}

export default Consultation
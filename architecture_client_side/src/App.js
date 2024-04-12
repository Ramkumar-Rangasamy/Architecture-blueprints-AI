import logo from './logo.svg';
import './App.css';

//Bootstrap imported
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import {BrowserRouter,Routes,Route} from 'react-router-dom';

import NavBar from './Components/NavBar/NavBar';
import SignUp from './Components/Signup&login/Signup';
import Login from './Components/Signup&login/Login';
import Home from './Components/Home/Home';
import Aienter from './Components/Aienter/Aienter';
import Ainame from './Components/Ainame/Ainame';
import Ainew from './Components/Ainew/Ainew';
import Ailogic from './Components/Ailogic/Ailogic';
import Aigenerate from './Components/Aigenerate/Aigenerate';
import Estimate from './Components/Estimate/Estimate';
import Consultation from './Components/Consultation/Consultation';

function App() {
  const projectId = 1;
  return (
  <>

<BrowserRouter>
     <NavBar/>
      <Routes>
       <Route path='/'   element={<Home/>}/>
       <Route path='/estimate'   element={<Estimate/>}/>
       <Route path='/consultation'   element={<Consultation/>}/>
       <Route path='/signup'   element={<SignUp/>}/>
       <Route path='/login'   element={<Login/>}/>
       <Route path='/aienter'   element={<Aienter/>}/>
       <Route path='/ainame'   element={<Ainame/>}/>
       <Route path='/ainew'   element={<Ainew/>}/>
       <Route path='/ailogic'   element={<Ailogic projectId={projectId}/>}/>
       <Route path='/image-details/:BlueprintID' element={<Aigenerate/> }/>
      
      </Routes> 
    </BrowserRouter>
    

   
   
  </>
  );
}

export default App;

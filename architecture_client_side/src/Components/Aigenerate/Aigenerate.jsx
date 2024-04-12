// Aigenerate.jsx
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Aigenerate = () => {
  const [blueprintID, setBlueprintID] = useState(''); // Set your initial BlueprintID here
  const [imageDetails, setImageDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:2023/get/imagedetails/${blueprintID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setImageDetails(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching image details:', error.message);
        setError('Error fetching image details. Please try again.');
      }
    };

    if (blueprintID) {
      fetchImageDetails();
    }
  }, [blueprintID]);

  return (
    <div>
       <div className='p-5'>
        <h1 className='text-dark pr-5'> Enter ID</h1>
        <input type="text" value={blueprintID} onChange={(e) => setBlueprintID(e.target.value)} />
       </div>
      
      {error && <p>{error}</p>}
      {imageDetails && (
        <div className='p-5'>
          <p>GenerateBlueprint</p>
          <p>Image URL: {imageDetails.imageUrl}</p>
          <img src={imageDetails.imageUrl}  alt="Blueprint" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          {/* Add other properties as needed */}
        </div>
        
      )}
      <div className='p-5'>
          <Link to='/ainew'><button className='btn bg-success text-light'>Edit page </button></Link>
        </div>
    </div>
  );
}

export default Aigenerate;

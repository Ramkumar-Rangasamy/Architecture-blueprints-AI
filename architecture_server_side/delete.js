app.use('/profile', express.static(path.join(__dirname, 'public/images')));

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

const uploadHandler = upload.single('profile');


// const winston = require('winston');
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.simple(),
//   transports: [new winston.transports.Console()],
// });

app.post('/post/imagedetails', async (req, res) => {
  try {
    console.log('Entering /post/imagedetails route...');

    uploadHandler(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // ... (handle Multer errors)
        return;
      }

      if (!req.file) {
        // ... (handle case when no file is uploaded)
      } else {
        try {
          const { type, floors, unit, totalArea, bedrooms, bathrooms, garage } = req.body;

          const imageDetails = {
            type,
            floors,
            unit,
            totalArea,
            bedrooms,
            bathrooms,
            garage,
          };

          const imageUrlImage = await generateImage(imageDetails);
          console.log({ imageUrlImage });

          const imageUrlBlueprint = await generateBlueprint(imageDetails);
          console.log({ imageUrlBlueprint });

          res.status(200).json({ imageUrlImage, imageUrlBlueprint });
        } catch (error) {
          console.error('Error in image details route:', error);
          res.status(500).send('Internal Server Error');
        }
      }
    });

    console.log('Exiting /post/imagedetails route...');
  } catch (error) {
    console.error('Error in /post/imagedetails route:', error);
    res.status(500).send('Internal Server Error');
  }
});












async function generateImage(details) {
  try {
    const { insetid, type, floors, unit, totalArea, bedrooms, bathrooms, garage } = details;

    // Check if insetid is provided and not an empty string
    const insetidValue = insetid !== '' ? insetid : null;

    // Log details for debugging
    console.log('Details:', details);

    // Construct the uniqueIdentifier without including insetid if it's null
    const identifierParts = [insetid, type, floors, unit, totalArea, bedrooms, bathrooms, garage];
    if (insetidValue !== null) {
      identifierParts.unshift(insetidValue);
    }
    const uniqueIdentifier = identifierParts.join('_');

    const imageUrl = `http://localhost:${port}/profile/${uniqueIdentifier}.jpg`;

    // Save image details to the database
    await new Promise((resolve, reject) => {
      dbPool.query(
        'INSERT INTO imageinset (insetid, Image, Type, Floors, Unit, TotalArea, Bedrooms, Bathrooms, Garage, status, effectiveFrom, effectiveTo, createdBy, createdOn, modifiedBy, modifiedOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "active", CURRENT_DATE(), "9999-04-05", "admin", CURRENT_TIMESTAMP(), "admin", CURRENT_DATE())',
        [insetidValue, imageUrl, type, floors, unit, totalArea, bedrooms, bathrooms, garage],
        (err, result) => {
          if (err) {
            console.error('Error saving image details to the database:', err);
            reject(err);
          } else {
            console.log('Image details saved to the database');
            console.log('Image URL:', imageUrl);
            resolve(result);
          }
        }
      );
    });

    return imageUrl;
  } catch (error) {
    console.error('Error in generateImage:', error);
    throw error;
  }
}



async function generateBlueprint(details) {
  try {
    console.log('Entering generateBlueprint function...');
    const width = 800;
    const height = 600;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    
    // Background
    ctx.fillStyle = '#F8F8F8'; // Light gray background
    ctx.fillRect(0, 0, width, height);

    // Building with sketch-like lines
    ctx.strokeStyle = '#666666'; // Dark gray for sketch lines
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.strokeRect(100, 100, 600, 400);

    // Doors
    ctx.fillStyle = '#7F5539'; // Brown for doors
    ctx.fillRect(250, 250, 100, 200);

    // Windows
    ctx.fillStyle = '#ADD8E6'; // Light blue for windows
    ctx.fillRect(350, 150, 100, 50);
    ctx.fillRect(450, 150, 100, 50);

    // Dimension lines and text
    ctx.strokeStyle = '#333333'; // Darker gray for dimension lines
    ctx.lineWidth = 1;

    // Horizontal dimension line
    ctx.beginPath();
    ctx.moveTo(100, 550);
    ctx.lineTo(700, 550);
    ctx.stroke();

    // Vertical dimension line
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(50, 500);
    ctx.stroke();

    ctx.font = '14px Arial';
    ctx.fillStyle = '#333333';
    ctx.fillText(`${details.totalArea} sq.ft`, 400, 560);

    // Details Text
    ctx.font = '20px Arial';

    ctx.fillStyle = '#333333';

    const detailsText = `
      Type: ${details.type}
      Floors: ${details.floors}
      Units: ${details.unit}
      Bedrooms: ${details.bedrooms}
      Bathrooms: ${details.bathrooms}
      Garage: ${details.garage}
    `;

    ctx.fillText(detailsText, 70, 250);

     
    // Save the generated image
    const buffer = canvas.toBuffer('image/png');
    const fileName = `blueprint_${Date.now()}.png`;
    const filePath = path.join(__dirname, 'public/images', fileName);
    fs.writeFileSync(filePath, buffer);

    console.log('Blueprint with details generated successfully.');

    // Set imageUrl within the try block
    imageUrl = `http://localhost:2023/profile/${fileName}`;

    // Insert information into the database

    const insetId = details.insetid;

    // SQL queries
    const insertImageInsetQuery = `
      INSERT INTO imageinset (insetid, Image, Type, Floors, Unit, TotalArea, Bedrooms, Bathrooms, Garage, status, effectiveFrom, effectiveTo, createdBy, createdOn, modifiedBy, modifiedOn)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "active", CURRENT_DATE(), "9999-04-05", "admin", CURRENT_TIMESTAMP(), "admin", CURRENT_DATE())
    `;

    const insertBlueprintQuery = `
      INSERT INTO blueprint (FileName, FilePath, status, effectiveFrom, effectiveTo, createdBy, createdOn, modifiedBy, modifiedOn, insetid)
      VALUES (?, ?, "active", CURRENT_DATE(), "9999-04-05", "admin", CURRENT_TIMESTAMP(), "admin", CURRENT_DATE(), ?)
    `;

    // Using a transaction
    await new Promise((resolve, reject) => {
      dbPool.getConnection((err, connection) => {
        if (err) {
          console.error('Error getting database connection:', err);
          reject(err);
          return;
        }

        connection.beginTransaction(async (err) => {
          if (err) {
            console.error('Error starting transaction:', err);
            reject(err);
            return;
          }

          try {
            // Insert into 'imageinset'
            await new Promise((resolve, reject) => {
              const imageInsetValues = [
                insetId,
                imageUrl,
                details.type,
                details.floors,
                details.unit,
                details.totalArea,
                details.bedrooms,
                details.bathrooms,
                details.garage,
              ];

              connection.query(insertImageInsetQuery, imageInsetValues, (err, result) => {
                if (err) {
                  connection.rollback(() => {
                    console.error('Error rolling back transaction:', err);
                    reject(err);
                  });
                } else {
                  resolve(result);
                }
              });
            });

            // Then insert into 'blueprint'
            await new Promise((resolve, reject) => {
              connection.query(insertBlueprintQuery, [fileName, filePath, insetId], (err, result) => {
                if (err) {
                  connection.rollback(() => {
                    console.error('Error rolling back transaction:', err);
                    reject(err);
                  });
                } else {
                  connection.commit((err) => {
                    if (err) {
                      console.error('Error committing transaction:', err);
                      reject(err);
                    } else {
                      console.log('Transaction committed successfully.');
                      resolve(result);
                    }
                  });
                }
              });
            });

            resolve();
          } catch (error) {
            console.error('Error in transaction:', error);
            reject(error);
          } finally {
            connection.release();
          }
        });
      });
    });

    console.log('Exiting generateBlueprint function...');

    return { fileName, imageUrl };
  } catch (error) {
    console.error('Error generating blueprint:', error);
    throw error;
  }
}



// Assuming you have a route to fetch image details based on insetid
app.get('/get/imagedetails/:BlueprintID', async (req, res) => {
  try {
    const BlueprintID = req.params.BlueprintID;

    // Query the database to fetch image details based on insetid
    const query = 'SELECT * FROM blueprint WHERE BlueprintID = ?';
    dbPool.query(query, [BlueprintID], (err, results) => {
      if (err) {
        console.error('Error fetching image details from the database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Image details not found.' });
        return;
      }

      const imageDetails = results[0];
      res.status(200).json(imageDetails);
    });
  } catch (error) {
    console.error('Error in image details retrieval route:', error);
    res.status(500).send('Internal Server Error');
  }
});
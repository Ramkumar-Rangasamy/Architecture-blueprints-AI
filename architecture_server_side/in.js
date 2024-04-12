app.post('/post/imagdetails', (req, res) => {

    uploadHandler(req, res, function (err) {
  
      if (err instanceof multer.MulterError) {
        if (err.code == 'LIMIT_FILE_SIZE') {
          res.status(400).json({ message: 'Maximum file size is 5mb.' });
        }
        return;
      }
  
      if (!req.file) {
        res.status(400).json({ message: 'No file!' });
      } else {
        const { type, floors, unit, totalArea, bedrooms, bathrooms, garage } = req.body;
  
        
        const sql = 'INSERT INTO imageinset (Image, Type, Floors, Unit, TotalArea, Bedrooms, Bathrooms, Garage, status, effectiveFrom, effectiveTo, createdBy, createdOn, modifiedBy, modifiedOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "active", CURRENT_DATE(), "9999-04-05", "admin", CURRENT_TIMESTAMP(), "admin", CURRENT_DATE())';
  
        db.query(sql, [req.file.filename, type, floors, unit, totalArea, bedrooms, bathrooms, garage ], (err, result) => {
          if (err) {
            console.error('Error creating Image Details:', err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log('Image Details created successfully');
            res.status(201).json({
              success: 1,
              profile_url:  `http://localhost:2023/profile/${req.file.filename}`
            });
          }
        });
      }
    });
  });
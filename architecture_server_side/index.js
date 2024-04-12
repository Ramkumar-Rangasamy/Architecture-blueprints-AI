//package require
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { createPool } = require("mysql");

//We create a middleware called upload using multer
const multer = require("multer");
const path = require("path");
const { createCanvas } = require("canvas");
const fs = require("fs");

//import packages Using area in ( use keyword ) Middleware
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

// Create a connection createpool
const dbPool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ai_application",
  connectTimeout: 10,
});

//SignUp api post method using  here
app.post("/signup", (req, res) => {
  const { firstName, lastName, email, roles, password, checkbox } = req.body;

  // Check if the email already exists in the database
  const checkEmailQuery = "SELECT * FROM signuppage WHERE email = ?";
  dbPool.query(checkEmailQuery, [email], (emailErr, emailResults) => {
    if (emailErr) {
      // Log the error details
      console.error("Error checking email:", emailErr);

      
      return res.status(500).json({ error: "Internal server error" });
    }

    if (emailResults.length > 0) {
      
      return res.status(409).json({ error: "Email already exists" });
    }

    // Insert user data in database
    const insertUserQuery =
      "INSERT INTO signuppage (firstname, lastname, email, roles, password,checkbox, status, effectiveFrom, effectiveTo, createdBy, createdOn, modifiedBy, modifiedOn) VALUES (?, ?, ?, ?, ?, ?, 'active', CURRENT_DATE(), '9999-04-05', 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_DATE())";

    dbPool.query(
      insertUserQuery,
      [firstName, lastName, email, roles, password, checkbox],
      (insertErr, insertResults) => {
        if (insertErr) {
          // Log the error details
          console.error("Error inserting user:", insertErr);

          // Internal Server Error (500)
          return res.status(500).json({ error: "Internal server error" });
        }

        // Created (201) - Signup successful
        res.status(201).json({ message: "Signup successful" });
      }
    );
  });
});

//Login api post method using  here
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user with the provided email and password exists in the database
  const checkUserQuery =
    "SELECT * FROM signuppage WHERE email = ? AND password = ?";
  dbPool.query(checkUserQuery, [email, password], (userErr, userResults) => {
    if (userErr) {
      // Log the error details
      console.error("Error checking user:", userErr);

      // Internal Server Error (500)
      return res.status(500).json({ error: "Internal server error" });
    }

    if (userResults.length === 0) {
      // Unauthorized - User not found or incorrect credentials (401)
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // User found - Login successful
    res.status(200).json({ message: "Login successful", user: userResults[0] });
  });
});



// Project Name API 
app.post("/submitForm", (req, res) => {
  const { projectName, selectedOption } = req.body;

  // Validation: Check if the project name is provided and not empty
  if (!projectName || !projectName.trim()) {
    return res
      .status(400)
      .json({ error: "Please enter a valid project name." });
  }

  // Validation: Check if an AI tool is selected
  if (!selectedOption) {
    return res.status(400).json({ error: "Please select an AI tool." });
  }

  // Insert data into the 'newproject' table
  const sql =
    "INSERT INTO newproject (project, tool, status, effectiveFrom, effectiveTo, createdBy, createdOn, modifiedBy, modifiedOn) VALUES (?, ?, 'active', CURRENT_DATE(), '9999-04-05', 'admin', CURRENT_TIMESTAMP(), 'admin', CURRENT_DATE())";

  dbPool.query(sql, [projectName, selectedOption], (err, result) => {
    if (err) {
      console.error("Error executing MySQL query:", err.message);
      return res
        .status(500)
        .json({ error: "An error occurred while submitting the form." });
    }

    // Respond with success message
    res.json({ message: "Congratulations! Your project has come to life" });
  });
});

// New GET Project endpoint to fetch updated data
app.get("/getprojects", (req, res) => {
  const fetchProjectsSQL = "SELECT * FROM newproject";

  dbPool.query(fetchProjectsSQL, (fetchError, projects) => {
    if (fetchError) {
      console.error("Error executing MySQL query:", fetchError.message);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching projects." });
    }

    // Respond with the updated projects data
    res.json({ projects });
  });
});

// Api DELETE endpoint to delete a project
app.delete("/deleteProject/:id", (req, res) => {
  const projectId = req.params.id;

  // Perform the deletion in the database
  const deleteProjectSQL = "DELETE FROM newproject WHERE id = ?";

  dbPool.query(deleteProjectSQL, [projectId], (deleteError, result) => {
    if (deleteError) {
      console.error("Error executing MySQL query:", deleteError.message);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the project." });
    }

    // Respond with success message
    res.json({ message: "Project deleted successfully", result });
  });
});

// Api get projects one
app.get("/getprojectsone/:id", async (req, res) => {
  const projectId = req.params.id;
  const fetchProjectsSQL = "SELECT * FROM newproject WHERE id = id";

  try {
    console.log("Received request with projectId:", projectId);

    const projects = await new Promise((resolve, reject) => {
      dbPool.query(fetchProjectsSQL, [projectId], (fetchError, results) => {
        if (fetchError) {
          console.error("Error executing MySQL query:", fetchError.message);
          return reject("An error occurred while fetching projects.");
        }
        console.log("Query results:", results);
        resolve(results);
      });
    });

    // Log the fetched data and the SQL query
    console.log("Fetched Data:", projects);
    console.log("SQL Query:", fetchProjectsSQL);

    // Respond with the updated projects data
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error });
  }
});



app.use("/profile", express.static(path.join(__dirname, "public/images")));

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

const uploadHandler = upload.single("profile");

app.post("/post/imagedetails", async (req, res) => {
  try {
    uploadHandler(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code == "LIMIT_FILE_SIZE") {
          res.status(400).json({ message: "Maximum file size is 5mb." });
        }
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: "No file!" });
      } else {
        const { type, floors, unit, totalArea, bedrooms, bathrooms, garage } =
          req.body;

        try {
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
          console.error("Error in image details route:", error);
          res.status(500).send("Internal Server Error");
        }
      }
    });
  } catch (error) {
    console.error("Error in image details route:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function generateImage(details) {
  try {
    const {
      insetid,
      type,
      floors,
      unit,
      totalArea,
      bedrooms,
      bathrooms,
      garage,
    } = details;

    // Check if insetid is provided and not an empty string
    const insetidValue = insetid !== "" ? insetid : null;

    // Log details for debugging
    console.log("Details:", details);

    // Construct the uniqueIdentifier without including insetid if it null
    const identifierParts = [
      insetid,
      type,
      floors,
      unit,
      totalArea,
      bedrooms,
      bathrooms,
      garage,
    ];
    if (insetidValue !== null) {
      identifierParts.unshift(insetidValue);
    }
    const uniqueIdentifier = identifierParts.join("_");

    const imageUrl = `http://localhost:${port}/profile/${uniqueIdentifier}.jpg`;

    // Save image details to the database
    await new Promise((resolve, reject) => {
      dbPool.query(
        'INSERT INTO imageinset (insetid, Image, Type, Floors, Unit, TotalArea, Bedrooms, Bathrooms, Garage, status, effectiveFrom, effectiveTo, createdBy, createdOn, modifiedBy, modifiedOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "active", CURRENT_DATE(), "9999-04-05", "admin", CURRENT_TIMESTAMP(), "admin", CURRENT_DATE())',
        [
          insetidValue,
          imageUrl,
          type,
          floors,
          unit,
          totalArea,
          bedrooms,
          bathrooms,
          garage,
        ],
        (err, result) => {
          if (err) {
            console.error("Error saving image details to the database:", err);
            reject(err);
          } else {
            console.log("Image details saved to the database");
            console.log("Image URL:", imageUrl);
            resolve(result);
          }
        }
      );
    });

    return imageUrl;
  } catch (error) {
    console.error("Error in generateImage:", error);
    throw error;
  }
}

async function generateBlueprint(details) {
  try {
    const width = 800;
    const height = 600;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#F8F8F8"; // Light gray background
    ctx.fillRect(0, 0, width, height);

    // Building with sketch-like lines
    ctx.strokeStyle = "#666666"; // Dark gray for sketch lines
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.strokeRect(100, 100, 600, 400);

    // Doors
    ctx.fillStyle = "#7F5539"; // Brown for doors
    ctx.fillRect(250, 250, 100, 200);

    // Windows
    ctx.fillStyle = "#ADD8E6"; // Light blue for windows
    ctx.fillRect(350, 150, 100, 50);
    ctx.fillRect(450, 150, 100, 50);

    // Dimension lines and text
    ctx.strokeStyle = "#333333"; // Darker gray for dimension lines
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

    ctx.font = "14px Arial";
    ctx.fillStyle = "#333333";
    ctx.fillText(`${details.totalArea} sq.ft`, 400, 560);

    // Details Text
    ctx.font = "20px Arial";

    ctx.fillStyle = "#333333";

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
    const buffer = canvas.toBuffer("image/png");
    const fileName = `blueprint_${Date.now()}.png`;
    const filePath = path.join(__dirname, "public/images", fileName);
    fs.writeFileSync(filePath, buffer);

    console.log("Blueprint with details generated successfully.");

    // Insert information into the database

    const imageUrl = `http://localhost:2023/profile/${fileName}`;
    const insetId = details.insetid; // Assuming you have an 'insetid' property in the 'details' object

    await new Promise((resolve, reject) => {
      dbPool.getConnection((err, connection) => {
        if (err) {
          console.error("Error getting database connection:", err);
          reject(err);
          return;
        }

        const query = `
          INSERT INTO blueprint 
          (insetId, FileName, FilePath, status, effectiveFrom, effectiveTo, createdBy, createdOn,modifiedBy, modifiedOn)
          VALUES (?, ?, ?, "active", CURRENT_DATE(), "9999-04-05", "admin", CURRENT_TIMESTAMP(), "admin", CURRENT_DATE())
        `;

        const values = [insetId, fileName, filePath];

        connection.query(query, values, (err, result) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            console.error(
              "Error inserting blueprint details into the database:",
              err
            );
            reject(err);
          } else {
            console.log("Blueprint details saved to the database");
            resolve(result);
          }
        });
      });
    });

    return { fileName, imageUrl };
  } catch (error) {
    console.error("Error generating blueprint:", error);
    throw error;
  }
}

app.get("/get/imagedetails/:BlueprintID", async (req, res) => {
  try {
    const id = req.params.BlueprintID;

    // Log the received BlueprintID
    console.log("Received BlueprintID:", id);

    // Query the database to fetch image details based on BlueprintID
    const query =
      "SELECT  FileName, FilePath FROM blueprint WHERE BlueprintID = ?";
    dbPool.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error fetching image details from the database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (results.length === 0) {
        // Log the not found message
        console.log("Image details not found for BlueprintID:", id);
        res.status(404).json({ error: "Image details not found." });
        return;
      }

      const fileName = results[0].FileName;
      const imageUrl = `http://localhost:2023/profile/${fileName}`;
      const filePath = results[0].FilePath;
      const blueprintID = results[0].id;

      // Log the constructed image details
      console.log("Constructed Image Details:", {
        imageUrl,
        filePath,
        blueprintID,
      });

      // Include additional image details if needed
      const imageDetails = {
        imageUrl,
        filePath,
        blueprintID,
        // Add other properties as needed
      };

      res.status(200).json(imageDetails);
    });
  } catch (error) {
    console.error("Error in image details retrieval route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get('/get/imagedetails/:BlueprintID', (req, res) => {
//   const blueprintID = req.params.BlueprintID;

//   // Assuming you have a database connection named db
//   const sql = 'SELECT FileName, FilePath FROM blueprint WHERE BlueprintID = ?';

//   // Execute the SQL query with parameterized BlueprintID
//   dbPool.query(sql, [blueprintID], (err, results) => {
//     if (err) {
//       // Handle database query error
//       console.error('Error retrieving image details:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       if (results.length === 0) {
//         // No image details found for the provided BlueprintID
//         res.status(404).json({ message: 'No image details found' });
//       } else {
//         // Map the database results to a more structured response
//         const imageDetails = results.map(result => ({
//           fileName: result.FileName,
//           imageUrl: `http://localhost:2023/profile/${result.FileName}`,
//           FilePath: result.FilePath,
//           // Include other necessary fields
//         }));

//         // Send the structured response as JSON
//         res.status(200).json(imageDetails);
//       }
//     }
//   });
// });

//prot number




app.post("/api/estimate", (req, res) => {
  const { apartmentType, roomType, modularKitchen, carpetArea } = req.body;

  let baseEstimate = 100000;

  switch (apartmentType) {
    case "2bhk":
      baseEstimate += 44400;
      break;
    case "3bhk":
      baseEstimate += 66600;
      break;
    case "3.5bhk":
      baseEstimate += 77700;
      break;
    case "4bhk":
      baseEstimate += 88800;
      break;
    default:
      break;
  }

  switch (roomType) {
    case "Master Bedroom":
      baseEstimate += 103000;
      break;
    case "Home Office Study":
      baseEstimate += 50000;
      break;
    case "Parents":
      baseEstimate += 40000;
      break;
    case "Kids Bedroom":
      baseEstimate += 35000;
      break;
    case "Kids Room 1":
      baseEstimate += 30000;
      break;
    case "Kids Room 2":
      baseEstimate += 30000;
      break;
    case "Guest Bedroom":
      baseEstimate += 37500;
      break;
    default:
      break;
  }

  if (modularKitchen === "yes") {
    baseEstimate += 250000;
  }

  const areaFactor = parseFloat(carpetArea) || 0;
  baseEstimate += areaFactor * 5;

  // Save the estimate table to the MySQL database
  const insertQuery = `INSERT INTO estimates (apartmentType, roomType, modularKitchen, carpetArea, estimateResult, status, effectiveFrom, effectiveTo, createdBy, createdOn, modifiedBy, modifiedOn)
  VALUES (?, ?, ?, ?, ?, "active", CURRENT_DATE(), "9999-04-05", "admin", CURRENT_TIMESTAMP(), "admin", CURRENT_DATE())`;

  dbPool.query(
    insertQuery,
    [apartmentType, roomType, modularKitchen, carpetArea, baseEstimate],
    (err) => {
      if (err) {
        console.error("Error saving estimate to MySQL:", err.message);
        res.status(500).json({ error: "Error saving estimate" });
        return;
      }

      // Send result
      res.json({ result: baseEstimate });
    }
  );
});


const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: 'murugaworld1001@gmail.com',
    pass: 'Rangaraj1001'
  },
  connectionTimeout: 10000, // 10 seconds
  timeout: 10000
});

// Define a route for sending emails
app.post('/send-email', (req, res) => {
  // Extract email details from the request body
  const { to, subject, text } = req.body;

  // Define email options
  const mailOptions = {
    from: 'murugaworld1001@gmail.com',
    to,
    subject,
    text
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

const port = 2023;
//listening server and  port number in last
app.listen(port, () => {
  console.log(`Server is Running in ${port}`);
});

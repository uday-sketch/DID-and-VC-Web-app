const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { sequelize } = require("./models");
const identityRoutes = require("./routes/identityRoutes");

const app = express();
const port = process.env.PORT || 3002

const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());
app.use("/identity", identityRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

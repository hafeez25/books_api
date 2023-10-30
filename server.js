const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./config/Database");
const errorHandler = require("./middlewares/errorMiddleware");
const bookRoutes = require("./routes/bookRoutes");

require("dotenv").config();

// Connect to Database
DB();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      // Add frontend url here for API integration
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Server is running 🛠️" });
});

// Routes middleware
app.use("/api/v1/books", bookRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on PORT ${process.env.PORT}`)
);

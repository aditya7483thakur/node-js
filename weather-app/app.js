const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = 3000;

// Setup view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Root Route - renders the single handlebars view
app.get("/", (req, res) => {
  res.render("index", { title: "Weather App" });
});

// Mock Weather API Route
app.get("/weather", (req, res) => {
  const city = req.query.city || "Unknown City";

  // Fake weather data
  const weatherData = {
    city,
    temperature: "28°C",
    condition: "Sunny",
    humidity: "45%",
    wind: "10 km/h",
  };

  res.json(weatherData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

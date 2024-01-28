import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5500;

app.use(cors());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Define a route to handle weather data requests
app.get("/weather", async (req, res) => {
  const apiKey = process.env.API_KEY;
  const loc = req.query.loc;

  if (!loc) {
    return res.status(400).json({ error: "Please provide a location" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
    const response = await fetch(url);

    const data = await response.json();

    const formattedData = {
      loc: data.name.toUpperCase(),
      description: data.weather[0].description.toUpperCase(),
      temperature: Math.floor((data.main.temp - 273.15) * (9 / 5) + 32),
    };
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

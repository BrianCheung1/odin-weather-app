import "./style.css"
import { createForm, createInformation } from "./components/dom"

const apiKey = process.env.API_KEY
const giphyKey = process.env.GIPHY_API_KEY

async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`
  )
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  return response.json()
}

async function getGIF(query) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${encodeURIComponent(
      query
    )} weather`
  )
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  return response.json()
}

createForm()
const myForm = document.getElementById("myForm")
myForm.addEventListener("submit", async (event) => {
  event.preventDefault()

  const searchInput = document.querySelector("input[type=text]")
  const city = searchInput.value
  if (city) {
    try {
      const data = await getWeather(city)
      const gif = await getGIF(data.currentConditions.conditions)
      createInformation(data, gif)
    } catch (error) {
      console.log("Error fetching data", error)
      createInformation()
    }
  }
})

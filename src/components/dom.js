function createForm() {
  const container = document.querySelector(".formContainer")
  const form = document.createElement("form")
  const cityInput = document.createElement("input")
  const toggleWrapper = document.createElement("label") // Wrapper for slider
  const toggleTemp = document.createElement("input")
  const slider = document.createElement("span") // Slider element
  const submitButton = document.createElement("input")

  form.id = "myForm"

  cityInput.type = "text"
  cityInput.placeholder = "Search a city..."
  cityInput.name = "city"
  cityInput.id = "city"

  toggleWrapper.classList.add("switch") // Add class for styling
  toggleTemp.type = "checkbox"
  toggleTemp.id = "toggleTemp"
  slider.classList.add("slider") // Add slider class for styling

  toggleWrapper.appendChild(toggleTemp)
  toggleWrapper.appendChild(slider)

  submitButton.type = "submit"
  submitButton.value = "Search"

  form.appendChild(cityInput)
  form.appendChild(toggleWrapper)
  form.appendChild(submitButton)
  container.appendChild(form)
}

function createInformation(data, gif) {
  if (data) {
    console.log(data)
    const cityHeader = document.createElement("h1")
    const temperatureP = document.createElement("p")
    const description = document.createElement("p")
    const img = document.createElement("img")
    const container = document.querySelector(".informationContainer")
    updateTemperature(data.currentConditions.temp, temperatureP)
    container.textContent = ""
    cityHeader.textContent = data.resolvedAddress
    description.textContent = data.description
    img.src = gif.data.images.original.url
    img.style.width = "100%"
    img.style.maxHeight = "300px"
    container.appendChild(cityHeader)
    container.appendChild(temperatureP)
    container.appendChild(description)
    container.appendChild(img)
  } else {
    const errorMessage = document.createElement("h1")
    const container = document.querySelector(".informationContainer")
    container.textContent = ""
    errorMessage.textContent = "City Not Found"
    container.appendChild(errorMessage)
  }
}

function updateTemperature(temp, tempP) {
  const toggleTemp = document.querySelector("input[type=checkbox]")
  const tempC = ((temp - 32) * 5) / 9
  tempP.textContent = toggleTemp.checked
    ? (tempP.textContent = `${tempC.toFixed(1)} °C`)
    : (tempP.textContent = `${temp} °F`)
  toggleTemp.addEventListener("change", () => {
    toggleTemp.checked
      ? (tempP.textContent = `${tempC.toFixed(1)} °C`)
      : (tempP.textContent = `${temp} °F`)
  })
}

export { createForm, createInformation }

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/api.js":
/*!****************************!*\
  !*** ./src/scripts/api.js ***!
  \****************************/
/***/ ((module) => {

const header = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

module.exports = {
  fetchData: async function (url) {
    try {
      const response = await fetch(url, header);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};


/***/ }),

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ "./src/scripts/ui.js");
/* harmony import */ var _city_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./city.js */ "./src/scripts/city.js");
/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weather.js */ "./src/scripts/weather.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage.js */ "./src/scripts/storage.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constant.js */ "./src/scripts/constant.js");
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helper.js */ "./src/scripts/helper.js");







const storage = new _storage_js__WEBPACK_IMPORTED_MODULE_3__.Storage(_constant_js__WEBPACK_IMPORTED_MODULE_4__.initCityList, new Map(), new Set());

let initialCity = true;

await prepareInitCities();
await initializeUI();

async function initializeUI() {
  const searchHistory = storage.getSearchHistory();
  const lastCity = String(searchHistory.slice(-1)).split(",")[0].split(" ");
  if (lastCity) {
    await updateInfo(lastCity);
  }
  const ui = new _ui_js__WEBPACK_IMPORTED_MODULE_0__.UI(await updateInfo);
  ui.initializeInputText();
  ui.initializeSearchPress();
  ui.initializeSearchButton();
}

async function updateInfo(cityInfo) {
  const cityMap = storage.getCityMap();
  const cityNames = storage.getCityNames();

  if (initialCity === true) {
    const cityTitle = cityMap.get(cityInfo[0])[0];
    const latLong = cityMap.get(cityInfo[0])[1];
    initialCity = false;
    await showInfo(cityTitle, latLong);
  } else {
    if (cityNames.has(cityInfo.join(' '))) {
      const cityTitle = cityMap.get(cityInfo.join(' '))[0];
      const latLong = cityMap.get(cityInfo.join(' '))[1];
      await showInfo(cityTitle, latLong);
    } else {
      const city = await chooseCity(cityInfo);
      const latLong = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.createLocationName)(city.latitude, city.longitude);
      const cityTitle = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.createTitle)(city.city, city.country);
      storage.saveCityData(city.city, cityTitle, latLong);
      await showInfo(cityTitle, latLong);
    }
  }
}

async function showInfo(cityTitle, latLong) {
  (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.showLoader)();  
  const ui = new _ui_js__WEBPACK_IMPORTED_MODULE_0__.UI(updateInfo);
  const initWeather = new _weather_js__WEBPACK_IMPORTED_MODULE_2__.Weather();
  const weather = await initWeather.getForecastData(latLong);
  ui.clearWeatherInfo();
  ui.showCurrentInfo(
    cityTitle,
    weather.datetimeNow,
    weather.iconNow,
    weather.tempNow,
    weather.humidityNow,
    weather.windNow,
    weather.uvNow,
    weather.sunRiseNow,
    weather.sunSetNow
  );
  ui.showFutureInfo(
    weather.dates,
    weather.icons,
    weather.maxTemps,
    weather.minTemps,
    weather.avgHumiditys,
    weather.maxWinds,
    weather.uvs
  );
  ui.initializeInputText();
  ui.clearSearchBox();
  (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.hideLoader)();  
}

async function chooseCity(cityInfo) {
  return new Promise((resolve) => {
    cityInfo.forEach((oneCity) => {
      const initCity = new _city_js__WEBPACK_IMPORTED_MODULE_1__.City();
      const perCity = initCity.parseCityInfo(oneCity);
      const ui = new _ui_js__WEBPACK_IMPORTED_MODULE_0__.UI(updateInfo);
      ui.showChoices(perCity, (response) => {
        const chosenCity = response;
        resolve(chosenCity);
        ui.clearSearchRecommendations();
      });
    });
  });
}

async function prepareInitCities() {
  (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.showLoader)();  
  for (let i = 0; i < _constant_js__WEBPACK_IMPORTED_MODULE_4__.initCityList.length; i++) {
    const initCity = new _city_js__WEBPACK_IMPORTED_MODULE_1__.City();
    const city = await initCity.searchCityName(_constant_js__WEBPACK_IMPORTED_MODULE_4__.initCityList[i]);
    const latLong = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.createLocationName)(city.latitude, city.longitude);
    const cityTitle = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.createTitle)(city.city, city.country);
    storage.saveCityData(city.city, cityTitle, latLong);
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/scripts/city.js":
/*!*****************************!*\
  !*** ./src/scripts/city.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   City: () => (/* binding */ City)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/scripts/api.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper.js */ "./src/scripts/helper.js");



class City {
  constructor(city, country, latitude, longitude) {
    this.city = city;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  async searchCityName(userCity) {
    try {
      const urlSearchLoc = (0,_helper_js__WEBPACK_IMPORTED_MODULE_1__.createSearchUrl)(userCity);
      const rawData = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchData)(urlSearchLoc);
      return new City(
        rawData[0]["name"],
        rawData[0]["country"],
        rawData[0]["lat"],
        rawData[0]["lon"]
      );
    } catch (error) {
      (0,_helper_js__WEBPACK_IMPORTED_MODULE_1__.fetchErrorCallback)();
    }
  }

  parseCityInfo(rawData) {
    try {
      return new City(
        rawData["name"],
        rawData["country"],
        rawData["lat"],
        rawData["lon"]
      );
    } catch (error) {
      (0,_helper_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorCallback)();
    }
  }
}


/***/ }),

/***/ "./src/scripts/constant.js":
/*!*********************************!*\
  !*** ./src/scripts/constant.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initCityList: () => (/* binding */ initCityList),
/* harmony export */   urlForecast: () => (/* binding */ urlForecast),
/* harmony export */   urlSearch: () => (/* binding */ urlSearch)
/* harmony export */ });
const urlSearch = `https://api.weatherapi.com/v1/search.json?key=apiKey&q=startsWith`;
const urlForecast = `https://api.weatherapi.com/v1/forecast.json?key=apiKey&q=typeYourLocation&days=7`;
const initCityList = ["Ulaanbaatar, Mongolia"];


/***/ }),

/***/ "./src/scripts/helper.js":
/*!*******************************!*\
  !*** ./src/scripts/helper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createForecastUrl: () => (/* binding */ createForecastUrl),
/* harmony export */   createLocationName: () => (/* binding */ createLocationName),
/* harmony export */   createSearchUrl: () => (/* binding */ createSearchUrl),
/* harmony export */   createTitle: () => (/* binding */ createTitle),
/* harmony export */   fetchErrorCallback: () => (/* binding */ fetchErrorCallback),
/* harmony export */   hideLoader: () => (/* binding */ hideLoader),
/* harmony export */   parseErrorCallback: () => (/* binding */ parseErrorCallback),
/* harmony export */   searchErrorCallback: () => (/* binding */ searchErrorCallback),
/* harmony export */   showLoader: () => (/* binding */ showLoader),
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./src/scripts/constant.js");

const apiKey = "fe20f4ec1c75486287c20009231910";

function toCamelCase(inputString) {
  const words = inputString.split(" ");
  const camelCaseWords = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 0) {
      const camelCaseWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
      camelCaseWords.push(camelCaseWord);
    }
  }
  const camelCaseString = camelCaseWords.join("");
  return camelCaseString;
}

function createSearchUrl(cityName) {
  return _constant_js__WEBPACK_IMPORTED_MODULE_0__.urlSearch.replace("apiKey", apiKey).replace("startsWith", cityName);
}

function createForecastUrl(latLong) {
  return _constant_js__WEBPACK_IMPORTED_MODULE_0__.urlForecast
    .replace("apiKey", apiKey)
    .replace("typeYourLocation", latLong);
}

function createLocationName(latitude, longitude) {
  return latitude + "," + longitude;
}

function createTitle(cityName, coutryName) {
  return cityName + ", " + coutryName;
}

function fetchErrorCallback() {
  throw new Error("A problem occured during Fetch API!");
}

function parseErrorCallback() {
  throw new Error("City parse operation failed.");
}

function searchErrorCallback() {
  throw new Error("There is not any city with given name.");
}

function showLoader() {
  document.querySelector("#loadContainer").classList.add("loader-container");  
  document.querySelector("#load").classList.add("loader");    
}

function hideLoader() {
  document.querySelector("#loadContainer").classList.remove("loader-container");
  document.querySelector("#load").classList.remove("loader");
}


/***/ }),

/***/ "./src/scripts/storage.js":
/*!********************************!*\
  !*** ./src/scripts/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Storage: () => (/* binding */ Storage)
/* harmony export */ });
class Storage {
  constructor(searchHistory, cityMap, cityNames) {
    this.searchHistory = searchHistory;
    this.cityMap = cityMap;
    this.cityNames = cityNames;

    if (typeof localStorage === "undefined") {
      console.warn("localStorage is not supported by the browser.");
    } else {
      localStorage.setItem(
        "Search Histoy Data",
        JSON.stringify(this.searchHistory)
      );
      localStorage.setItem(
        "City Name Map Data",
        JSON.stringify(Array.from(this.cityMap.entries()))
      );
      localStorage.setItem(
        "City Name Data",
        JSON.stringify(Array.from(this.cityNames))
      );
    }
  }
  getSearchHistory() {
    return JSON.parse(localStorage.getItem("Search Histoy Data")) || [];
  }
  getCityMap() {
    return new Map(
      JSON.parse(localStorage.getItem("City Name Map Data")) || []
    );
  }
  getCityNames() {
    return new Set(JSON.parse(localStorage.getItem("City Name Data")) || []);
  }
  saveCityData(cityName, cityTitle, cityLatlong) {
    if (!this.cityNames.has(cityName) && cityName !== undefined) {
      this.saveCityId(cityName);
      this.saveSearchHistory(cityTitle);
      this.saveCityMap(cityName, cityTitle, cityLatlong);
    }
  }

  saveSearchHistory(cityTitle) {
    const searchHistory =
      JSON.parse(localStorage.getItem("Search Histoy Data")) || [];
    searchHistory.push(cityTitle);
    localStorage.setItem("Search Histoy Data", JSON.stringify(searchHistory));
  }

  saveCityId(cityName) {
    const cityNames = new Set(
      JSON.parse(localStorage.getItem("City Name Data")) || []
    );
    cityNames.add(cityName);
    localStorage.setItem(
      "City Name Data",
      JSON.stringify(Array.from(cityNames))
    );
  }

  saveCityMap(cityName, cityTitle, cityLatlong) {
    const cityMap = new Map(
      JSON.parse(localStorage.getItem("City Name Map Data")) || []
    );
    cityMap.set(cityName, [cityTitle, cityLatlong]);
    localStorage.setItem(
      "City Name Map Data",
      JSON.stringify(Array.from(cityMap.entries()))
    );
  }
}


/***/ }),

/***/ "./src/scripts/ui.js":
/*!***************************!*\
  !*** ./src/scripts/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UI: () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ "./src/scripts/helper.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./src/scripts/api.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_api_js__WEBPACK_IMPORTED_MODULE_1__);



class UI {
  constructor(getCityInfo) {
    this.searchHistory = new Set(
      JSON.parse(localStorage.getItem("Search Histoy Data")) || []
    );
    this.getCityInfo = getCityInfo;
  }

  showCityHistory() {
    this.searchHistory.forEach((element) => {
      const cityChoice = document.createElement("li");
      cityChoice.setAttribute("id", "citySelection");
      cityChoice.onclick = async () => {
        const elementcity = element.split(",")[0];
        await this.checkAndFetchData(elementcity);
      };
      cityChoice.innerHTML = element;
      cityRecommend.append(cityChoice);
    });
  }

  initializeInputText() {
    searchCity.addEventListener("click", () => {
      this.clearSearchRecommendations();
      this.showCityHistory();
    });
  }

  initializeSearchPress() {
    searchCity.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        
        let cityRecommendList = document.getElementById("cityRecommend");
        let cityRecommendElements = cityRecommendList.querySelectorAll("li");

        if (cityRecommendElements.length === 0) {
          console.log("Nothing to search. Enter new text or wait until autfill recommends a city.")
        } else {
          cityRecommendElements[cityRecommendElements.length - 1].click();
        }
        
      } else {
        let text = document.getElementById("searchCity").value;
        if (text.length === 0) {
          console.log("Cannot search empty text");
        } else {
          console.log(text);
          document.getElementById("searchButton").click();
        }
      }
    });
  }

  initializeSearchButton() {
    searchButton.addEventListener("click", async () => {
      this.clearSearchRecommendations();
      const element = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(searchCity.value);
      await this.checkAndFetchData(element);
    });
  }

  async checkAndFetchData(element) {
    const citydata = new Set(
      JSON.parse(localStorage.getItem("City Name Data"))
    );
    if (citydata.has(element)) {
      this.clearSearchRecommendations();
      if (typeof element == "string") {
        element = element.split(" ");
      }
      this.getCityInfo(element);
    } else {
      const urlSearchLoc = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.createSearchUrl)(element);
      try {
        const response = await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.fetchData)(urlSearchLoc);
        if (response.length === 0) {
          // searchErrorCallback();
          console.log("Please enter more letters...");
        } else {
          this.clearSearchRecommendations();
          this.getCityInfo(response);
        }
      } catch (error) {
        throw error;
      }
    }
  }

  async showChoices(oneCity, getCityName) {
    let cityChoice = document.createElement("li");
    cityChoice.setAttribute("id", "citySelection");
    cityChoice.onclick = function () {
      getCityName(oneCity);
    };
    cityChoice.innerHTML = `${oneCity.city}, ${oneCity.country}`;
    cityRecommend.append(cityChoice);
  }

  clearSearchRecommendations() {
    cityRecommend.innerHTML = "";
  }

  clearWeatherInfo() {
    dailyForecast.innerHTML = "";
  }

  clearSearchBox() {
    searchCity.value = "";
  }

  showCurrentInfo(
    cityTitle,
    datetimeNow,
    iconNow,
    tempNow,
    humidityNow,
    windNow,
    uvNow,
    sunRiseNow,
    sunSetNow
  ) {
    cityNameDate.textContent = cityTitle;
    datetime.textContent = datetimeNow;
    weatherIcon.src = iconNow;
    temp.textContent = tempNow;
    humi.textContent = humidityNow;
    wind.textContent = windNow;
    uv.textContent = uvNow;
    sunRise.textContent = sunRiseNow;
    sunSet.textContent = sunSetNow;
  }

  showFutureInfo(
    dates,
    icons,
    maxTemps,
    minTemps,
    avgHumiditys,
    maxWinds,
    uvs,
  ) {
    for (let i = 0; i < 7; i++) {
      const dayForecast = document.createElement("div")
      const day = document.createElement("div");
      const icon = document.createElement("img");
      const maxTemp = document.createElement("div");
      const minTemp = document.createElement("div");
      const avgHumidity = document.createElement("div");
      const maxWind = document.createElement("div");
      const uv = document.createElement("div");

      day.innerHTML = dates[i];
      icon.src = icons[i];
      maxTemp.innerHTML = `<p>Max:</p> <p>${maxTemps[i]}<span>&#8451;</span></p>`;
      minTemp.innerHTML = `<p>Min:</p> <p>${minTemps[i]}<span>&#8451;</span></p>`;
      avgHumidity.innerHTML = `<p>H:</p> <p>${avgHumiditys[i]}%</p>`;
      maxWind.innerHTML = `<p>W:</p> <p>${maxWinds[i]}km/h</p>`;
      uv.innerHTML = `<p>UV:</p> <p>${uvs[i]}</p>`;

      dayForecast.append(day);
      dayForecast.append(icon);
      dayForecast.append(maxTemp);
      dayForecast.append(minTemp);
      dayForecast.append(avgHumidity);
      dayForecast.append(maxWind);
      dayForecast.append(uv);

      maxTemp.classList.add("day-forecast")
      minTemp.classList.add("day-forecast")
      avgHumidity.classList.add("day-forecast")
      maxWind.classList.add("day-forecast")
      uv.classList.add("day-forecast")
      dailyForecast.append(dayForecast);
    }
  }
}


/***/ }),

/***/ "./src/scripts/weather.js":
/*!********************************!*\
  !*** ./src/scripts/weather.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Weather: () => (/* binding */ Weather)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/scripts/api.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper.js */ "./src/scripts/helper.js");



class Weather {
  constructor(
    datetimeNow,
    iconNow,    
    tempNow,
    humidityNow,
    windNow,
    uvNow,
    sunRiseNow,
    sunSetNow,
    dates,
    icons,
    maxTemps,
    minTemps,
    avgHumiditys,
    maxWinds,
    uvs
  ) {
    this.datetimeNow = datetimeNow;
    this.iconNow = iconNow;
    this.tempNow = tempNow;
    this.humidityNow = humidityNow;
    this.windNow = windNow;
    this.uvNow = uvNow;
    this.sunRiseNow = sunRiseNow;
    this.sunSetNow = sunSetNow;    
    this.dates = dates;
    this.icons = icons;
    this.maxTemps = maxTemps;
    this.minTemps = minTemps;
    this.avgHumiditys = avgHumiditys;
    this.maxWinds = maxWinds;
    this.uvs = uvs;
  }

  async getForecastData(latLong) {
    try {
      const urlForeLoc = (0,_helper_js__WEBPACK_IMPORTED_MODULE_1__.createForecastUrl)(latLong);
      const rawData = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchData)(urlForeLoc);
      const rawDataJson = JSON.stringify(rawData)
      const weatherApiData = this.parseWeatherData(rawDataJson);
      return new Weather(
        weatherApiData.get("currentInfo").get("datetime"),
        weatherApiData.get("currentInfo").get("icon"),
        weatherApiData.get("currentInfo").get("temp"),
        weatherApiData.get("currentInfo").get("humidity"),
        weatherApiData.get("currentInfo").get("windKph"),
        weatherApiData.get("currentInfo").get("uv"),
        weatherApiData.get("currentInfo").get("sunRise"),
        weatherApiData.get("currentInfo").get("sunSet"),        
        weatherApiData.get("forecastInfo").get("dates"),
        weatherApiData.get("forecastInfo").get("icons"),
        weatherApiData.get("forecastInfo").get("maxTemps"),
        weatherApiData.get("forecastInfo").get("minTemps"),
        weatherApiData.get("forecastInfo").get("avgHumiditys"),
        weatherApiData.get("forecastInfo").get("maxWinds"),
        weatherApiData.get("forecastInfo").get("uvs")
      );
    } catch (error) {
      (0,_helper_js__WEBPACK_IMPORTED_MODULE_1__.fetchErrorCallback)();
    }
  }

  parseWeatherData(rawWeatherData) {
    const current = JSON.parse(rawWeatherData)["current"];
    const forecast = JSON.parse(rawWeatherData)["forecast"]["forecastday"];
    const currentInfo = new Map([
      ["datetime", current["last_updated"]],
      ["icon", current["condition"]["icon"]],
      ["temp", current["temp_c"]],
      ["humidity", current["humidity"]],
      ["windKph", current["wind_kph"]],
      ["uv", current["uv"]],
      ["sunRise", forecast[0]["astro"]["sunrise"]],
      ["sunSet", forecast[0]["astro"]["sunset"]],      
    ]);

    const dates = [];
    const icons = [];
    const maxTemps = [];
    const minTemps = [];
    const avgHumiditys = [];
    const maxWinds = [];
    const uvs = [];

    for (let i = 0; i < 7; i++) {
      dates.push(forecast[i]["date"]);
      icons.push(forecast[i]["day"]["condition"]["icon"]);
      maxTemps.push(forecast[i]["day"]["maxtemp_c"]);
      minTemps.push(forecast[i]["day"]["mintemp_c"]);
      avgHumiditys.push(forecast[i]["day"]["avghumidity"]);
      maxWinds.push(forecast[i]["day"]["maxwind_kph"]);
      uvs.push(forecast[i]["day"]["uv"]);
    }
    const forecastInfo = new Map([
      ["dates", dates],
      ["icons", icons],
      ["maxTemps", maxTemps],
      ["minTemps", minTemps],
      ["avgHumiditys", avgHumiditys],
      ["maxWinds", maxWinds],
      ["uvs", uvs]
    ]);

    const parsedWeatherInfo = new Map([
      ["currentInfo", currentInfo],
      ["forecastInfo", forecastInfo]
    ]);

    return parsedWeatherInfo;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/app.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQ2xIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0Esc0dBQXNHO1dBQ3RHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQSxFQUFFO1dBQ0Y7V0FDQTs7Ozs7V0NoRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcmFjdGljZS0zLy4vc3JjL3NjcmlwdHMvYXBpLmpzIiwid2VicGFjazovL3ByYWN0aWNlLTMvLi9zcmMvc2NyaXB0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy8uL3NyYy9zY3JpcHRzL2NpdHkuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy8uL3NyYy9zY3JpcHRzL2NvbnN0YW50LmpzIiwid2VicGFjazovL3ByYWN0aWNlLTMvLi9zcmMvc2NyaXB0cy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy8uL3NyYy9zY3JpcHRzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy8uL3NyYy9zY3JpcHRzL3VpLmpzIiwid2VicGFjazovL3ByYWN0aWNlLTMvLi9zcmMvc2NyaXB0cy93ZWF0aGVyLmpzIiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL3J1bnRpbWUvYXN5bmMgbW9kdWxlIiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaGVhZGVyID0ge1xuICBtZXRob2Q6IFwiR0VUXCIsXG4gIG1vZGU6IFwiY29yc1wiLFxuICBjYWNoZTogXCJuby1jYWNoZVwiLFxuICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICBoZWFkZXJzOiB7XG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG4gIHJlZGlyZWN0OiBcImZvbGxvd1wiLFxuICByZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlclwiLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZldGNoRGF0YTogYXN5bmMgZnVuY3Rpb24gKHVybCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgaGVhZGVyKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9LFxufTtcbiIsImltcG9ydCB7IFVJIH0gZnJvbSBcIi4vdWkuanNcIjtcbmltcG9ydCB7IENpdHkgfSBmcm9tIFwiLi9jaXR5LmpzXCI7XG5pbXBvcnQgeyBXZWF0aGVyIH0gZnJvbSBcIi4vd2VhdGhlci5qc1wiO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IGluaXRDaXR5TGlzdCB9IGZyb20gXCIuL2NvbnN0YW50LmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVMb2NhdGlvbk5hbWUsIGNyZWF0ZVRpdGxlLCBzaG93TG9hZGVyLCBoaWRlTG9hZGVyIH0gZnJvbSBcIi4vaGVscGVyLmpzXCI7XG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZShpbml0Q2l0eUxpc3QsIG5ldyBNYXAoKSwgbmV3IFNldCgpKTtcblxubGV0IGluaXRpYWxDaXR5ID0gdHJ1ZTtcblxuYXdhaXQgcHJlcGFyZUluaXRDaXRpZXMoKTtcbmF3YWl0IGluaXRpYWxpemVVSSgpO1xuXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplVUkoKSB7XG4gIGNvbnN0IHNlYXJjaEhpc3RvcnkgPSBzdG9yYWdlLmdldFNlYXJjaEhpc3RvcnkoKTtcbiAgY29uc3QgbGFzdENpdHkgPSBTdHJpbmcoc2VhcmNoSGlzdG9yeS5zbGljZSgtMSkpLnNwbGl0KFwiLFwiKVswXS5zcGxpdChcIiBcIik7XG4gIGlmIChsYXN0Q2l0eSkge1xuICAgIGF3YWl0IHVwZGF0ZUluZm8obGFzdENpdHkpO1xuICB9XG4gIGNvbnN0IHVpID0gbmV3IFVJKGF3YWl0IHVwZGF0ZUluZm8pO1xuICB1aS5pbml0aWFsaXplSW5wdXRUZXh0KCk7XG4gIHVpLmluaXRpYWxpemVTZWFyY2hQcmVzcygpO1xuICB1aS5pbml0aWFsaXplU2VhcmNoQnV0dG9uKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUluZm8oY2l0eUluZm8pIHtcbiAgY29uc3QgY2l0eU1hcCA9IHN0b3JhZ2UuZ2V0Q2l0eU1hcCgpO1xuICBjb25zdCBjaXR5TmFtZXMgPSBzdG9yYWdlLmdldENpdHlOYW1lcygpO1xuXG4gIGlmIChpbml0aWFsQ2l0eSA9PT0gdHJ1ZSkge1xuICAgIGNvbnN0IGNpdHlUaXRsZSA9IGNpdHlNYXAuZ2V0KGNpdHlJbmZvWzBdKVswXTtcbiAgICBjb25zdCBsYXRMb25nID0gY2l0eU1hcC5nZXQoY2l0eUluZm9bMF0pWzFdO1xuICAgIGluaXRpYWxDaXR5ID0gZmFsc2U7XG4gICAgYXdhaXQgc2hvd0luZm8oY2l0eVRpdGxlLCBsYXRMb25nKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoY2l0eU5hbWVzLmhhcyhjaXR5SW5mby5qb2luKCcgJykpKSB7XG4gICAgICBjb25zdCBjaXR5VGl0bGUgPSBjaXR5TWFwLmdldChjaXR5SW5mby5qb2luKCcgJykpWzBdO1xuICAgICAgY29uc3QgbGF0TG9uZyA9IGNpdHlNYXAuZ2V0KGNpdHlJbmZvLmpvaW4oJyAnKSlbMV07XG4gICAgICBhd2FpdCBzaG93SW5mbyhjaXR5VGl0bGUsIGxhdExvbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjaXR5ID0gYXdhaXQgY2hvb3NlQ2l0eShjaXR5SW5mbyk7XG4gICAgICBjb25zdCBsYXRMb25nID0gY3JlYXRlTG9jYXRpb25OYW1lKGNpdHkubGF0aXR1ZGUsIGNpdHkubG9uZ2l0dWRlKTtcbiAgICAgIGNvbnN0IGNpdHlUaXRsZSA9IGNyZWF0ZVRpdGxlKGNpdHkuY2l0eSwgY2l0eS5jb3VudHJ5KTtcbiAgICAgIHN0b3JhZ2Uuc2F2ZUNpdHlEYXRhKGNpdHkuY2l0eSwgY2l0eVRpdGxlLCBsYXRMb25nKTtcbiAgICAgIGF3YWl0IHNob3dJbmZvKGNpdHlUaXRsZSwgbGF0TG9uZyk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dJbmZvKGNpdHlUaXRsZSwgbGF0TG9uZykge1xuICBzaG93TG9hZGVyKCk7ICBcbiAgY29uc3QgdWkgPSBuZXcgVUkodXBkYXRlSW5mbyk7XG4gIGNvbnN0IGluaXRXZWF0aGVyID0gbmV3IFdlYXRoZXIoKTtcbiAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IGluaXRXZWF0aGVyLmdldEZvcmVjYXN0RGF0YShsYXRMb25nKTtcbiAgdWkuY2xlYXJXZWF0aGVySW5mbygpO1xuICB1aS5zaG93Q3VycmVudEluZm8oXG4gICAgY2l0eVRpdGxlLFxuICAgIHdlYXRoZXIuZGF0ZXRpbWVOb3csXG4gICAgd2VhdGhlci5pY29uTm93LFxuICAgIHdlYXRoZXIudGVtcE5vdyxcbiAgICB3ZWF0aGVyLmh1bWlkaXR5Tm93LFxuICAgIHdlYXRoZXIud2luZE5vdyxcbiAgICB3ZWF0aGVyLnV2Tm93LFxuICAgIHdlYXRoZXIuc3VuUmlzZU5vdyxcbiAgICB3ZWF0aGVyLnN1blNldE5vd1xuICApO1xuICB1aS5zaG93RnV0dXJlSW5mbyhcbiAgICB3ZWF0aGVyLmRhdGVzLFxuICAgIHdlYXRoZXIuaWNvbnMsXG4gICAgd2VhdGhlci5tYXhUZW1wcyxcbiAgICB3ZWF0aGVyLm1pblRlbXBzLFxuICAgIHdlYXRoZXIuYXZnSHVtaWRpdHlzLFxuICAgIHdlYXRoZXIubWF4V2luZHMsXG4gICAgd2VhdGhlci51dnNcbiAgKTtcbiAgdWkuaW5pdGlhbGl6ZUlucHV0VGV4dCgpO1xuICB1aS5jbGVhclNlYXJjaEJveCgpO1xuICBoaWRlTG9hZGVyKCk7ICBcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2hvb3NlQ2l0eShjaXR5SW5mbykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjaXR5SW5mby5mb3JFYWNoKChvbmVDaXR5KSA9PiB7XG4gICAgICBjb25zdCBpbml0Q2l0eSA9IG5ldyBDaXR5KCk7XG4gICAgICBjb25zdCBwZXJDaXR5ID0gaW5pdENpdHkucGFyc2VDaXR5SW5mbyhvbmVDaXR5KTtcbiAgICAgIGNvbnN0IHVpID0gbmV3IFVJKHVwZGF0ZUluZm8pO1xuICAgICAgdWkuc2hvd0Nob2ljZXMocGVyQ2l0eSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNob3NlbkNpdHkgPSByZXNwb25zZTtcbiAgICAgICAgcmVzb2x2ZShjaG9zZW5DaXR5KTtcbiAgICAgICAgdWkuY2xlYXJTZWFyY2hSZWNvbW1lbmRhdGlvbnMoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJlcGFyZUluaXRDaXRpZXMoKSB7XG4gIHNob3dMb2FkZXIoKTsgIFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRDaXR5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluaXRDaXR5ID0gbmV3IENpdHkoKTtcbiAgICBjb25zdCBjaXR5ID0gYXdhaXQgaW5pdENpdHkuc2VhcmNoQ2l0eU5hbWUoaW5pdENpdHlMaXN0W2ldKTtcbiAgICBjb25zdCBsYXRMb25nID0gY3JlYXRlTG9jYXRpb25OYW1lKGNpdHkubGF0aXR1ZGUsIGNpdHkubG9uZ2l0dWRlKTtcbiAgICBjb25zdCBjaXR5VGl0bGUgPSBjcmVhdGVUaXRsZShjaXR5LmNpdHksIGNpdHkuY291bnRyeSk7XG4gICAgc3RvcmFnZS5zYXZlQ2l0eURhdGEoY2l0eS5jaXR5LCBjaXR5VGl0bGUsIGxhdExvbmcpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tIFwiLi9hcGkuanNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZVNlYXJjaFVybCxcbiAgZmV0Y2hFcnJvckNhbGxiYWNrLFxuICBwYXJzZUVycm9yQ2FsbGJhY2ssXG59IGZyb20gXCIuL2hlbHBlci5qc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2l0eSB7XG4gIGNvbnN0cnVjdG9yKGNpdHksIGNvdW50cnksIGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuY291bnRyeSA9IGNvdW50cnk7XG4gICAgdGhpcy5sYXRpdHVkZSA9IGxhdGl0dWRlO1xuICAgIHRoaXMubG9uZ2l0dWRlID0gbG9uZ2l0dWRlO1xuICB9XG5cbiAgYXN5bmMgc2VhcmNoQ2l0eU5hbWUodXNlckNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsU2VhcmNoTG9jID0gY3JlYXRlU2VhcmNoVXJsKHVzZXJDaXR5KTtcbiAgICAgIGNvbnN0IHJhd0RhdGEgPSBhd2FpdCBmZXRjaERhdGEodXJsU2VhcmNoTG9jKTtcbiAgICAgIHJldHVybiBuZXcgQ2l0eShcbiAgICAgICAgcmF3RGF0YVswXVtcIm5hbWVcIl0sXG4gICAgICAgIHJhd0RhdGFbMF1bXCJjb3VudHJ5XCJdLFxuICAgICAgICByYXdEYXRhWzBdW1wibGF0XCJdLFxuICAgICAgICByYXdEYXRhWzBdW1wibG9uXCJdXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBmZXRjaEVycm9yQ2FsbGJhY2soKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZUNpdHlJbmZvKHJhd0RhdGEpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBDaXR5KFxuICAgICAgICByYXdEYXRhW1wibmFtZVwiXSxcbiAgICAgICAgcmF3RGF0YVtcImNvdW50cnlcIl0sXG4gICAgICAgIHJhd0RhdGFbXCJsYXRcIl0sXG4gICAgICAgIHJhd0RhdGFbXCJsb25cIl1cbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHBhcnNlRXJyb3JDYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHVybFNlYXJjaCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9zZWFyY2guanNvbj9rZXk9YXBpS2V5JnE9c3RhcnRzV2l0aGA7XG5leHBvcnQgY29uc3QgdXJsRm9yZWNhc3QgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YXBpS2V5JnE9dHlwZVlvdXJMb2NhdGlvbiZkYXlzPTdgO1xuZXhwb3J0IGNvbnN0IGluaXRDaXR5TGlzdCA9IFtcIlVsYWFuYmFhdGFyLCBNb25nb2xpYVwiXTtcbiIsImltcG9ydCB7IHVybFNlYXJjaCwgdXJsRm9yZWNhc3QgfSBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuY29uc3QgYXBpS2V5ID0gcHJvY2Vzcy5lbnYuQVBJX0tFWTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvQ2FtZWxDYXNlKGlucHV0U3RyaW5nKSB7XG4gIGNvbnN0IHdvcmRzID0gaW5wdXRTdHJpbmcuc3BsaXQoXCIgXCIpO1xuICBjb25zdCBjYW1lbENhc2VXb3JkcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgd29yZCA9IHdvcmRzW2ldO1xuICAgIGlmICh3b3JkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNhbWVsQ2FzZVdvcmQgPSB3b3JkWzBdLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYW1lbENhc2VXb3Jkcy5wdXNoKGNhbWVsQ2FzZVdvcmQpO1xuICAgIH1cbiAgfVxuICBjb25zdCBjYW1lbENhc2VTdHJpbmcgPSBjYW1lbENhc2VXb3Jkcy5qb2luKFwiXCIpO1xuICByZXR1cm4gY2FtZWxDYXNlU3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VhcmNoVXJsKGNpdHlOYW1lKSB7XG4gIHJldHVybiB1cmxTZWFyY2gucmVwbGFjZShcImFwaUtleVwiLCBhcGlLZXkpLnJlcGxhY2UoXCJzdGFydHNXaXRoXCIsIGNpdHlOYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvcmVjYXN0VXJsKGxhdExvbmcpIHtcbiAgcmV0dXJuIHVybEZvcmVjYXN0XG4gICAgLnJlcGxhY2UoXCJhcGlLZXlcIiwgYXBpS2V5KVxuICAgIC5yZXBsYWNlKFwidHlwZVlvdXJMb2NhdGlvblwiLCBsYXRMb25nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uTmFtZShsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XG4gIHJldHVybiBsYXRpdHVkZSArIFwiLFwiICsgbG9uZ2l0dWRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGl0bGUoY2l0eU5hbWUsIGNvdXRyeU5hbWUpIHtcbiAgcmV0dXJuIGNpdHlOYW1lICsgXCIsIFwiICsgY291dHJ5TmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoRXJyb3JDYWxsYmFjaygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiQSBwcm9ibGVtIG9jY3VyZWQgZHVyaW5nIEZldGNoIEFQSSFcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVycm9yQ2FsbGJhY2soKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIkNpdHkgcGFyc2Ugb3BlcmF0aW9uIGZhaWxlZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hFcnJvckNhbGxiYWNrKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBpcyBub3QgYW55IGNpdHkgd2l0aCBnaXZlbiBuYW1lLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dMb2FkZXIoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9hZENvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwibG9hZGVyLWNvbnRhaW5lclwiKTsgIFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvYWRcIikuY2xhc3NMaXN0LmFkZChcImxvYWRlclwiKTsgICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlTG9hZGVyKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvYWRDb250YWluZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRlci1jb250YWluZXJcIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9hZFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGVyXCIpO1xufVxuIiwiZXhwb3J0IGNsYXNzIFN0b3JhZ2Uge1xuICBjb25zdHJ1Y3RvcihzZWFyY2hIaXN0b3J5LCBjaXR5TWFwLCBjaXR5TmFtZXMpIHtcbiAgICB0aGlzLnNlYXJjaEhpc3RvcnkgPSBzZWFyY2hIaXN0b3J5O1xuICAgIHRoaXMuY2l0eU1hcCA9IGNpdHlNYXA7XG4gICAgdGhpcy5jaXR5TmFtZXMgPSBjaXR5TmFtZXM7XG5cbiAgICBpZiAodHlwZW9mIGxvY2FsU3RvcmFnZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29uc29sZS53YXJuKFwibG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgXCJTZWFyY2ggSGlzdG95IERhdGFcIixcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWFyY2hIaXN0b3J5KVxuICAgICAgKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICBcIkNpdHkgTmFtZSBNYXAgRGF0YVwiLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKHRoaXMuY2l0eU1hcC5lbnRyaWVzKCkpKVxuICAgICAgKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICBcIkNpdHkgTmFtZSBEYXRhXCIsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20odGhpcy5jaXR5TmFtZXMpKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgZ2V0U2VhcmNoSGlzdG9yeSgpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNlYXJjaCBIaXN0b3kgRGF0YVwiKSkgfHwgW107XG4gIH1cbiAgZ2V0Q2l0eU1hcCgpIHtcbiAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJDaXR5IE5hbWUgTWFwIERhdGFcIikpIHx8IFtdXG4gICAgKTtcbiAgfVxuICBnZXRDaXR5TmFtZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBTZXQoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkNpdHkgTmFtZSBEYXRhXCIpKSB8fCBbXSk7XG4gIH1cbiAgc2F2ZUNpdHlEYXRhKGNpdHlOYW1lLCBjaXR5VGl0bGUsIGNpdHlMYXRsb25nKSB7XG4gICAgaWYgKCF0aGlzLmNpdHlOYW1lcy5oYXMoY2l0eU5hbWUpICYmIGNpdHlOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2F2ZUNpdHlJZChjaXR5TmFtZSk7XG4gICAgICB0aGlzLnNhdmVTZWFyY2hIaXN0b3J5KGNpdHlUaXRsZSk7XG4gICAgICB0aGlzLnNhdmVDaXR5TWFwKGNpdHlOYW1lLCBjaXR5VGl0bGUsIGNpdHlMYXRsb25nKTtcbiAgICB9XG4gIH1cblxuICBzYXZlU2VhcmNoSGlzdG9yeShjaXR5VGl0bGUpIHtcbiAgICBjb25zdCBzZWFyY2hIaXN0b3J5ID1cbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTZWFyY2ggSGlzdG95IERhdGFcIikpIHx8IFtdO1xuICAgIHNlYXJjaEhpc3RvcnkucHVzaChjaXR5VGl0bGUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiU2VhcmNoIEhpc3RveSBEYXRhXCIsIEpTT04uc3RyaW5naWZ5KHNlYXJjaEhpc3RvcnkpKTtcbiAgfVxuXG4gIHNhdmVDaXR5SWQoY2l0eU5hbWUpIHtcbiAgICBjb25zdCBjaXR5TmFtZXMgPSBuZXcgU2V0KFxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkNpdHkgTmFtZSBEYXRhXCIpKSB8fCBbXVxuICAgICk7XG4gICAgY2l0eU5hbWVzLmFkZChjaXR5TmFtZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBcIkNpdHkgTmFtZSBEYXRhXCIsXG4gICAgICBKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKGNpdHlOYW1lcykpXG4gICAgKTtcbiAgfVxuXG4gIHNhdmVDaXR5TWFwKGNpdHlOYW1lLCBjaXR5VGl0bGUsIGNpdHlMYXRsb25nKSB7XG4gICAgY29uc3QgY2l0eU1hcCA9IG5ldyBNYXAoXG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiQ2l0eSBOYW1lIE1hcCBEYXRhXCIpKSB8fCBbXVxuICAgICk7XG4gICAgY2l0eU1hcC5zZXQoY2l0eU5hbWUsIFtjaXR5VGl0bGUsIGNpdHlMYXRsb25nXSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBcIkNpdHkgTmFtZSBNYXAgRGF0YVwiLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShjaXR5TWFwLmVudHJpZXMoKSkpXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlU2VhcmNoVXJsLCBzZWFyY2hFcnJvckNhbGxiYWNrLCB0b0NhbWVsQ2FzZSwgc2hvd0xvYWRlciwgaGlkZUxvYWRlciB9IGZyb20gXCIuL2hlbHBlci5qc1wiO1xuaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSBcIi4vYXBpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKGdldENpdHlJbmZvKSB7XG4gICAgdGhpcy5zZWFyY2hIaXN0b3J5ID0gbmV3IFNldChcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTZWFyY2ggSGlzdG95IERhdGFcIikpIHx8IFtdXG4gICAgKTtcbiAgICB0aGlzLmdldENpdHlJbmZvID0gZ2V0Q2l0eUluZm87XG4gIH1cblxuICBzaG93Q2l0eUhpc3RvcnkoKSB7XG4gICAgdGhpcy5zZWFyY2hIaXN0b3J5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IGNpdHlDaG9pY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICBjaXR5Q2hvaWNlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2l0eVNlbGVjdGlvblwiKTtcbiAgICAgIGNpdHlDaG9pY2Uub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudGNpdHkgPSBlbGVtZW50LnNwbGl0KFwiLFwiKVswXTtcbiAgICAgICAgYXdhaXQgdGhpcy5jaGVja0FuZEZldGNoRGF0YShlbGVtZW50Y2l0eSk7XG4gICAgICB9O1xuICAgICAgY2l0eUNob2ljZS5pbm5lckhUTUwgPSBlbGVtZW50O1xuICAgICAgY2l0eVJlY29tbWVuZC5hcHBlbmQoY2l0eUNob2ljZSk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXplSW5wdXRUZXh0KCkge1xuICAgIHNlYXJjaENpdHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJTZWFyY2hSZWNvbW1lbmRhdGlvbnMoKTtcbiAgICAgIHRoaXMuc2hvd0NpdHlIaXN0b3J5KCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXplU2VhcmNoUHJlc3MoKSB7XG4gICAgc2VhcmNoQ2l0eS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBjaXR5UmVjb21tZW5kTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eVJlY29tbWVuZFwiKTtcbiAgICAgICAgbGV0IGNpdHlSZWNvbW1lbmRFbGVtZW50cyA9IGNpdHlSZWNvbW1lbmRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKTtcblxuICAgICAgICBpZiAoY2l0eVJlY29tbWVuZEVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aGluZyB0byBzZWFyY2guIEVudGVyIG5ldyB0ZXh0IG9yIHdhaXQgdW50aWwgYXV0ZmlsbCByZWNvbW1lbmRzIGEgY2l0eS5cIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaXR5UmVjb21tZW5kRWxlbWVudHNbY2l0eVJlY29tbWVuZEVsZW1lbnRzLmxlbmd0aCAtIDFdLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQ2l0eVwiKS52YWx1ZTtcbiAgICAgICAgaWYgKHRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJDYW5ub3Qgc2VhcmNoIGVtcHR5IHRleHRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2codGV4dCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCdXR0b25cIikuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVNlYXJjaEJ1dHRvbigpIHtcbiAgICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJTZWFyY2hSZWNvbW1lbmRhdGlvbnMoKTtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0b0NhbWVsQ2FzZShzZWFyY2hDaXR5LnZhbHVlKTtcbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tBbmRGZXRjaERhdGEoZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjaGVja0FuZEZldGNoRGF0YShlbGVtZW50KSB7XG4gICAgY29uc3QgY2l0eWRhdGEgPSBuZXcgU2V0KFxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkNpdHkgTmFtZSBEYXRhXCIpKVxuICAgICk7XG4gICAgaWYgKGNpdHlkYXRhLmhhcyhlbGVtZW50KSkge1xuICAgICAgdGhpcy5jbGVhclNlYXJjaFJlY29tbWVuZGF0aW9ucygpO1xuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuc3BsaXQoXCIgXCIpO1xuICAgICAgfVxuICAgICAgdGhpcy5nZXRDaXR5SW5mbyhlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdXJsU2VhcmNoTG9jID0gY3JlYXRlU2VhcmNoVXJsKGVsZW1lbnQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaERhdGEodXJsU2VhcmNoTG9jKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIC8vIHNlYXJjaEVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsZWFzZSBlbnRlciBtb3JlIGxldHRlcnMuLi5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbGVhclNlYXJjaFJlY29tbWVuZGF0aW9ucygpO1xuICAgICAgICAgIHRoaXMuZ2V0Q2l0eUluZm8ocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBzaG93Q2hvaWNlcyhvbmVDaXR5LCBnZXRDaXR5TmFtZSkge1xuICAgIGxldCBjaXR5Q2hvaWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNpdHlDaG9pY2Uuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjaXR5U2VsZWN0aW9uXCIpO1xuICAgIGNpdHlDaG9pY2Uub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGdldENpdHlOYW1lKG9uZUNpdHkpO1xuICAgIH07XG4gICAgY2l0eUNob2ljZS5pbm5lckhUTUwgPSBgJHtvbmVDaXR5LmNpdHl9LCAke29uZUNpdHkuY291bnRyeX1gO1xuICAgIGNpdHlSZWNvbW1lbmQuYXBwZW5kKGNpdHlDaG9pY2UpO1xuICB9XG5cbiAgY2xlYXJTZWFyY2hSZWNvbW1lbmRhdGlvbnMoKSB7XG4gICAgY2l0eVJlY29tbWVuZC5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgY2xlYXJXZWF0aGVySW5mbygpIHtcbiAgICBkYWlseUZvcmVjYXN0LmlubmVySFRNTCA9IFwiXCI7XG4gIH1cblxuICBjbGVhclNlYXJjaEJveCgpIHtcbiAgICBzZWFyY2hDaXR5LnZhbHVlID0gXCJcIjtcbiAgfVxuXG4gIHNob3dDdXJyZW50SW5mbyhcbiAgICBjaXR5VGl0bGUsXG4gICAgZGF0ZXRpbWVOb3csXG4gICAgaWNvbk5vdyxcbiAgICB0ZW1wTm93LFxuICAgIGh1bWlkaXR5Tm93LFxuICAgIHdpbmROb3csXG4gICAgdXZOb3csXG4gICAgc3VuUmlzZU5vdyxcbiAgICBzdW5TZXROb3dcbiAgKSB7XG4gICAgY2l0eU5hbWVEYXRlLnRleHRDb250ZW50ID0gY2l0eVRpdGxlO1xuICAgIGRhdGV0aW1lLnRleHRDb250ZW50ID0gZGF0ZXRpbWVOb3c7XG4gICAgd2VhdGhlckljb24uc3JjID0gaWNvbk5vdztcbiAgICB0ZW1wLnRleHRDb250ZW50ID0gdGVtcE5vdztcbiAgICBodW1pLnRleHRDb250ZW50ID0gaHVtaWRpdHlOb3c7XG4gICAgd2luZC50ZXh0Q29udGVudCA9IHdpbmROb3c7XG4gICAgdXYudGV4dENvbnRlbnQgPSB1dk5vdztcbiAgICBzdW5SaXNlLnRleHRDb250ZW50ID0gc3VuUmlzZU5vdztcbiAgICBzdW5TZXQudGV4dENvbnRlbnQgPSBzdW5TZXROb3c7XG4gIH1cblxuICBzaG93RnV0dXJlSW5mbyhcbiAgICBkYXRlcyxcbiAgICBpY29ucyxcbiAgICBtYXhUZW1wcyxcbiAgICBtaW5UZW1wcyxcbiAgICBhdmdIdW1pZGl0eXMsXG4gICAgbWF4V2luZHMsXG4gICAgdXZzLFxuICApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgY29uc3QgZGF5Rm9yZWNhc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICBjb25zdCBkYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICBjb25zdCBtYXhUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IG1pblRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgYXZnSHVtaWRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgbWF4V2luZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCB1diA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGRheS5pbm5lckhUTUwgPSBkYXRlc1tpXTtcbiAgICAgIGljb24uc3JjID0gaWNvbnNbaV07XG4gICAgICBtYXhUZW1wLmlubmVySFRNTCA9IGA8cD5NYXg6PC9wPiA8cD4ke21heFRlbXBzW2ldfTxzcGFuPiYjODQ1MTs8L3NwYW4+PC9wPmA7XG4gICAgICBtaW5UZW1wLmlubmVySFRNTCA9IGA8cD5NaW46PC9wPiA8cD4ke21pblRlbXBzW2ldfTxzcGFuPiYjODQ1MTs8L3NwYW4+PC9wPmA7XG4gICAgICBhdmdIdW1pZGl0eS5pbm5lckhUTUwgPSBgPHA+SDo8L3A+IDxwPiR7YXZnSHVtaWRpdHlzW2ldfSU8L3A+YDtcbiAgICAgIG1heFdpbmQuaW5uZXJIVE1MID0gYDxwPlc6PC9wPiA8cD4ke21heFdpbmRzW2ldfWttL2g8L3A+YDtcbiAgICAgIHV2LmlubmVySFRNTCA9IGA8cD5VVjo8L3A+IDxwPiR7dXZzW2ldfTwvcD5gO1xuXG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQoZGF5KTtcbiAgICAgIGRheUZvcmVjYXN0LmFwcGVuZChpY29uKTtcbiAgICAgIGRheUZvcmVjYXN0LmFwcGVuZChtYXhUZW1wKTtcbiAgICAgIGRheUZvcmVjYXN0LmFwcGVuZChtaW5UZW1wKTtcbiAgICAgIGRheUZvcmVjYXN0LmFwcGVuZChhdmdIdW1pZGl0eSk7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQobWF4V2luZCk7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQodXYpO1xuXG4gICAgICBtYXhUZW1wLmNsYXNzTGlzdC5hZGQoXCJkYXktZm9yZWNhc3RcIilcbiAgICAgIG1pblRlbXAuY2xhc3NMaXN0LmFkZChcImRheS1mb3JlY2FzdFwiKVxuICAgICAgYXZnSHVtaWRpdHkuY2xhc3NMaXN0LmFkZChcImRheS1mb3JlY2FzdFwiKVxuICAgICAgbWF4V2luZC5jbGFzc0xpc3QuYWRkKFwiZGF5LWZvcmVjYXN0XCIpXG4gICAgICB1di5jbGFzc0xpc3QuYWRkKFwiZGF5LWZvcmVjYXN0XCIpXG4gICAgICBkYWlseUZvcmVjYXN0LmFwcGVuZChkYXlGb3JlY2FzdCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tIFwiLi9hcGkuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUZvcmVjYXN0VXJsLCBmZXRjaEVycm9yQ2FsbGJhY2sgfSBmcm9tIFwiLi9oZWxwZXIuanNcIjtcblxuZXhwb3J0IGNsYXNzIFdlYXRoZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRldGltZU5vdyxcbiAgICBpY29uTm93LCAgICBcbiAgICB0ZW1wTm93LFxuICAgIGh1bWlkaXR5Tm93LFxuICAgIHdpbmROb3csXG4gICAgdXZOb3csXG4gICAgc3VuUmlzZU5vdyxcbiAgICBzdW5TZXROb3csXG4gICAgZGF0ZXMsXG4gICAgaWNvbnMsXG4gICAgbWF4VGVtcHMsXG4gICAgbWluVGVtcHMsXG4gICAgYXZnSHVtaWRpdHlzLFxuICAgIG1heFdpbmRzLFxuICAgIHV2c1xuICApIHtcbiAgICB0aGlzLmRhdGV0aW1lTm93ID0gZGF0ZXRpbWVOb3c7XG4gICAgdGhpcy5pY29uTm93ID0gaWNvbk5vdztcbiAgICB0aGlzLnRlbXBOb3cgPSB0ZW1wTm93O1xuICAgIHRoaXMuaHVtaWRpdHlOb3cgPSBodW1pZGl0eU5vdztcbiAgICB0aGlzLndpbmROb3cgPSB3aW5kTm93O1xuICAgIHRoaXMudXZOb3cgPSB1dk5vdztcbiAgICB0aGlzLnN1blJpc2VOb3cgPSBzdW5SaXNlTm93O1xuICAgIHRoaXMuc3VuU2V0Tm93ID0gc3VuU2V0Tm93OyAgICBcbiAgICB0aGlzLmRhdGVzID0gZGF0ZXM7XG4gICAgdGhpcy5pY29ucyA9IGljb25zO1xuICAgIHRoaXMubWF4VGVtcHMgPSBtYXhUZW1wcztcbiAgICB0aGlzLm1pblRlbXBzID0gbWluVGVtcHM7XG4gICAgdGhpcy5hdmdIdW1pZGl0eXMgPSBhdmdIdW1pZGl0eXM7XG4gICAgdGhpcy5tYXhXaW5kcyA9IG1heFdpbmRzO1xuICAgIHRoaXMudXZzID0gdXZzO1xuICB9XG5cbiAgYXN5bmMgZ2V0Rm9yZWNhc3REYXRhKGxhdExvbmcpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsRm9yZUxvYyA9IGNyZWF0ZUZvcmVjYXN0VXJsKGxhdExvbmcpO1xuICAgICAgY29uc3QgcmF3RGF0YSA9IGF3YWl0IGZldGNoRGF0YSh1cmxGb3JlTG9jKTtcbiAgICAgIGNvbnN0IHJhd0RhdGFKc29uID0gSlNPTi5zdHJpbmdpZnkocmF3RGF0YSlcbiAgICAgIGNvbnN0IHdlYXRoZXJBcGlEYXRhID0gdGhpcy5wYXJzZVdlYXRoZXJEYXRhKHJhd0RhdGFKc29uKTtcbiAgICAgIHJldHVybiBuZXcgV2VhdGhlcihcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiY3VycmVudEluZm9cIikuZ2V0KFwiZGF0ZXRpbWVcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcImljb25cIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcInRlbXBcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcImh1bWlkaXR5XCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJjdXJyZW50SW5mb1wiKS5nZXQoXCJ3aW5kS3BoXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJjdXJyZW50SW5mb1wiKS5nZXQoXCJ1dlwiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiY3VycmVudEluZm9cIikuZ2V0KFwic3VuUmlzZVwiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiY3VycmVudEluZm9cIikuZ2V0KFwic3VuU2V0XCIpLCAgICAgICAgXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImZvcmVjYXN0SW5mb1wiKS5nZXQoXCJkYXRlc1wiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiZm9yZWNhc3RJbmZvXCIpLmdldChcImljb25zXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJmb3JlY2FzdEluZm9cIikuZ2V0KFwibWF4VGVtcHNcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImZvcmVjYXN0SW5mb1wiKS5nZXQoXCJtaW5UZW1wc1wiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiZm9yZWNhc3RJbmZvXCIpLmdldChcImF2Z0h1bWlkaXR5c1wiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiZm9yZWNhc3RJbmZvXCIpLmdldChcIm1heFdpbmRzXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJmb3JlY2FzdEluZm9cIikuZ2V0KFwidXZzXCIpXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBmZXRjaEVycm9yQ2FsbGJhY2soKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVdlYXRoZXJEYXRhKHJhd1dlYXRoZXJEYXRhKSB7XG4gICAgY29uc3QgY3VycmVudCA9IEpTT04ucGFyc2UocmF3V2VhdGhlckRhdGEpW1wiY3VycmVudFwiXTtcbiAgICBjb25zdCBmb3JlY2FzdCA9IEpTT04ucGFyc2UocmF3V2VhdGhlckRhdGEpW1wiZm9yZWNhc3RcIl1bXCJmb3JlY2FzdGRheVwiXTtcbiAgICBjb25zdCBjdXJyZW50SW5mbyA9IG5ldyBNYXAoW1xuICAgICAgW1wiZGF0ZXRpbWVcIiwgY3VycmVudFtcImxhc3RfdXBkYXRlZFwiXV0sXG4gICAgICBbXCJpY29uXCIsIGN1cnJlbnRbXCJjb25kaXRpb25cIl1bXCJpY29uXCJdXSxcbiAgICAgIFtcInRlbXBcIiwgY3VycmVudFtcInRlbXBfY1wiXV0sXG4gICAgICBbXCJodW1pZGl0eVwiLCBjdXJyZW50W1wiaHVtaWRpdHlcIl1dLFxuICAgICAgW1wid2luZEtwaFwiLCBjdXJyZW50W1wid2luZF9rcGhcIl1dLFxuICAgICAgW1widXZcIiwgY3VycmVudFtcInV2XCJdXSxcbiAgICAgIFtcInN1blJpc2VcIiwgZm9yZWNhc3RbMF1bXCJhc3Ryb1wiXVtcInN1bnJpc2VcIl1dLFxuICAgICAgW1wic3VuU2V0XCIsIGZvcmVjYXN0WzBdW1wiYXN0cm9cIl1bXCJzdW5zZXRcIl1dLCAgICAgIFxuICAgIF0pO1xuXG4gICAgY29uc3QgZGF0ZXMgPSBbXTtcbiAgICBjb25zdCBpY29ucyA9IFtdO1xuICAgIGNvbnN0IG1heFRlbXBzID0gW107XG4gICAgY29uc3QgbWluVGVtcHMgPSBbXTtcbiAgICBjb25zdCBhdmdIdW1pZGl0eXMgPSBbXTtcbiAgICBjb25zdCBtYXhXaW5kcyA9IFtdO1xuICAgIGNvbnN0IHV2cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgIGRhdGVzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXRlXCJdKTtcbiAgICAgIGljb25zLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJjb25kaXRpb25cIl1bXCJpY29uXCJdKTtcbiAgICAgIG1heFRlbXBzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJtYXh0ZW1wX2NcIl0pO1xuICAgICAgbWluVGVtcHMucHVzaChmb3JlY2FzdFtpXVtcImRheVwiXVtcIm1pbnRlbXBfY1wiXSk7XG4gICAgICBhdmdIdW1pZGl0eXMucHVzaChmb3JlY2FzdFtpXVtcImRheVwiXVtcImF2Z2h1bWlkaXR5XCJdKTtcbiAgICAgIG1heFdpbmRzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJtYXh3aW5kX2twaFwiXSk7XG4gICAgICB1dnMucHVzaChmb3JlY2FzdFtpXVtcImRheVwiXVtcInV2XCJdKTtcbiAgICB9XG4gICAgY29uc3QgZm9yZWNhc3RJbmZvID0gbmV3IE1hcChbXG4gICAgICBbXCJkYXRlc1wiLCBkYXRlc10sXG4gICAgICBbXCJpY29uc1wiLCBpY29uc10sXG4gICAgICBbXCJtYXhUZW1wc1wiLCBtYXhUZW1wc10sXG4gICAgICBbXCJtaW5UZW1wc1wiLCBtaW5UZW1wc10sXG4gICAgICBbXCJhdmdIdW1pZGl0eXNcIiwgYXZnSHVtaWRpdHlzXSxcbiAgICAgIFtcIm1heFdpbmRzXCIsIG1heFdpbmRzXSxcbiAgICAgIFtcInV2c1wiLCB1dnNdXG4gICAgXSk7XG5cbiAgICBjb25zdCBwYXJzZWRXZWF0aGVySW5mbyA9IG5ldyBNYXAoW1xuICAgICAgW1wiY3VycmVudEluZm9cIiwgY3VycmVudEluZm9dLFxuICAgICAgW1wiZm9yZWNhc3RJbmZvXCIsIGZvcmVjYXN0SW5mb11cbiAgICBdKTtcblxuICAgIHJldHVybiBwYXJzZWRXZWF0aGVySW5mbztcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciB3ZWJwYWNrUXVldWVzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBxdWV1ZXNcIikgOiBcIl9fd2VicGFja19xdWV1ZXNfX1wiO1xudmFyIHdlYnBhY2tFeHBvcnRzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBleHBvcnRzXCIpIDogXCJfX3dlYnBhY2tfZXhwb3J0c19fXCI7XG52YXIgd2VicGFja0Vycm9yID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBlcnJvclwiKSA6IFwiX193ZWJwYWNrX2Vycm9yX19cIjtcbnZhciByZXNvbHZlUXVldWUgPSAocXVldWUpID0+IHtcblx0aWYocXVldWUgJiYgcXVldWUuZCA8IDEpIHtcblx0XHRxdWV1ZS5kID0gMTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSkpO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tID8gZm4ucisrIDogZm4oKSkpO1xuXHR9XG59XG52YXIgd3JhcERlcHMgPSAoZGVwcykgPT4gKGRlcHMubWFwKChkZXApID0+IHtcblx0aWYoZGVwICE9PSBudWxsICYmIHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpIHtcblx0XHRpZihkZXBbd2VicGFja1F1ZXVlc10pIHJldHVybiBkZXA7XG5cdFx0aWYoZGVwLnRoZW4pIHtcblx0XHRcdHZhciBxdWV1ZSA9IFtdO1xuXHRcdFx0cXVldWUuZCA9IDA7XG5cdFx0XHRkZXAudGhlbigocikgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0V4cG9ydHNdID0gcjtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0sIChlKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXJyb3JdID0gZTtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0b2JqW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAoZm4ocXVldWUpKTtcblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fVxuXHR9XG5cdHZhciByZXQgPSB7fTtcblx0cmV0W3dlYnBhY2tRdWV1ZXNdID0geCA9PiB7fTtcblx0cmV0W3dlYnBhY2tFeHBvcnRzXSA9IGRlcDtcblx0cmV0dXJuIHJldDtcbn0pKTtcbl9fd2VicGFja19yZXF1aXJlX18uYSA9IChtb2R1bGUsIGJvZHksIGhhc0F3YWl0KSA9PiB7XG5cdHZhciBxdWV1ZTtcblx0aGFzQXdhaXQgJiYgKChxdWV1ZSA9IFtdKS5kID0gLTEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgcXVldWUuZCA8IDAgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYXBwLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
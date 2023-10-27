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

    if (typeof localStorage !== "undefined") {
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

        if (cityRecommendElements.length !== 0) {
          cityRecommendElements[cityRecommendElements.length - 1].click();
        } 
        
      } else {
        let text = document.getElementById("searchCity").value;
        if (text.length !== 0) {
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
        if (response.length !== 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQSxzR0FBc0c7V0FDdEc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ2hFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ByYWN0aWNlLTMvLi9zcmMvc2NyaXB0cy9hcGkuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy8uL3NyYy9zY3JpcHRzL2FwcC5qcyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zLy4vc3JjL3NjcmlwdHMvY2l0eS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zLy4vc3JjL3NjcmlwdHMvY29uc3RhbnQuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy8uL3NyYy9zY3JpcHRzL2hlbHBlci5qcyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zLy4vc3JjL3NjcmlwdHMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zLy4vc3JjL3NjcmlwdHMvdWkuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy8uL3NyYy9zY3JpcHRzL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBoZWFkZXIgPSB7XG4gIG1ldGhvZDogXCJHRVRcIixcbiAgbW9kZTogXCJjb3JzXCIsXG4gIGNhY2hlOiBcIm5vLWNhY2hlXCIsXG4gIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbiAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsXG4gIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyXCIsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZmV0Y2hEYXRhOiBhc3luYyBmdW5jdGlvbiAodXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBoZWFkZXIpO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgVUkgfSBmcm9tIFwiLi91aS5qc1wiO1xuaW1wb3J0IHsgQ2l0eSB9IGZyb20gXCIuL2NpdHkuanNcIjtcbmltcG9ydCB7IFdlYXRoZXIgfSBmcm9tIFwiLi93ZWF0aGVyLmpzXCI7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZS5qc1wiO1xuaW1wb3J0IHsgaW5pdENpdHlMaXN0IH0gZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUxvY2F0aW9uTmFtZSwgY3JlYXRlVGl0bGUsIHNob3dMb2FkZXIsIGhpZGVMb2FkZXIgfSBmcm9tIFwiLi9oZWxwZXIuanNcIjtcblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKGluaXRDaXR5TGlzdCwgbmV3IE1hcCgpLCBuZXcgU2V0KCkpO1xuXG5sZXQgaW5pdGlhbENpdHkgPSB0cnVlO1xuXG5hd2FpdCBwcmVwYXJlSW5pdENpdGllcygpO1xuYXdhaXQgaW5pdGlhbGl6ZVVJKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVVSSgpIHtcbiAgY29uc3Qgc2VhcmNoSGlzdG9yeSA9IHN0b3JhZ2UuZ2V0U2VhcmNoSGlzdG9yeSgpO1xuICBjb25zdCBsYXN0Q2l0eSA9IFN0cmluZyhzZWFyY2hIaXN0b3J5LnNsaWNlKC0xKSkuc3BsaXQoXCIsXCIpWzBdLnNwbGl0KFwiIFwiKTtcbiAgaWYgKGxhc3RDaXR5KSB7XG4gICAgYXdhaXQgdXBkYXRlSW5mbyhsYXN0Q2l0eSk7XG4gIH1cbiAgY29uc3QgdWkgPSBuZXcgVUkoYXdhaXQgdXBkYXRlSW5mbyk7XG4gIHVpLmluaXRpYWxpemVJbnB1dFRleHQoKTtcbiAgdWkuaW5pdGlhbGl6ZVNlYXJjaFByZXNzKCk7XG4gIHVpLmluaXRpYWxpemVTZWFyY2hCdXR0b24oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlSW5mbyhjaXR5SW5mbykge1xuICBjb25zdCBjaXR5TWFwID0gc3RvcmFnZS5nZXRDaXR5TWFwKCk7XG4gIGNvbnN0IGNpdHlOYW1lcyA9IHN0b3JhZ2UuZ2V0Q2l0eU5hbWVzKCk7XG5cbiAgaWYgKGluaXRpYWxDaXR5ID09PSB0cnVlKSB7XG4gICAgY29uc3QgY2l0eVRpdGxlID0gY2l0eU1hcC5nZXQoY2l0eUluZm9bMF0pWzBdO1xuICAgIGNvbnN0IGxhdExvbmcgPSBjaXR5TWFwLmdldChjaXR5SW5mb1swXSlbMV07XG4gICAgaW5pdGlhbENpdHkgPSBmYWxzZTtcbiAgICBhd2FpdCBzaG93SW5mbyhjaXR5VGl0bGUsIGxhdExvbmcpO1xuICB9IGVsc2Uge1xuICAgIGlmIChjaXR5TmFtZXMuaGFzKGNpdHlJbmZvLmpvaW4oJyAnKSkpIHtcbiAgICAgIGNvbnN0IGNpdHlUaXRsZSA9IGNpdHlNYXAuZ2V0KGNpdHlJbmZvLmpvaW4oJyAnKSlbMF07XG4gICAgICBjb25zdCBsYXRMb25nID0gY2l0eU1hcC5nZXQoY2l0eUluZm8uam9pbignICcpKVsxXTtcbiAgICAgIGF3YWl0IHNob3dJbmZvKGNpdHlUaXRsZSwgbGF0TG9uZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNpdHkgPSBhd2FpdCBjaG9vc2VDaXR5KGNpdHlJbmZvKTtcbiAgICAgIGNvbnN0IGxhdExvbmcgPSBjcmVhdGVMb2NhdGlvbk5hbWUoY2l0eS5sYXRpdHVkZSwgY2l0eS5sb25naXR1ZGUpO1xuICAgICAgY29uc3QgY2l0eVRpdGxlID0gY3JlYXRlVGl0bGUoY2l0eS5jaXR5LCBjaXR5LmNvdW50cnkpO1xuICAgICAgc3RvcmFnZS5zYXZlQ2l0eURhdGEoY2l0eS5jaXR5LCBjaXR5VGl0bGUsIGxhdExvbmcpO1xuICAgICAgYXdhaXQgc2hvd0luZm8oY2l0eVRpdGxlLCBsYXRMb25nKTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0luZm8oY2l0eVRpdGxlLCBsYXRMb25nKSB7XG4gIHNob3dMb2FkZXIoKTsgIFxuICBjb25zdCB1aSA9IG5ldyBVSSh1cGRhdGVJbmZvKTtcbiAgY29uc3QgaW5pdFdlYXRoZXIgPSBuZXcgV2VhdGhlcigpO1xuICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgaW5pdFdlYXRoZXIuZ2V0Rm9yZWNhc3REYXRhKGxhdExvbmcpO1xuICB1aS5jbGVhcldlYXRoZXJJbmZvKCk7XG4gIHVpLnNob3dDdXJyZW50SW5mbyhcbiAgICBjaXR5VGl0bGUsXG4gICAgd2VhdGhlci5kYXRldGltZU5vdyxcbiAgICB3ZWF0aGVyLmljb25Ob3csXG4gICAgd2VhdGhlci50ZW1wTm93LFxuICAgIHdlYXRoZXIuaHVtaWRpdHlOb3csXG4gICAgd2VhdGhlci53aW5kTm93LFxuICAgIHdlYXRoZXIudXZOb3csXG4gICAgd2VhdGhlci5zdW5SaXNlTm93LFxuICAgIHdlYXRoZXIuc3VuU2V0Tm93XG4gICk7XG4gIHVpLnNob3dGdXR1cmVJbmZvKFxuICAgIHdlYXRoZXIuZGF0ZXMsXG4gICAgd2VhdGhlci5pY29ucyxcbiAgICB3ZWF0aGVyLm1heFRlbXBzLFxuICAgIHdlYXRoZXIubWluVGVtcHMsXG4gICAgd2VhdGhlci5hdmdIdW1pZGl0eXMsXG4gICAgd2VhdGhlci5tYXhXaW5kcyxcbiAgICB3ZWF0aGVyLnV2c1xuICApO1xuICB1aS5pbml0aWFsaXplSW5wdXRUZXh0KCk7XG4gIHVpLmNsZWFyU2VhcmNoQm94KCk7XG4gIGhpZGVMb2FkZXIoKTsgIFxufVxuXG5hc3luYyBmdW5jdGlvbiBjaG9vc2VDaXR5KGNpdHlJbmZvKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNpdHlJbmZvLmZvckVhY2goKG9uZUNpdHkpID0+IHtcbiAgICAgIGNvbnN0IGluaXRDaXR5ID0gbmV3IENpdHkoKTtcbiAgICAgIGNvbnN0IHBlckNpdHkgPSBpbml0Q2l0eS5wYXJzZUNpdHlJbmZvKG9uZUNpdHkpO1xuICAgICAgY29uc3QgdWkgPSBuZXcgVUkodXBkYXRlSW5mbyk7XG4gICAgICB1aS5zaG93Q2hvaWNlcyhwZXJDaXR5LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgY2hvc2VuQ2l0eSA9IHJlc3BvbnNlO1xuICAgICAgICByZXNvbHZlKGNob3NlbkNpdHkpO1xuICAgICAgICB1aS5jbGVhclNlYXJjaFJlY29tbWVuZGF0aW9ucygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcmVwYXJlSW5pdENpdGllcygpIHtcbiAgc2hvd0xvYWRlcigpOyAgXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdENpdHlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaW5pdENpdHkgPSBuZXcgQ2l0eSgpO1xuICAgIGNvbnN0IGNpdHkgPSBhd2FpdCBpbml0Q2l0eS5zZWFyY2hDaXR5TmFtZShpbml0Q2l0eUxpc3RbaV0pO1xuICAgIGNvbnN0IGxhdExvbmcgPSBjcmVhdGVMb2NhdGlvbk5hbWUoY2l0eS5sYXRpdHVkZSwgY2l0eS5sb25naXR1ZGUpO1xuICAgIGNvbnN0IGNpdHlUaXRsZSA9IGNyZWF0ZVRpdGxlKGNpdHkuY2l0eSwgY2l0eS5jb3VudHJ5KTtcbiAgICBzdG9yYWdlLnNhdmVDaXR5RGF0YShjaXR5LmNpdHksIGNpdHlUaXRsZSwgbGF0TG9uZyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gXCIuL2FwaS5qc1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlU2VhcmNoVXJsLFxuICBmZXRjaEVycm9yQ2FsbGJhY2ssXG4gIHBhcnNlRXJyb3JDYWxsYmFjayxcbn0gZnJvbSBcIi4vaGVscGVyLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBDaXR5IHtcbiAgY29uc3RydWN0b3IoY2l0eSwgY291bnRyeSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5jb3VudHJ5ID0gY291bnRyeTtcbiAgICB0aGlzLmxhdGl0dWRlID0gbGF0aXR1ZGU7XG4gICAgdGhpcy5sb25naXR1ZGUgPSBsb25naXR1ZGU7XG4gIH1cblxuICBhc3luYyBzZWFyY2hDaXR5TmFtZSh1c2VyQ2l0eSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmxTZWFyY2hMb2MgPSBjcmVhdGVTZWFyY2hVcmwodXNlckNpdHkpO1xuICAgICAgY29uc3QgcmF3RGF0YSA9IGF3YWl0IGZldGNoRGF0YSh1cmxTZWFyY2hMb2MpO1xuICAgICAgcmV0dXJuIG5ldyBDaXR5KFxuICAgICAgICByYXdEYXRhWzBdW1wibmFtZVwiXSxcbiAgICAgICAgcmF3RGF0YVswXVtcImNvdW50cnlcIl0sXG4gICAgICAgIHJhd0RhdGFbMF1bXCJsYXRcIl0sXG4gICAgICAgIHJhd0RhdGFbMF1bXCJsb25cIl1cbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGZldGNoRXJyb3JDYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlQ2l0eUluZm8ocmF3RGF0YSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IENpdHkoXG4gICAgICAgIHJhd0RhdGFbXCJuYW1lXCJdLFxuICAgICAgICByYXdEYXRhW1wiY291bnRyeVwiXSxcbiAgICAgICAgcmF3RGF0YVtcImxhdFwiXSxcbiAgICAgICAgcmF3RGF0YVtcImxvblwiXVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcGFyc2VFcnJvckNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgdXJsU2VhcmNoID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL3NlYXJjaC5qc29uP2tleT1hcGlLZXkmcT1zdGFydHNXaXRoYDtcbmV4cG9ydCBjb25zdCB1cmxGb3JlY2FzdCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hcGlLZXkmcT10eXBlWW91ckxvY2F0aW9uJmRheXM9N2A7XG5leHBvcnQgY29uc3QgaW5pdENpdHlMaXN0ID0gW1wiVWxhYW5iYWF0YXIsIE1vbmdvbGlhXCJdO1xuIiwiaW1wb3J0IHsgdXJsU2VhcmNoLCB1cmxGb3JlY2FzdCB9IGZyb20gXCIuL2NvbnN0YW50LmpzXCI7XG5jb25zdCBhcGlLZXkgPSBwcm9jZXNzLmVudi5BUElfS0VZO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9DYW1lbENhc2UoaW5wdXRTdHJpbmcpIHtcbiAgY29uc3Qgd29yZHMgPSBpbnB1dFN0cmluZy5zcGxpdChcIiBcIik7XG4gIGNvbnN0IGNhbWVsQ2FzZVdvcmRzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB3b3JkID0gd29yZHNbaV07XG4gICAgaWYgKHdvcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2FtZWxDYXNlV29yZCA9IHdvcmRbMF0udG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhbWVsQ2FzZVdvcmRzLnB1c2goY2FtZWxDYXNlV29yZCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IGNhbWVsQ2FzZVN0cmluZyA9IGNhbWVsQ2FzZVdvcmRzLmpvaW4oXCJcIik7XG4gIHJldHVybiBjYW1lbENhc2VTdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWFyY2hVcmwoY2l0eU5hbWUpIHtcbiAgcmV0dXJuIHVybFNlYXJjaC5yZXBsYWNlKFwiYXBpS2V5XCIsIGFwaUtleSkucmVwbGFjZShcInN0YXJ0c1dpdGhcIiwgY2l0eU5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3RVcmwobGF0TG9uZykge1xuICByZXR1cm4gdXJsRm9yZWNhc3RcbiAgICAucmVwbGFjZShcImFwaUtleVwiLCBhcGlLZXkpXG4gICAgLnJlcGxhY2UoXCJ0eXBlWW91ckxvY2F0aW9uXCIsIGxhdExvbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb25OYW1lKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgcmV0dXJuIGxhdGl0dWRlICsgXCIsXCIgKyBsb25naXR1ZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUaXRsZShjaXR5TmFtZSwgY291dHJ5TmFtZSkge1xuICByZXR1cm4gY2l0eU5hbWUgKyBcIiwgXCIgKyBjb3V0cnlOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hFcnJvckNhbGxiYWNrKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJBIHByb2JsZW0gb2NjdXJlZCBkdXJpbmcgRmV0Y2ggQVBJIVwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRXJyb3JDYWxsYmFjaygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiQ2l0eSBwYXJzZSBvcGVyYXRpb24gZmFpbGVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaEVycm9yQ2FsbGJhY2soKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vdCBhbnkgY2l0eSB3aXRoIGdpdmVuIG5hbWUuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRlcigpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJsb2FkZXItY29udGFpbmVyXCIpOyAgXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9hZFwiKS5jbGFzc0xpc3QuYWRkKFwibG9hZGVyXCIpOyAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkZXIoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9hZENvbnRhaW5lclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGVyLWNvbnRhaW5lclwiKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkZXJcIik7XG59XG4iLCJleHBvcnQgY2xhc3MgU3RvcmFnZSB7XG4gIGNvbnN0cnVjdG9yKHNlYXJjaEhpc3RvcnksIGNpdHlNYXAsIGNpdHlOYW1lcykge1xuICAgIHRoaXMuc2VhcmNoSGlzdG9yeSA9IHNlYXJjaEhpc3Rvcnk7XG4gICAgdGhpcy5jaXR5TWFwID0gY2l0eU1hcDtcbiAgICB0aGlzLmNpdHlOYW1lcyA9IGNpdHlOYW1lcztcblxuICAgIGlmICh0eXBlb2YgbG9jYWxTdG9yYWdlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgXCJTZWFyY2ggSGlzdG95IERhdGFcIixcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWFyY2hIaXN0b3J5KVxuICAgICAgKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICBcIkNpdHkgTmFtZSBNYXAgRGF0YVwiLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKHRoaXMuY2l0eU1hcC5lbnRyaWVzKCkpKVxuICAgICAgKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICBcIkNpdHkgTmFtZSBEYXRhXCIsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20odGhpcy5jaXR5TmFtZXMpKVxuICAgICAgKTtcbiAgICB9IFxuICB9XG4gIGdldFNlYXJjaEhpc3RvcnkoKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTZWFyY2ggSGlzdG95IERhdGFcIikpIHx8IFtdO1xuICB9XG4gIGdldENpdHlNYXAoKSB7XG4gICAgcmV0dXJuIG5ldyBNYXAoXG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiQ2l0eSBOYW1lIE1hcCBEYXRhXCIpKSB8fCBbXVxuICAgICk7XG4gIH1cbiAgZ2V0Q2l0eU5hbWVzKCkge1xuICAgIHJldHVybiBuZXcgU2V0KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJDaXR5IE5hbWUgRGF0YVwiKSkgfHwgW10pO1xuICB9XG4gIHNhdmVDaXR5RGF0YShjaXR5TmFtZSwgY2l0eVRpdGxlLCBjaXR5TGF0bG9uZykge1xuICAgIGlmICghdGhpcy5jaXR5TmFtZXMuaGFzKGNpdHlOYW1lKSAmJiBjaXR5TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNhdmVDaXR5SWQoY2l0eU5hbWUpO1xuICAgICAgdGhpcy5zYXZlU2VhcmNoSGlzdG9yeShjaXR5VGl0bGUpO1xuICAgICAgdGhpcy5zYXZlQ2l0eU1hcChjaXR5TmFtZSwgY2l0eVRpdGxlLCBjaXR5TGF0bG9uZyk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZVNlYXJjaEhpc3RvcnkoY2l0eVRpdGxlKSB7XG4gICAgY29uc3Qgc2VhcmNoSGlzdG9yeSA9XG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2VhcmNoIEhpc3RveSBEYXRhXCIpKSB8fCBbXTtcbiAgICBzZWFyY2hIaXN0b3J5LnB1c2goY2l0eVRpdGxlKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlNlYXJjaCBIaXN0b3kgRGF0YVwiLCBKU09OLnN0cmluZ2lmeShzZWFyY2hIaXN0b3J5KSk7XG4gIH1cblxuICBzYXZlQ2l0eUlkKGNpdHlOYW1lKSB7XG4gICAgY29uc3QgY2l0eU5hbWVzID0gbmV3IFNldChcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJDaXR5IE5hbWUgRGF0YVwiKSkgfHwgW11cbiAgICApO1xuICAgIGNpdHlOYW1lcy5hZGQoY2l0eU5hbWUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgXCJDaXR5IE5hbWUgRGF0YVwiLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShjaXR5TmFtZXMpKVxuICAgICk7XG4gIH1cblxuICBzYXZlQ2l0eU1hcChjaXR5TmFtZSwgY2l0eVRpdGxlLCBjaXR5TGF0bG9uZykge1xuICAgIGNvbnN0IGNpdHlNYXAgPSBuZXcgTWFwKFxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkNpdHkgTmFtZSBNYXAgRGF0YVwiKSkgfHwgW11cbiAgICApO1xuICAgIGNpdHlNYXAuc2V0KGNpdHlOYW1lLCBbY2l0eVRpdGxlLCBjaXR5TGF0bG9uZ10pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgXCJDaXR5IE5hbWUgTWFwIERhdGFcIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20oY2l0eU1hcC5lbnRyaWVzKCkpKVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZVNlYXJjaFVybCwgc2VhcmNoRXJyb3JDYWxsYmFjaywgdG9DYW1lbENhc2UsIHNob3dMb2FkZXIsIGhpZGVMb2FkZXIgfSBmcm9tIFwiLi9oZWxwZXIuanNcIjtcbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gXCIuL2FwaS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcihnZXRDaXR5SW5mbykge1xuICAgIHRoaXMuc2VhcmNoSGlzdG9yeSA9IG5ldyBTZXQoXG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2VhcmNoIEhpc3RveSBEYXRhXCIpKSB8fCBbXVxuICAgICk7XG4gICAgdGhpcy5nZXRDaXR5SW5mbyA9IGdldENpdHlJbmZvO1xuICB9XG5cbiAgc2hvd0NpdHlIaXN0b3J5KCkge1xuICAgIHRoaXMuc2VhcmNoSGlzdG9yeS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBjaXR5Q2hvaWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgY2l0eUNob2ljZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNpdHlTZWxlY3Rpb25cIik7XG4gICAgICBjaXR5Q2hvaWNlLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRjaXR5ID0gZWxlbWVudC5zcGxpdChcIixcIilbMF07XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tBbmRGZXRjaERhdGEoZWxlbWVudGNpdHkpO1xuICAgICAgfTtcbiAgICAgIGNpdHlDaG9pY2UuaW5uZXJIVE1MID0gZWxlbWVudDtcbiAgICAgIGNpdHlSZWNvbW1lbmQuYXBwZW5kKGNpdHlDaG9pY2UpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUlucHV0VGV4dCgpIHtcbiAgICBzZWFyY2hDaXR5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsZWFyU2VhcmNoUmVjb21tZW5kYXRpb25zKCk7XG4gICAgICB0aGlzLnNob3dDaXR5SGlzdG9yeSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVNlYXJjaFByZXNzKCkge1xuICAgIHNlYXJjaENpdHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgY2l0eVJlY29tbWVuZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHlSZWNvbW1lbmRcIik7XG4gICAgICAgIGxldCBjaXR5UmVjb21tZW5kRWxlbWVudHMgPSBjaXR5UmVjb21tZW5kTGlzdC5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XG5cbiAgICAgICAgaWYgKGNpdHlSZWNvbW1lbmRFbGVtZW50cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBjaXR5UmVjb21tZW5kRWxlbWVudHNbY2l0eVJlY29tbWVuZEVsZW1lbnRzLmxlbmd0aCAtIDFdLmNsaWNrKCk7XG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaENpdHlcIikudmFsdWU7XG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQnV0dG9uXCIpLmNsaWNrKCk7XG4gICAgICAgIH0gXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXplU2VhcmNoQnV0dG9uKCkge1xuICAgIHNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgdGhpcy5jbGVhclNlYXJjaFJlY29tbWVuZGF0aW9ucygpO1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRvQ2FtZWxDYXNlKHNlYXJjaENpdHkudmFsdWUpO1xuICAgICAgYXdhaXQgdGhpcy5jaGVja0FuZEZldGNoRGF0YShlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrQW5kRmV0Y2hEYXRhKGVsZW1lbnQpIHtcbiAgICBjb25zdCBjaXR5ZGF0YSA9IG5ldyBTZXQoXG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiQ2l0eSBOYW1lIERhdGFcIikpXG4gICAgKTtcbiAgICBpZiAoY2l0eWRhdGEuaGFzKGVsZW1lbnQpKSB7XG4gICAgICB0aGlzLmNsZWFyU2VhcmNoUmVjb21tZW5kYXRpb25zKCk7XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5zcGxpdChcIiBcIik7XG4gICAgICB9XG4gICAgICB0aGlzLmdldENpdHlJbmZvKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cmxTZWFyY2hMb2MgPSBjcmVhdGVTZWFyY2hVcmwoZWxlbWVudCk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRGF0YSh1cmxTZWFyY2hMb2MpO1xuICAgICAgICBpZiAocmVzcG9uc2UubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5jbGVhclNlYXJjaFJlY29tbWVuZGF0aW9ucygpO1xuICAgICAgICAgIHRoaXMuZ2V0Q2l0eUluZm8ocmVzcG9uc2UpO1xuICAgICAgICB9IFxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2hvd0Nob2ljZXMob25lQ2l0eSwgZ2V0Q2l0eU5hbWUpIHtcbiAgICBsZXQgY2l0eUNob2ljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBjaXR5Q2hvaWNlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2l0eVNlbGVjdGlvblwiKTtcbiAgICBjaXR5Q2hvaWNlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBnZXRDaXR5TmFtZShvbmVDaXR5KTtcbiAgICB9O1xuICAgIGNpdHlDaG9pY2UuaW5uZXJIVE1MID0gYCR7b25lQ2l0eS5jaXR5fSwgJHtvbmVDaXR5LmNvdW50cnl9YDtcbiAgICBjaXR5UmVjb21tZW5kLmFwcGVuZChjaXR5Q2hvaWNlKTtcbiAgfVxuXG4gIGNsZWFyU2VhcmNoUmVjb21tZW5kYXRpb25zKCkge1xuICAgIGNpdHlSZWNvbW1lbmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIGNsZWFyV2VhdGhlckluZm8oKSB7XG4gICAgZGFpbHlGb3JlY2FzdC5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgY2xlYXJTZWFyY2hCb3goKSB7XG4gICAgc2VhcmNoQ2l0eS52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBzaG93Q3VycmVudEluZm8oXG4gICAgY2l0eVRpdGxlLFxuICAgIGRhdGV0aW1lTm93LFxuICAgIGljb25Ob3csXG4gICAgdGVtcE5vdyxcbiAgICBodW1pZGl0eU5vdyxcbiAgICB3aW5kTm93LFxuICAgIHV2Tm93LFxuICAgIHN1blJpc2VOb3csXG4gICAgc3VuU2V0Tm93XG4gICkge1xuICAgIGNpdHlOYW1lRGF0ZS50ZXh0Q29udGVudCA9IGNpdHlUaXRsZTtcbiAgICBkYXRldGltZS50ZXh0Q29udGVudCA9IGRhdGV0aW1lTm93O1xuICAgIHdlYXRoZXJJY29uLnNyYyA9IGljb25Ob3c7XG4gICAgdGVtcC50ZXh0Q29udGVudCA9IHRlbXBOb3c7XG4gICAgaHVtaS50ZXh0Q29udGVudCA9IGh1bWlkaXR5Tm93O1xuICAgIHdpbmQudGV4dENvbnRlbnQgPSB3aW5kTm93O1xuICAgIHV2LnRleHRDb250ZW50ID0gdXZOb3c7XG4gICAgc3VuUmlzZS50ZXh0Q29udGVudCA9IHN1blJpc2VOb3c7XG4gICAgc3VuU2V0LnRleHRDb250ZW50ID0gc3VuU2V0Tm93O1xuICB9XG5cbiAgc2hvd0Z1dHVyZUluZm8oXG4gICAgZGF0ZXMsXG4gICAgaWNvbnMsXG4gICAgbWF4VGVtcHMsXG4gICAgbWluVGVtcHMsXG4gICAgYXZnSHVtaWRpdHlzLFxuICAgIG1heFdpbmRzLFxuICAgIHV2cyxcbiAgKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgIGNvbnN0IGRheUZvcmVjYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgY29uc3QgZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgY29uc3QgbWF4VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCBtaW5UZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGF2Z0h1bWlkaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IG1heFdpbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgdXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBkYXkuaW5uZXJIVE1MID0gZGF0ZXNbaV07XG4gICAgICBpY29uLnNyYyA9IGljb25zW2ldO1xuICAgICAgbWF4VGVtcC5pbm5lckhUTUwgPSBgPHA+TWF4OjwvcD4gPHA+JHttYXhUZW1wc1tpXX08c3Bhbj4mIzg0NTE7PC9zcGFuPjwvcD5gO1xuICAgICAgbWluVGVtcC5pbm5lckhUTUwgPSBgPHA+TWluOjwvcD4gPHA+JHttaW5UZW1wc1tpXX08c3Bhbj4mIzg0NTE7PC9zcGFuPjwvcD5gO1xuICAgICAgYXZnSHVtaWRpdHkuaW5uZXJIVE1MID0gYDxwPkg6PC9wPiA8cD4ke2F2Z0h1bWlkaXR5c1tpXX0lPC9wPmA7XG4gICAgICBtYXhXaW5kLmlubmVySFRNTCA9IGA8cD5XOjwvcD4gPHA+JHttYXhXaW5kc1tpXX1rbS9oPC9wPmA7XG4gICAgICB1di5pbm5lckhUTUwgPSBgPHA+VVY6PC9wPiA8cD4ke3V2c1tpXX08L3A+YDtcblxuICAgICAgZGF5Rm9yZWNhc3QuYXBwZW5kKGRheSk7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQoaWNvbik7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQobWF4VGVtcCk7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQobWluVGVtcCk7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQoYXZnSHVtaWRpdHkpO1xuICAgICAgZGF5Rm9yZWNhc3QuYXBwZW5kKG1heFdpbmQpO1xuICAgICAgZGF5Rm9yZWNhc3QuYXBwZW5kKHV2KTtcblxuICAgICAgbWF4VGVtcC5jbGFzc0xpc3QuYWRkKFwiZGF5LWZvcmVjYXN0XCIpXG4gICAgICBtaW5UZW1wLmNsYXNzTGlzdC5hZGQoXCJkYXktZm9yZWNhc3RcIilcbiAgICAgIGF2Z0h1bWlkaXR5LmNsYXNzTGlzdC5hZGQoXCJkYXktZm9yZWNhc3RcIilcbiAgICAgIG1heFdpbmQuY2xhc3NMaXN0LmFkZChcImRheS1mb3JlY2FzdFwiKVxuICAgICAgdXYuY2xhc3NMaXN0LmFkZChcImRheS1mb3JlY2FzdFwiKVxuICAgICAgZGFpbHlGb3JlY2FzdC5hcHBlbmQoZGF5Rm9yZWNhc3QpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSBcIi4vYXBpLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVGb3JlY2FzdFVybCwgZmV0Y2hFcnJvckNhbGxiYWNrIH0gZnJvbSBcIi4vaGVscGVyLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWF0aGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgZGF0ZXRpbWVOb3csXG4gICAgaWNvbk5vdywgICAgXG4gICAgdGVtcE5vdyxcbiAgICBodW1pZGl0eU5vdyxcbiAgICB3aW5kTm93LFxuICAgIHV2Tm93LFxuICAgIHN1blJpc2VOb3csXG4gICAgc3VuU2V0Tm93LFxuICAgIGRhdGVzLFxuICAgIGljb25zLFxuICAgIG1heFRlbXBzLFxuICAgIG1pblRlbXBzLFxuICAgIGF2Z0h1bWlkaXR5cyxcbiAgICBtYXhXaW5kcyxcbiAgICB1dnNcbiAgKSB7XG4gICAgdGhpcy5kYXRldGltZU5vdyA9IGRhdGV0aW1lTm93O1xuICAgIHRoaXMuaWNvbk5vdyA9IGljb25Ob3c7XG4gICAgdGhpcy50ZW1wTm93ID0gdGVtcE5vdztcbiAgICB0aGlzLmh1bWlkaXR5Tm93ID0gaHVtaWRpdHlOb3c7XG4gICAgdGhpcy53aW5kTm93ID0gd2luZE5vdztcbiAgICB0aGlzLnV2Tm93ID0gdXZOb3c7XG4gICAgdGhpcy5zdW5SaXNlTm93ID0gc3VuUmlzZU5vdztcbiAgICB0aGlzLnN1blNldE5vdyA9IHN1blNldE5vdzsgICAgXG4gICAgdGhpcy5kYXRlcyA9IGRhdGVzO1xuICAgIHRoaXMuaWNvbnMgPSBpY29ucztcbiAgICB0aGlzLm1heFRlbXBzID0gbWF4VGVtcHM7XG4gICAgdGhpcy5taW5UZW1wcyA9IG1pblRlbXBzO1xuICAgIHRoaXMuYXZnSHVtaWRpdHlzID0gYXZnSHVtaWRpdHlzO1xuICAgIHRoaXMubWF4V2luZHMgPSBtYXhXaW5kcztcbiAgICB0aGlzLnV2cyA9IHV2cztcbiAgfVxuXG4gIGFzeW5jIGdldEZvcmVjYXN0RGF0YShsYXRMb25nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybEZvcmVMb2MgPSBjcmVhdGVGb3JlY2FzdFVybChsYXRMb25nKTtcbiAgICAgIGNvbnN0IHJhd0RhdGEgPSBhd2FpdCBmZXRjaERhdGEodXJsRm9yZUxvYyk7XG4gICAgICBjb25zdCByYXdEYXRhSnNvbiA9IEpTT04uc3RyaW5naWZ5KHJhd0RhdGEpXG4gICAgICBjb25zdCB3ZWF0aGVyQXBpRGF0YSA9IHRoaXMucGFyc2VXZWF0aGVyRGF0YShyYXdEYXRhSnNvbik7XG4gICAgICByZXR1cm4gbmV3IFdlYXRoZXIoXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcImRhdGV0aW1lXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJjdXJyZW50SW5mb1wiKS5nZXQoXCJpY29uXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJjdXJyZW50SW5mb1wiKS5nZXQoXCJ0ZW1wXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJjdXJyZW50SW5mb1wiKS5nZXQoXCJodW1pZGl0eVwiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiY3VycmVudEluZm9cIikuZ2V0KFwid2luZEtwaFwiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiY3VycmVudEluZm9cIikuZ2V0KFwidXZcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcInN1blJpc2VcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcInN1blNldFwiKSwgICAgICAgIFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJmb3JlY2FzdEluZm9cIikuZ2V0KFwiZGF0ZXNcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImZvcmVjYXN0SW5mb1wiKS5nZXQoXCJpY29uc1wiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiZm9yZWNhc3RJbmZvXCIpLmdldChcIm1heFRlbXBzXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJmb3JlY2FzdEluZm9cIikuZ2V0KFwibWluVGVtcHNcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImZvcmVjYXN0SW5mb1wiKS5nZXQoXCJhdmdIdW1pZGl0eXNcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImZvcmVjYXN0SW5mb1wiKS5nZXQoXCJtYXhXaW5kc1wiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiZm9yZWNhc3RJbmZvXCIpLmdldChcInV2c1wiKVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZmV0Y2hFcnJvckNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VXZWF0aGVyRGF0YShyYXdXZWF0aGVyRGF0YSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBKU09OLnBhcnNlKHJhd1dlYXRoZXJEYXRhKVtcImN1cnJlbnRcIl07XG4gICAgY29uc3QgZm9yZWNhc3QgPSBKU09OLnBhcnNlKHJhd1dlYXRoZXJEYXRhKVtcImZvcmVjYXN0XCJdW1wiZm9yZWNhc3RkYXlcIl07XG4gICAgY29uc3QgY3VycmVudEluZm8gPSBuZXcgTWFwKFtcbiAgICAgIFtcImRhdGV0aW1lXCIsIGN1cnJlbnRbXCJsYXN0X3VwZGF0ZWRcIl1dLFxuICAgICAgW1wiaWNvblwiLCBjdXJyZW50W1wiY29uZGl0aW9uXCJdW1wiaWNvblwiXV0sXG4gICAgICBbXCJ0ZW1wXCIsIGN1cnJlbnRbXCJ0ZW1wX2NcIl1dLFxuICAgICAgW1wiaHVtaWRpdHlcIiwgY3VycmVudFtcImh1bWlkaXR5XCJdXSxcbiAgICAgIFtcIndpbmRLcGhcIiwgY3VycmVudFtcIndpbmRfa3BoXCJdXSxcbiAgICAgIFtcInV2XCIsIGN1cnJlbnRbXCJ1dlwiXV0sXG4gICAgICBbXCJzdW5SaXNlXCIsIGZvcmVjYXN0WzBdW1wiYXN0cm9cIl1bXCJzdW5yaXNlXCJdXSxcbiAgICAgIFtcInN1blNldFwiLCBmb3JlY2FzdFswXVtcImFzdHJvXCJdW1wic3Vuc2V0XCJdXSwgICAgICBcbiAgICBdKTtcblxuICAgIGNvbnN0IGRhdGVzID0gW107XG4gICAgY29uc3QgaWNvbnMgPSBbXTtcbiAgICBjb25zdCBtYXhUZW1wcyA9IFtdO1xuICAgIGNvbnN0IG1pblRlbXBzID0gW107XG4gICAgY29uc3QgYXZnSHVtaWRpdHlzID0gW107XG4gICAgY29uc3QgbWF4V2luZHMgPSBbXTtcbiAgICBjb25zdCB1dnMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICBkYXRlcy5wdXNoKGZvcmVjYXN0W2ldW1wiZGF0ZVwiXSk7XG4gICAgICBpY29ucy5wdXNoKGZvcmVjYXN0W2ldW1wiZGF5XCJdW1wiY29uZGl0aW9uXCJdW1wiaWNvblwiXSk7XG4gICAgICBtYXhUZW1wcy5wdXNoKGZvcmVjYXN0W2ldW1wiZGF5XCJdW1wibWF4dGVtcF9jXCJdKTtcbiAgICAgIG1pblRlbXBzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJtaW50ZW1wX2NcIl0pO1xuICAgICAgYXZnSHVtaWRpdHlzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJhdmdodW1pZGl0eVwiXSk7XG4gICAgICBtYXhXaW5kcy5wdXNoKGZvcmVjYXN0W2ldW1wiZGF5XCJdW1wibWF4d2luZF9rcGhcIl0pO1xuICAgICAgdXZzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJ1dlwiXSk7XG4gICAgfVxuICAgIGNvbnN0IGZvcmVjYXN0SW5mbyA9IG5ldyBNYXAoW1xuICAgICAgW1wiZGF0ZXNcIiwgZGF0ZXNdLFxuICAgICAgW1wiaWNvbnNcIiwgaWNvbnNdLFxuICAgICAgW1wibWF4VGVtcHNcIiwgbWF4VGVtcHNdLFxuICAgICAgW1wibWluVGVtcHNcIiwgbWluVGVtcHNdLFxuICAgICAgW1wiYXZnSHVtaWRpdHlzXCIsIGF2Z0h1bWlkaXR5c10sXG4gICAgICBbXCJtYXhXaW5kc1wiLCBtYXhXaW5kc10sXG4gICAgICBbXCJ1dnNcIiwgdXZzXVxuICAgIF0pO1xuXG4gICAgY29uc3QgcGFyc2VkV2VhdGhlckluZm8gPSBuZXcgTWFwKFtcbiAgICAgIFtcImN1cnJlbnRJbmZvXCIsIGN1cnJlbnRJbmZvXSxcbiAgICAgIFtcImZvcmVjYXN0SW5mb1wiLCBmb3JlY2FzdEluZm9dXG4gICAgXSk7XG5cbiAgICByZXR1cm4gcGFyc2VkV2VhdGhlckluZm87XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmIHF1ZXVlLmQgPCAxKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIHF1ZXVlLmQgPCAwICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2FwcC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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
  document.querySelector(".loader").style.display = "none";
  document.querySelector(".loader-container").style.display = "none";
}

async function updateInfo(cityInfo) {
  const cityMap = storage.getCityMap();
  const cityNames = storage.getCityNames();

  if (cityInfo.length !== 1) {
    const city = await chooseCity(cityInfo);
    const latLong = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.createLocationName)(city.latitude, city.longitude);
    const cityTitle = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.createTitle)(city.city, city.country);
    storage.saveCityData(city.city, cityTitle, latLong);
    await showInfo(cityTitle, latLong);
  } else {
    if (cityNames.has(cityInfo[0])) {
      const cityTitle = cityMap.get(cityInfo[0])[0];
      const latLong = cityMap.get(cityInfo[0])[1];
      await showInfo(cityTitle, latLong);
    } else {
      const initCity = new _city_js__WEBPACK_IMPORTED_MODULE_1__.City();
      const city = initCity.parseCityInfo(cityInfo[0]);
      const latLong = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.createLocationName)(city.latitude, city.longitude);
      const cityTitle = (0,_helper_js__WEBPACK_IMPORTED_MODULE_5__.createTitle)(city.city, city.country);
      storage.saveCityData(city.city, cityTitle, latLong);
      await showInfo(cityTitle, latLong);
    }
  }
}

async function showInfo(cityTitle, latLong) {
  document.querySelector(".loader").style.display = "block";
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
  document.querySelector(".loader").style.display = "none";
  document.querySelector(".loader-container").style.display = "none";
  ui.initializeInputText();
  ui.clearSearchBox();
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
  document.querySelector(".loader").style.display = "block";
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
/* harmony export */   parseErrorCallback: () => (/* binding */ parseErrorCallback),
/* harmony export */   searchErrorCallback: () => (/* binding */ searchErrorCallback),
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
    searchCity.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
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
          (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.searchErrorCallback)();
        }
        this.clearSearchRecommendations();
        this.getCityInfo(response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBLHNHQUFzRztXQUN0RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDaEVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy8uL3NyYy9zY3JpcHRzL2FwaS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zLy4vc3JjL3NjcmlwdHMvYXBwLmpzIiwid2VicGFjazovL3ByYWN0aWNlLTMvLi9zcmMvc2NyaXB0cy9jaXR5LmpzIiwid2VicGFjazovL3ByYWN0aWNlLTMvLi9zcmMvc2NyaXB0cy9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zLy4vc3JjL3NjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovL3ByYWN0aWNlLTMvLi9zcmMvc2NyaXB0cy9zdG9yYWdlLmpzIiwid2VicGFjazovL3ByYWN0aWNlLTMvLi9zcmMvc2NyaXB0cy91aS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zLy4vc3JjL3NjcmlwdHMvd2VhdGhlci5qcyIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9ydW50aW1lL2FzeW5jIG1vZHVsZSIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcmFjdGljZS0zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJhY3RpY2UtMy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ByYWN0aWNlLTMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhlYWRlciA9IHtcbiAgbWV0aG9kOiBcIkdFVFwiLFxuICBtb2RlOiBcImNvcnNcIixcbiAgY2FjaGU6IFwibm8tY2FjaGVcIixcbiAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgaGVhZGVyczoge1xuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxuICByZWRpcmVjdDogXCJmb2xsb3dcIixcbiAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBmZXRjaERhdGE6IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGhlYWRlcik7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBVSSB9IGZyb20gXCIuL3VpLmpzXCI7XG5pbXBvcnQgeyBDaXR5IH0gZnJvbSBcIi4vY2l0eS5qc1wiO1xuaW1wb3J0IHsgV2VhdGhlciB9IGZyb20gXCIuL3dlYXRoZXIuanNcIjtcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyBpbml0Q2l0eUxpc3QgfSBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlTG9jYXRpb25OYW1lLCBjcmVhdGVUaXRsZSB9IGZyb20gXCIuL2hlbHBlci5qc1wiO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoaW5pdENpdHlMaXN0LCBuZXcgTWFwKCksIG5ldyBTZXQoKSk7XG5cbmF3YWl0IHByZXBhcmVJbml0Q2l0aWVzKCk7XG5hd2FpdCBpbml0aWFsaXplVUkoKTtcblxuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZVVJKCkge1xuICBjb25zdCBzZWFyY2hIaXN0b3J5ID0gc3RvcmFnZS5nZXRTZWFyY2hIaXN0b3J5KCk7XG4gIGNvbnN0IGxhc3RDaXR5ID0gU3RyaW5nKHNlYXJjaEhpc3Rvcnkuc2xpY2UoLTEpKS5zcGxpdChcIixcIilbMF0uc3BsaXQoXCIgXCIpO1xuICBpZiAobGFzdENpdHkpIHtcbiAgICBhd2FpdCB1cGRhdGVJbmZvKGxhc3RDaXR5KTtcbiAgfVxuICBjb25zdCB1aSA9IG5ldyBVSShhd2FpdCB1cGRhdGVJbmZvKTtcbiAgdWkuaW5pdGlhbGl6ZUlucHV0VGV4dCgpO1xuICB1aS5pbml0aWFsaXplU2VhcmNoUHJlc3MoKTtcbiAgdWkuaW5pdGlhbGl6ZVNlYXJjaEJ1dHRvbigpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvYWRlclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGVyLWNvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUluZm8oY2l0eUluZm8pIHtcbiAgY29uc3QgY2l0eU1hcCA9IHN0b3JhZ2UuZ2V0Q2l0eU1hcCgpO1xuICBjb25zdCBjaXR5TmFtZXMgPSBzdG9yYWdlLmdldENpdHlOYW1lcygpO1xuXG4gIGlmIChjaXR5SW5mby5sZW5ndGggIT09IDEpIHtcbiAgICBjb25zdCBjaXR5ID0gYXdhaXQgY2hvb3NlQ2l0eShjaXR5SW5mbyk7XG4gICAgY29uc3QgbGF0TG9uZyA9IGNyZWF0ZUxvY2F0aW9uTmFtZShjaXR5LmxhdGl0dWRlLCBjaXR5LmxvbmdpdHVkZSk7XG4gICAgY29uc3QgY2l0eVRpdGxlID0gY3JlYXRlVGl0bGUoY2l0eS5jaXR5LCBjaXR5LmNvdW50cnkpO1xuICAgIHN0b3JhZ2Uuc2F2ZUNpdHlEYXRhKGNpdHkuY2l0eSwgY2l0eVRpdGxlLCBsYXRMb25nKTtcbiAgICBhd2FpdCBzaG93SW5mbyhjaXR5VGl0bGUsIGxhdExvbmcpO1xuICB9IGVsc2Uge1xuICAgIGlmIChjaXR5TmFtZXMuaGFzKGNpdHlJbmZvWzBdKSkge1xuICAgICAgY29uc3QgY2l0eVRpdGxlID0gY2l0eU1hcC5nZXQoY2l0eUluZm9bMF0pWzBdO1xuICAgICAgY29uc3QgbGF0TG9uZyA9IGNpdHlNYXAuZ2V0KGNpdHlJbmZvWzBdKVsxXTtcbiAgICAgIGF3YWl0IHNob3dJbmZvKGNpdHlUaXRsZSwgbGF0TG9uZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluaXRDaXR5ID0gbmV3IENpdHkoKTtcbiAgICAgIGNvbnN0IGNpdHkgPSBpbml0Q2l0eS5wYXJzZUNpdHlJbmZvKGNpdHlJbmZvWzBdKTtcbiAgICAgIGNvbnN0IGxhdExvbmcgPSBjcmVhdGVMb2NhdGlvbk5hbWUoY2l0eS5sYXRpdHVkZSwgY2l0eS5sb25naXR1ZGUpO1xuICAgICAgY29uc3QgY2l0eVRpdGxlID0gY3JlYXRlVGl0bGUoY2l0eS5jaXR5LCBjaXR5LmNvdW50cnkpO1xuICAgICAgc3RvcmFnZS5zYXZlQ2l0eURhdGEoY2l0eS5jaXR5LCBjaXR5VGl0bGUsIGxhdExvbmcpO1xuICAgICAgYXdhaXQgc2hvd0luZm8oY2l0eVRpdGxlLCBsYXRMb25nKTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0luZm8oY2l0eVRpdGxlLCBsYXRMb25nKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIGNvbnN0IHVpID0gbmV3IFVJKHVwZGF0ZUluZm8pO1xuICBjb25zdCBpbml0V2VhdGhlciA9IG5ldyBXZWF0aGVyKCk7XG4gIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBpbml0V2VhdGhlci5nZXRGb3JlY2FzdERhdGEobGF0TG9uZyk7XG4gIHVpLmNsZWFyV2VhdGhlckluZm8oKTtcbiAgdWkuc2hvd0N1cnJlbnRJbmZvKFxuICAgIGNpdHlUaXRsZSxcbiAgICB3ZWF0aGVyLmRhdGV0aW1lTm93LFxuICAgIHdlYXRoZXIuaWNvbk5vdyxcbiAgICB3ZWF0aGVyLnRlbXBOb3csXG4gICAgd2VhdGhlci5odW1pZGl0eU5vdyxcbiAgICB3ZWF0aGVyLndpbmROb3csXG4gICAgd2VhdGhlci51dk5vdyxcbiAgICB3ZWF0aGVyLnN1blJpc2VOb3csXG4gICAgd2VhdGhlci5zdW5TZXROb3dcbiAgKTtcbiAgdWkuc2hvd0Z1dHVyZUluZm8oXG4gICAgd2VhdGhlci5kYXRlcyxcbiAgICB3ZWF0aGVyLmljb25zLFxuICAgIHdlYXRoZXIubWF4VGVtcHMsXG4gICAgd2VhdGhlci5taW5UZW1wcyxcbiAgICB3ZWF0aGVyLmF2Z0h1bWlkaXR5cyxcbiAgICB3ZWF0aGVyLm1heFdpbmRzLFxuICAgIHdlYXRoZXIudXZzXG4gICk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2FkZXItY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgdWkuaW5pdGlhbGl6ZUlucHV0VGV4dCgpO1xuICB1aS5jbGVhclNlYXJjaEJveCgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaG9vc2VDaXR5KGNpdHlJbmZvKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNpdHlJbmZvLmZvckVhY2goKG9uZUNpdHkpID0+IHtcbiAgICAgIGNvbnN0IGluaXRDaXR5ID0gbmV3IENpdHkoKTtcbiAgICAgIGNvbnN0IHBlckNpdHkgPSBpbml0Q2l0eS5wYXJzZUNpdHlJbmZvKG9uZUNpdHkpO1xuICAgICAgY29uc3QgdWkgPSBuZXcgVUkodXBkYXRlSW5mbyk7XG4gICAgICB1aS5zaG93Q2hvaWNlcyhwZXJDaXR5LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgY2hvc2VuQ2l0eSA9IHJlc3BvbnNlO1xuICAgICAgICByZXNvbHZlKGNob3NlbkNpdHkpO1xuICAgICAgICB1aS5jbGVhclNlYXJjaFJlY29tbWVuZGF0aW9ucygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcmVwYXJlSW5pdENpdGllcygpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2FkZXJcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0Q2l0eUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpbml0Q2l0eSA9IG5ldyBDaXR5KCk7XG4gICAgY29uc3QgY2l0eSA9IGF3YWl0IGluaXRDaXR5LnNlYXJjaENpdHlOYW1lKGluaXRDaXR5TGlzdFtpXSk7XG4gICAgY29uc3QgbGF0TG9uZyA9IGNyZWF0ZUxvY2F0aW9uTmFtZShjaXR5LmxhdGl0dWRlLCBjaXR5LmxvbmdpdHVkZSk7XG4gICAgY29uc3QgY2l0eVRpdGxlID0gY3JlYXRlVGl0bGUoY2l0eS5jaXR5LCBjaXR5LmNvdW50cnkpO1xuICAgIHN0b3JhZ2Uuc2F2ZUNpdHlEYXRhKGNpdHkuY2l0eSwgY2l0eVRpdGxlLCBsYXRMb25nKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSBcIi4vYXBpLmpzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVTZWFyY2hVcmwsXG4gIGZldGNoRXJyb3JDYWxsYmFjayxcbiAgcGFyc2VFcnJvckNhbGxiYWNrLFxufSBmcm9tIFwiLi9oZWxwZXIuanNcIjtcblxuZXhwb3J0IGNsYXNzIENpdHkge1xuICBjb25zdHJ1Y3RvcihjaXR5LCBjb3VudHJ5LCBsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcbiAgICB0aGlzLmNvdW50cnkgPSBjb3VudHJ5O1xuICAgIHRoaXMubGF0aXR1ZGUgPSBsYXRpdHVkZTtcbiAgICB0aGlzLmxvbmdpdHVkZSA9IGxvbmdpdHVkZTtcbiAgfVxuXG4gIGFzeW5jIHNlYXJjaENpdHlOYW1lKHVzZXJDaXR5KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybFNlYXJjaExvYyA9IGNyZWF0ZVNlYXJjaFVybCh1c2VyQ2l0eSk7XG4gICAgICBjb25zdCByYXdEYXRhID0gYXdhaXQgZmV0Y2hEYXRhKHVybFNlYXJjaExvYyk7XG4gICAgICByZXR1cm4gbmV3IENpdHkoXG4gICAgICAgIHJhd0RhdGFbMF1bXCJuYW1lXCJdLFxuICAgICAgICByYXdEYXRhWzBdW1wiY291bnRyeVwiXSxcbiAgICAgICAgcmF3RGF0YVswXVtcImxhdFwiXSxcbiAgICAgICAgcmF3RGF0YVswXVtcImxvblwiXVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZmV0Y2hFcnJvckNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VDaXR5SW5mbyhyYXdEYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgQ2l0eShcbiAgICAgICAgcmF3RGF0YVtcIm5hbWVcIl0sXG4gICAgICAgIHJhd0RhdGFbXCJjb3VudHJ5XCJdLFxuICAgICAgICByYXdEYXRhW1wibGF0XCJdLFxuICAgICAgICByYXdEYXRhW1wibG9uXCJdXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBwYXJzZUVycm9yQ2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB1cmxTZWFyY2ggPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvc2VhcmNoLmpzb24/a2V5PWFwaUtleSZxPXN0YXJ0c1dpdGhgO1xuZXhwb3J0IGNvbnN0IHVybEZvcmVjYXN0ID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWFwaUtleSZxPXR5cGVZb3VyTG9jYXRpb24mZGF5cz03YDtcbmV4cG9ydCBjb25zdCBpbml0Q2l0eUxpc3QgPSBbXCJVbGFhbmJhYXRhciwgTW9uZ29saWFcIl07XG4iLCJpbXBvcnQgeyB1cmxTZWFyY2gsIHVybEZvcmVjYXN0IH0gZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcbmNvbnN0IGFwaUtleSA9IHByb2Nlc3MuZW52LkFQSV9LRVk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0NhbWVsQ2FzZShpbnB1dFN0cmluZykge1xuICBjb25zdCB3b3JkcyA9IGlucHV0U3RyaW5nLnNwbGl0KFwiIFwiKTtcbiAgY29uc3QgY2FtZWxDYXNlV29yZHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHdvcmQgPSB3b3Jkc1tpXTtcbiAgICBpZiAod29yZC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjYW1lbENhc2VXb3JkID0gd29yZFswXS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FtZWxDYXNlV29yZHMucHVzaChjYW1lbENhc2VXb3JkKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgY2FtZWxDYXNlU3RyaW5nID0gY2FtZWxDYXNlV29yZHMuam9pbihcIlwiKTtcbiAgcmV0dXJuIGNhbWVsQ2FzZVN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlYXJjaFVybChjaXR5TmFtZSkge1xuICByZXR1cm4gdXJsU2VhcmNoLnJlcGxhY2UoXCJhcGlLZXlcIiwgYXBpS2V5KS5yZXBsYWNlKFwic3RhcnRzV2l0aFwiLCBjaXR5TmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JlY2FzdFVybChsYXRMb25nKSB7XG4gIHJldHVybiB1cmxGb3JlY2FzdFxuICAgIC5yZXBsYWNlKFwiYXBpS2V5XCIsIGFwaUtleSlcbiAgICAucmVwbGFjZShcInR5cGVZb3VyTG9jYXRpb25cIiwgbGF0TG9uZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2NhdGlvbk5hbWUobGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xuICByZXR1cm4gbGF0aXR1ZGUgKyBcIixcIiArIGxvbmdpdHVkZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRpdGxlKGNpdHlOYW1lLCBjb3V0cnlOYW1lKSB7XG4gIHJldHVybiBjaXR5TmFtZSArIFwiLCBcIiArIGNvdXRyeU5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaEVycm9yQ2FsbGJhY2soKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIkEgcHJvYmxlbSBvY2N1cmVkIGR1cmluZyBGZXRjaCBBUEkhXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VFcnJvckNhbGxiYWNrKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJDaXR5IHBhcnNlIG9wZXJhdGlvbiBmYWlsZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoRXJyb3JDYWxsYmFjaygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgaXMgbm90IGFueSBjaXR5IHdpdGggZ2l2ZW4gbmFtZS5cIik7XG59XG4iLCJleHBvcnQgY2xhc3MgU3RvcmFnZSB7XG4gIGNvbnN0cnVjdG9yKHNlYXJjaEhpc3RvcnksIGNpdHlNYXAsIGNpdHlOYW1lcykge1xuICAgIHRoaXMuc2VhcmNoSGlzdG9yeSA9IHNlYXJjaEhpc3Rvcnk7XG4gICAgdGhpcy5jaXR5TWFwID0gY2l0eU1hcDtcbiAgICB0aGlzLmNpdHlOYW1lcyA9IGNpdHlOYW1lcztcblxuICAgIGlmICh0eXBlb2YgbG9jYWxTdG9yYWdlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICBcIlNlYXJjaCBIaXN0b3kgRGF0YVwiLFxuICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLnNlYXJjaEhpc3RvcnkpXG4gICAgICApO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgIFwiQ2l0eSBOYW1lIE1hcCBEYXRhXCIsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20odGhpcy5jaXR5TWFwLmVudHJpZXMoKSkpXG4gICAgICApO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgIFwiQ2l0eSBOYW1lIERhdGFcIixcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbSh0aGlzLmNpdHlOYW1lcykpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBnZXRTZWFyY2hIaXN0b3J5KCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2VhcmNoIEhpc3RveSBEYXRhXCIpKSB8fCBbXTtcbiAgfVxuICBnZXRDaXR5TWFwKCkge1xuICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkNpdHkgTmFtZSBNYXAgRGF0YVwiKSkgfHwgW11cbiAgICApO1xuICB9XG4gIGdldENpdHlOYW1lcygpIHtcbiAgICByZXR1cm4gbmV3IFNldChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiQ2l0eSBOYW1lIERhdGFcIikpIHx8IFtdKTtcbiAgfVxuICBzYXZlQ2l0eURhdGEoY2l0eU5hbWUsIGNpdHlUaXRsZSwgY2l0eUxhdGxvbmcpIHtcbiAgICBpZiAoIXRoaXMuY2l0eU5hbWVzLmhhcyhjaXR5TmFtZSkgJiYgY2l0eU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zYXZlQ2l0eUlkKGNpdHlOYW1lKTtcbiAgICAgIHRoaXMuc2F2ZVNlYXJjaEhpc3RvcnkoY2l0eVRpdGxlKTtcbiAgICAgIHRoaXMuc2F2ZUNpdHlNYXAoY2l0eU5hbWUsIGNpdHlUaXRsZSwgY2l0eUxhdGxvbmcpO1xuICAgIH1cbiAgfVxuXG4gIHNhdmVTZWFyY2hIaXN0b3J5KGNpdHlUaXRsZSkge1xuICAgIGNvbnN0IHNlYXJjaEhpc3RvcnkgPVxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNlYXJjaCBIaXN0b3kgRGF0YVwiKSkgfHwgW107XG4gICAgc2VhcmNoSGlzdG9yeS5wdXNoKGNpdHlUaXRsZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJTZWFyY2ggSGlzdG95IERhdGFcIiwgSlNPTi5zdHJpbmdpZnkoc2VhcmNoSGlzdG9yeSkpO1xuICB9XG5cbiAgc2F2ZUNpdHlJZChjaXR5TmFtZSkge1xuICAgIGNvbnN0IGNpdHlOYW1lcyA9IG5ldyBTZXQoXG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiQ2l0eSBOYW1lIERhdGFcIikpIHx8IFtdXG4gICAgKTtcbiAgICBjaXR5TmFtZXMuYWRkKGNpdHlOYW1lKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgIFwiQ2l0eSBOYW1lIERhdGFcIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20oY2l0eU5hbWVzKSlcbiAgICApO1xuICB9XG5cbiAgc2F2ZUNpdHlNYXAoY2l0eU5hbWUsIGNpdHlUaXRsZSwgY2l0eUxhdGxvbmcpIHtcbiAgICBjb25zdCBjaXR5TWFwID0gbmV3IE1hcChcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJDaXR5IE5hbWUgTWFwIERhdGFcIikpIHx8IFtdXG4gICAgKTtcbiAgICBjaXR5TWFwLnNldChjaXR5TmFtZSwgW2NpdHlUaXRsZSwgY2l0eUxhdGxvbmddKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgIFwiQ2l0eSBOYW1lIE1hcCBEYXRhXCIsXG4gICAgICBKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKGNpdHlNYXAuZW50cmllcygpKSlcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWFyY2hVcmwsIHNlYXJjaEVycm9yQ2FsbGJhY2ssIHRvQ2FtZWxDYXNlIH0gZnJvbSBcIi4vaGVscGVyLmpzXCI7XG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tIFwiLi9hcGkuanNcIjtcblxuZXhwb3J0IGNsYXNzIFVJIHtcbiAgY29uc3RydWN0b3IoZ2V0Q2l0eUluZm8pIHtcbiAgICB0aGlzLnNlYXJjaEhpc3RvcnkgPSBuZXcgU2V0KFxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNlYXJjaCBIaXN0b3kgRGF0YVwiKSkgfHwgW11cbiAgICApO1xuICAgIHRoaXMuZ2V0Q2l0eUluZm8gPSBnZXRDaXR5SW5mbztcbiAgfVxuXG4gIHNob3dDaXR5SGlzdG9yeSgpIHtcbiAgICB0aGlzLnNlYXJjaEhpc3RvcnkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgY2l0eUNob2ljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIGNpdHlDaG9pY2Uuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjaXR5U2VsZWN0aW9uXCIpO1xuICAgICAgY2l0eUNob2ljZS5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50Y2l0eSA9IGVsZW1lbnQuc3BsaXQoXCIsXCIpWzBdO1xuICAgICAgICBhd2FpdCB0aGlzLmNoZWNrQW5kRmV0Y2hEYXRhKGVsZW1lbnRjaXR5KTtcbiAgICAgIH07XG4gICAgICBjaXR5Q2hvaWNlLmlubmVySFRNTCA9IGVsZW1lbnQ7XG4gICAgICBjaXR5UmVjb21tZW5kLmFwcGVuZChjaXR5Q2hvaWNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRpYWxpemVJbnB1dFRleHQoKSB7XG4gICAgc2VhcmNoQ2l0eS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5jbGVhclNlYXJjaFJlY29tbWVuZGF0aW9ucygpO1xuICAgICAgdGhpcy5zaG93Q2l0eUhpc3RvcnkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRpYWxpemVTZWFyY2hQcmVzcygpIHtcbiAgICBzZWFyY2hDaXR5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJ1dHRvblwiKS5jbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVNlYXJjaEJ1dHRvbigpIHtcbiAgICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJTZWFyY2hSZWNvbW1lbmRhdGlvbnMoKTtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0b0NhbWVsQ2FzZShzZWFyY2hDaXR5LnZhbHVlKTtcbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tBbmRGZXRjaERhdGEoZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjaGVja0FuZEZldGNoRGF0YShlbGVtZW50KSB7XG4gICAgY29uc3QgY2l0eWRhdGEgPSBuZXcgU2V0KFxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkNpdHkgTmFtZSBEYXRhXCIpKVxuICAgICk7XG4gICAgaWYgKGNpdHlkYXRhLmhhcyhlbGVtZW50KSkge1xuICAgICAgdGhpcy5jbGVhclNlYXJjaFJlY29tbWVuZGF0aW9ucygpO1xuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuc3BsaXQoXCIgXCIpO1xuICAgICAgfVxuICAgICAgdGhpcy5nZXRDaXR5SW5mbyhlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdXJsU2VhcmNoTG9jID0gY3JlYXRlU2VhcmNoVXJsKGVsZW1lbnQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaERhdGEodXJsU2VhcmNoTG9jKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNlYXJjaEVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyU2VhcmNoUmVjb21tZW5kYXRpb25zKCk7XG4gICAgICAgIHRoaXMuZ2V0Q2l0eUluZm8ocmVzcG9uc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2hvd0Nob2ljZXMob25lQ2l0eSwgZ2V0Q2l0eU5hbWUpIHtcbiAgICBsZXQgY2l0eUNob2ljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBjaXR5Q2hvaWNlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2l0eVNlbGVjdGlvblwiKTtcbiAgICBjaXR5Q2hvaWNlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBnZXRDaXR5TmFtZShvbmVDaXR5KTtcbiAgICB9O1xuICAgIGNpdHlDaG9pY2UuaW5uZXJIVE1MID0gYCR7b25lQ2l0eS5jaXR5fSwgJHtvbmVDaXR5LmNvdW50cnl9YDtcbiAgICBjaXR5UmVjb21tZW5kLmFwcGVuZChjaXR5Q2hvaWNlKTtcbiAgfVxuXG4gIGNsZWFyU2VhcmNoUmVjb21tZW5kYXRpb25zKCkge1xuICAgIGNpdHlSZWNvbW1lbmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIGNsZWFyV2VhdGhlckluZm8oKSB7XG4gICAgZGFpbHlGb3JlY2FzdC5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgY2xlYXJTZWFyY2hCb3goKSB7XG4gICAgc2VhcmNoQ2l0eS52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBzaG93Q3VycmVudEluZm8oXG4gICAgY2l0eVRpdGxlLFxuICAgIGRhdGV0aW1lTm93LFxuICAgIGljb25Ob3csXG4gICAgdGVtcE5vdyxcbiAgICBodW1pZGl0eU5vdyxcbiAgICB3aW5kTm93LFxuICAgIHV2Tm93LFxuICAgIHN1blJpc2VOb3csXG4gICAgc3VuU2V0Tm93XG4gICkge1xuICAgIGNpdHlOYW1lRGF0ZS50ZXh0Q29udGVudCA9IGNpdHlUaXRsZTtcbiAgICBkYXRldGltZS50ZXh0Q29udGVudCA9IGRhdGV0aW1lTm93O1xuICAgIHdlYXRoZXJJY29uLnNyYyA9IGljb25Ob3c7XG4gICAgdGVtcC50ZXh0Q29udGVudCA9IHRlbXBOb3c7XG4gICAgaHVtaS50ZXh0Q29udGVudCA9IGh1bWlkaXR5Tm93O1xuICAgIHdpbmQudGV4dENvbnRlbnQgPSB3aW5kTm93O1xuICAgIHV2LnRleHRDb250ZW50ID0gdXZOb3c7XG4gICAgc3VuUmlzZS50ZXh0Q29udGVudCA9IHN1blJpc2VOb3c7XG4gICAgc3VuU2V0LnRleHRDb250ZW50ID0gc3VuU2V0Tm93O1xuICB9XG5cbiAgc2hvd0Z1dHVyZUluZm8oXG4gICAgZGF0ZXMsXG4gICAgaWNvbnMsXG4gICAgbWF4VGVtcHMsXG4gICAgbWluVGVtcHMsXG4gICAgYXZnSHVtaWRpdHlzLFxuICAgIG1heFdpbmRzLFxuICAgIHV2cyxcbiAgKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgIGNvbnN0IGRheUZvcmVjYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgY29uc3QgZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgY29uc3QgbWF4VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCBtaW5UZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGF2Z0h1bWlkaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IG1heFdpbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgdXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBkYXkuaW5uZXJIVE1MID0gZGF0ZXNbaV07XG4gICAgICBpY29uLnNyYyA9IGljb25zW2ldO1xuICAgICAgbWF4VGVtcC5pbm5lckhUTUwgPSBgPHA+TWF4OjwvcD4gPHA+JHttYXhUZW1wc1tpXX08c3Bhbj4mIzg0NTE7PC9zcGFuPjwvcD5gO1xuICAgICAgbWluVGVtcC5pbm5lckhUTUwgPSBgPHA+TWluOjwvcD4gPHA+JHttaW5UZW1wc1tpXX08c3Bhbj4mIzg0NTE7PC9zcGFuPjwvcD5gO1xuICAgICAgYXZnSHVtaWRpdHkuaW5uZXJIVE1MID0gYDxwPkg6PC9wPiA8cD4ke2F2Z0h1bWlkaXR5c1tpXX0lPC9wPmA7XG4gICAgICBtYXhXaW5kLmlubmVySFRNTCA9IGA8cD5XOjwvcD4gPHA+JHttYXhXaW5kc1tpXX1rbS9oPC9wPmA7XG4gICAgICB1di5pbm5lckhUTUwgPSBgPHA+VVY6PC9wPiA8cD4ke3V2c1tpXX08L3A+YDtcblxuICAgICAgZGF5Rm9yZWNhc3QuYXBwZW5kKGRheSk7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQoaWNvbik7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQobWF4VGVtcCk7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQobWluVGVtcCk7XG4gICAgICBkYXlGb3JlY2FzdC5hcHBlbmQoYXZnSHVtaWRpdHkpO1xuICAgICAgZGF5Rm9yZWNhc3QuYXBwZW5kKG1heFdpbmQpO1xuICAgICAgZGF5Rm9yZWNhc3QuYXBwZW5kKHV2KTtcblxuICAgICAgbWF4VGVtcC5jbGFzc0xpc3QuYWRkKFwiZGF5LWZvcmVjYXN0XCIpXG4gICAgICBtaW5UZW1wLmNsYXNzTGlzdC5hZGQoXCJkYXktZm9yZWNhc3RcIilcbiAgICAgIGF2Z0h1bWlkaXR5LmNsYXNzTGlzdC5hZGQoXCJkYXktZm9yZWNhc3RcIilcbiAgICAgIG1heFdpbmQuY2xhc3NMaXN0LmFkZChcImRheS1mb3JlY2FzdFwiKVxuICAgICAgdXYuY2xhc3NMaXN0LmFkZChcImRheS1mb3JlY2FzdFwiKVxuICAgICAgZGFpbHlGb3JlY2FzdC5hcHBlbmQoZGF5Rm9yZWNhc3QpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSBcIi4vYXBpLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVGb3JlY2FzdFVybCwgZmV0Y2hFcnJvckNhbGxiYWNrIH0gZnJvbSBcIi4vaGVscGVyLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWF0aGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgZGF0ZXRpbWVOb3csXG4gICAgaWNvbk5vdywgICAgXG4gICAgdGVtcE5vdyxcbiAgICBodW1pZGl0eU5vdyxcbiAgICB3aW5kTm93LFxuICAgIHV2Tm93LFxuICAgIHN1blJpc2VOb3csXG4gICAgc3VuU2V0Tm93LFxuICAgIGRhdGVzLFxuICAgIGljb25zLFxuICAgIG1heFRlbXBzLFxuICAgIG1pblRlbXBzLFxuICAgIGF2Z0h1bWlkaXR5cyxcbiAgICBtYXhXaW5kcyxcbiAgICB1dnNcbiAgKSB7XG4gICAgdGhpcy5kYXRldGltZU5vdyA9IGRhdGV0aW1lTm93O1xuICAgIHRoaXMuaWNvbk5vdyA9IGljb25Ob3c7XG4gICAgdGhpcy50ZW1wTm93ID0gdGVtcE5vdztcbiAgICB0aGlzLmh1bWlkaXR5Tm93ID0gaHVtaWRpdHlOb3c7XG4gICAgdGhpcy53aW5kTm93ID0gd2luZE5vdztcbiAgICB0aGlzLnV2Tm93ID0gdXZOb3c7XG4gICAgdGhpcy5zdW5SaXNlTm93ID0gc3VuUmlzZU5vdztcbiAgICB0aGlzLnN1blNldE5vdyA9IHN1blNldE5vdzsgICAgXG4gICAgdGhpcy5kYXRlcyA9IGRhdGVzO1xuICAgIHRoaXMuaWNvbnMgPSBpY29ucztcbiAgICB0aGlzLm1heFRlbXBzID0gbWF4VGVtcHM7XG4gICAgdGhpcy5taW5UZW1wcyA9IG1pblRlbXBzO1xuICAgIHRoaXMuYXZnSHVtaWRpdHlzID0gYXZnSHVtaWRpdHlzO1xuICAgIHRoaXMubWF4V2luZHMgPSBtYXhXaW5kcztcbiAgICB0aGlzLnV2cyA9IHV2cztcbiAgfVxuXG4gIGFzeW5jIGdldEZvcmVjYXN0RGF0YShsYXRMb25nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybEZvcmVMb2MgPSBjcmVhdGVGb3JlY2FzdFVybChsYXRMb25nKTtcbiAgICAgIGNvbnN0IHJhd0RhdGEgPSBhd2FpdCBmZXRjaERhdGEodXJsRm9yZUxvYyk7XG4gICAgICBjb25zdCByYXdEYXRhSnNvbiA9IEpTT04uc3RyaW5naWZ5KHJhd0RhdGEpXG4gICAgICBjb25zdCB3ZWF0aGVyQXBpRGF0YSA9IHRoaXMucGFyc2VXZWF0aGVyRGF0YShyYXdEYXRhSnNvbik7XG4gICAgICByZXR1cm4gbmV3IFdlYXRoZXIoXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcImRhdGV0aW1lXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJjdXJyZW50SW5mb1wiKS5nZXQoXCJpY29uXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJjdXJyZW50SW5mb1wiKS5nZXQoXCJ0ZW1wXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJjdXJyZW50SW5mb1wiKS5nZXQoXCJodW1pZGl0eVwiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiY3VycmVudEluZm9cIikuZ2V0KFwid2luZEtwaFwiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiY3VycmVudEluZm9cIikuZ2V0KFwidXZcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcInN1blJpc2VcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImN1cnJlbnRJbmZvXCIpLmdldChcInN1blNldFwiKSwgICAgICAgIFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJmb3JlY2FzdEluZm9cIikuZ2V0KFwiZGF0ZXNcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImZvcmVjYXN0SW5mb1wiKS5nZXQoXCJpY29uc1wiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiZm9yZWNhc3RJbmZvXCIpLmdldChcIm1heFRlbXBzXCIpLFxuICAgICAgICB3ZWF0aGVyQXBpRGF0YS5nZXQoXCJmb3JlY2FzdEluZm9cIikuZ2V0KFwibWluVGVtcHNcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImZvcmVjYXN0SW5mb1wiKS5nZXQoXCJhdmdIdW1pZGl0eXNcIiksXG4gICAgICAgIHdlYXRoZXJBcGlEYXRhLmdldChcImZvcmVjYXN0SW5mb1wiKS5nZXQoXCJtYXhXaW5kc1wiKSxcbiAgICAgICAgd2VhdGhlckFwaURhdGEuZ2V0KFwiZm9yZWNhc3RJbmZvXCIpLmdldChcInV2c1wiKVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZmV0Y2hFcnJvckNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VXZWF0aGVyRGF0YShyYXdXZWF0aGVyRGF0YSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBKU09OLnBhcnNlKHJhd1dlYXRoZXJEYXRhKVtcImN1cnJlbnRcIl07XG4gICAgY29uc3QgZm9yZWNhc3QgPSBKU09OLnBhcnNlKHJhd1dlYXRoZXJEYXRhKVtcImZvcmVjYXN0XCJdW1wiZm9yZWNhc3RkYXlcIl07XG4gICAgY29uc3QgY3VycmVudEluZm8gPSBuZXcgTWFwKFtcbiAgICAgIFtcImRhdGV0aW1lXCIsIGN1cnJlbnRbXCJsYXN0X3VwZGF0ZWRcIl1dLFxuICAgICAgW1wiaWNvblwiLCBjdXJyZW50W1wiY29uZGl0aW9uXCJdW1wiaWNvblwiXV0sXG4gICAgICBbXCJ0ZW1wXCIsIGN1cnJlbnRbXCJ0ZW1wX2NcIl1dLFxuICAgICAgW1wiaHVtaWRpdHlcIiwgY3VycmVudFtcImh1bWlkaXR5XCJdXSxcbiAgICAgIFtcIndpbmRLcGhcIiwgY3VycmVudFtcIndpbmRfa3BoXCJdXSxcbiAgICAgIFtcInV2XCIsIGN1cnJlbnRbXCJ1dlwiXV0sXG4gICAgICBbXCJzdW5SaXNlXCIsIGZvcmVjYXN0WzBdW1wiYXN0cm9cIl1bXCJzdW5yaXNlXCJdXSxcbiAgICAgIFtcInN1blNldFwiLCBmb3JlY2FzdFswXVtcImFzdHJvXCJdW1wic3Vuc2V0XCJdXSwgICAgICBcbiAgICBdKTtcblxuICAgIGNvbnN0IGRhdGVzID0gW107XG4gICAgY29uc3QgaWNvbnMgPSBbXTtcbiAgICBjb25zdCBtYXhUZW1wcyA9IFtdO1xuICAgIGNvbnN0IG1pblRlbXBzID0gW107XG4gICAgY29uc3QgYXZnSHVtaWRpdHlzID0gW107XG4gICAgY29uc3QgbWF4V2luZHMgPSBbXTtcbiAgICBjb25zdCB1dnMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICBkYXRlcy5wdXNoKGZvcmVjYXN0W2ldW1wiZGF0ZVwiXSk7XG4gICAgICBpY29ucy5wdXNoKGZvcmVjYXN0W2ldW1wiZGF5XCJdW1wiY29uZGl0aW9uXCJdW1wiaWNvblwiXSk7XG4gICAgICBtYXhUZW1wcy5wdXNoKGZvcmVjYXN0W2ldW1wiZGF5XCJdW1wibWF4dGVtcF9jXCJdKTtcbiAgICAgIG1pblRlbXBzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJtaW50ZW1wX2NcIl0pO1xuICAgICAgYXZnSHVtaWRpdHlzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJhdmdodW1pZGl0eVwiXSk7XG4gICAgICBtYXhXaW5kcy5wdXNoKGZvcmVjYXN0W2ldW1wiZGF5XCJdW1wibWF4d2luZF9rcGhcIl0pO1xuICAgICAgdXZzLnB1c2goZm9yZWNhc3RbaV1bXCJkYXlcIl1bXCJ1dlwiXSk7XG4gICAgfVxuICAgIGNvbnN0IGZvcmVjYXN0SW5mbyA9IG5ldyBNYXAoW1xuICAgICAgW1wiZGF0ZXNcIiwgZGF0ZXNdLFxuICAgICAgW1wiaWNvbnNcIiwgaWNvbnNdLFxuICAgICAgW1wibWF4VGVtcHNcIiwgbWF4VGVtcHNdLFxuICAgICAgW1wibWluVGVtcHNcIiwgbWluVGVtcHNdLFxuICAgICAgW1wiYXZnSHVtaWRpdHlzXCIsIGF2Z0h1bWlkaXR5c10sXG4gICAgICBbXCJtYXhXaW5kc1wiLCBtYXhXaW5kc10sXG4gICAgICBbXCJ1dnNcIiwgdXZzXVxuICAgIF0pO1xuXG4gICAgY29uc3QgcGFyc2VkV2VhdGhlckluZm8gPSBuZXcgTWFwKFtcbiAgICAgIFtcImN1cnJlbnRJbmZvXCIsIGN1cnJlbnRJbmZvXSxcbiAgICAgIFtcImZvcmVjYXN0SW5mb1wiLCBmb3JlY2FzdEluZm9dXG4gICAgXSk7XG5cbiAgICByZXR1cm4gcGFyc2VkV2VhdGhlckluZm87XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmIHF1ZXVlLmQgPCAxKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIHF1ZXVlLmQgPCAwICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2FwcC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
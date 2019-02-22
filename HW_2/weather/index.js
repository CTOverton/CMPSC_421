let zipCode = 19335;
let latLng = {
    lat: 0,
    lng: 0
};
let grid = {
    cwa: '',
    x: 0,
    y: 0
};

let forecastData = {};

let focus = {
    day: 'Fri',
    currentTime: '10:00am',
    currentTemp: 0,
    precipitation: 0,
    humidity: 0,
    wind: 0
};

$(document).ready(function() {
    update(zipCode);
});

$('#zipCode').change(function() {
    if ($('#zipCode').val() != zipCode) {update($('#zipCode').val());}
});

function update(zip) {
    zipToLatLng(zip)
        .then(function (LatLngOutput) {
            console.log(LatLngOutput);
            LatLngToGrid(LatLngOutput)
                .then(function (GridOutput) {
                    console.log(GridOutput);
                    gridTo_forecastGridData(GridOutput)
                        .then(function(DataOutput){
                            forecastData = DataOutput.properties;
                            updateFocus(new Date());
                            renderFocus();
                            renderDays(DataOutput.properties);


                        });
                });

        });
}

function updateFocus(date) {
    focus.currentTemp = getDataAtTime(forecastData.temperature, date);
    focus.precipitation = getDataAtTime(forecastData.probabilityOfPrecipitation, date);
    focus.humidity = getDataAtTime(forecastData.relativeHumidity, date);
    focus.wind = getDataAtTime(forecastData.windSpeed, date);
    console.log(focus);
}

function renderFocus() {
    renderData('currentTemp', '', '°');
    renderData('precipitation', 'Precipitation: ', '%');
    renderData('humidity', 'Humidity: ', '%');
    renderData('wind', 'Wind: ', ' km/h');
}

function renderData(key, prefix, suffix) {
    if ($('#'+key)) {
        if (focus[key] != null) {
            $('#'+key).html(prefix + focus[key] + suffix);
        } else {
            $('#'+key).html(prefix + 'N/A');
        }

    }
}


function getDataAtTime(data, date) {
    for (let i=0; i < data.values.length; i++) {
        let now = date;

        let [ start, duration ] = data.values[i].validTime.split('/');
        let dataDate = new Date(data.values[i].validTime.slice(0,10));
        let dataTime = parseInt(data.values[i].validTime.slice(11,13));

        if (now.getHours() == dataTime && now.getDate() == dataDate.getDate()+1) {
            return Math.round(data.values[i].value);
        }
    }
}


function zipToLatLng(zip) {
    return new Promise(function(resolve, reject) {
        let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
        if (isValidZip) {
            zipCode = zip;
            console.log('New Zip: ' + zip);

            let settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://open.mapquestapi.com/geocoding/v1/address?",
                "data": {
                    "key": "FRAQJaoCa0da5EQTvvpSd9gfXEHxDda5",
                    "location": zip
                },
                "method": "GET"
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
                latLng = response.results[0].locations[1].latLng;
                resolve(latLng);
            });
        }
    });
}

function LatLngToGrid(location) {
    return new Promise(function (resolve, reject) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.weather.gov/points/" + location.lat + ',' + location.lng,
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            grid.cwa = response.properties.cwa;
            grid.x = response.properties.gridX;
            grid.y = response.properties.gridY;
            resolve(grid);
        });
    });
}

function gridTo_forecastGridData(g) {
    return new Promise(function (resolve, reject) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.weather.gov/gridpoints/" + g.cwa + "/" + g.x + ',' + g.y,
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            resolve(response);
        });
    });
}

function renderDays(data) {
    let days = $('#days');
    days.empty();

    let daysOfTheWeek = ['Sun','Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

    for (let i=0; i < data.maxTemperature.values.length; i++) {
        let day = document.createElement('div');
        day.className = "day";
        day.setAttribute("data-id", data.maxTemperature.values[i].validTime);

        createEl('div', 'title', daysOfTheWeek[(new Date(data.maxTemperature.values[i].validTime.slice(0,10))).getDay()], day);
        createEl('div', 'icon', '', day);
        let day_temp = createEl('div', 'temp', '', day);
        createEl('div', 'high', Math.ceil(data.maxTemperature.values[i].value) + '°', day_temp);
        createEl('div', 'low', Math.floor(data.minTemperature.values[i].value) + '°', day_temp);

        days.append(day);
    }

}

function createEl(type, className, html, parent) {
    let el = document.createElement(type);
    el.className = className;
    if ((html != null) && (html != '')){ el.innerHTML = html }
    parent.appendChild(el);
    return el;
}
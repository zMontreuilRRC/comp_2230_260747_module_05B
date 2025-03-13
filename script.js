const DOMAIN = "https://restcountries.com/v3.1/";

getAndShowCountries();

async function getCountries() {
    // ALWAYS try/catch external requests
    try {
        // creates an HTTP GET (by default) request to a Uniform Resource Locator (URL)
        // const data = await fetch()
        const requestObject = fetch(`${DOMAIN}${factsEndpoint}?limit=2&max_length=50`);
        console.log(requestObject);

        // wait for the promise to be resolved and store the result in this variable
        const response = await requestObject;
        
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    } catch(errorObject) {
        console.log(errorObject);
    }
}

/**
 * Send a request to a Countries endpoint with an array of filters to reduce the data received
 * Reduces the data down to a country's official name, population, region, and area 
 * @param {String[]} fields - array of strings for specified sets of data to be returned with each country
 * @param {String} [pathParam="null"] pathParam - query string to be included with request, if any
 * @param {String} [endpoint="all"] endpoint - endpoint of the query 
 */
async function getCountriesWithFilter(fields, pathParam = null, endpoint = "all") {
    let query = `${DOMAIN}${endpoint}`;

    // if pathParam is included with a value, add it to the endpoint
    if(pathParam && pathParam.trim().length > 0) {
        query += `/${pathParam}`;
    }

    if(fields.length > 0) {
        query += `?fields=${fields.toString()}`
    }
    
    try {
        const dataResponse = await fetch(query);

        if(!dataResponse.ok) {
            throw new Error(`HTTP error: ${dataResponse.status}`);
        }

        return dataResponse.json();
    } catch(error) {
        console.log(error);
    }
}

/**
 * Iterate over an array of Country objects and append their data to the document in a paragraph.
 * @param {Object[]} data - Array of objects representing data about Countries
 */
function displayCountries(data) {
    const countryDataNode = document.querySelector("#country-data");

    // iterate over the array of country objects
    data.forEach(country => {
        const newCountryNode = document.createElement("p");
        
        // destructuring syntax to pull relevant values from the object when iterated over
        const {
            name: {official},
            population,
            area,
            region,
            fifa
        } = country;

        let countryText = `${official} is a country in ${region}. It has an area of ${area} square kilometres,
        and a population of ${population}.`

        // check if "fifa" property exists on country object
        if(fifa) {
            countryText += " It has a football team.";
        } else {
            countryText += " It does not have a football team."
        }
        
        newCountryNode.textContent = countryText;
        countryDataNode.append(newCountryNode);
    });
}

async function getAndShowCountries() {
    const data = await getCountriesWithFilter([]);
    displayCountries(data);
}
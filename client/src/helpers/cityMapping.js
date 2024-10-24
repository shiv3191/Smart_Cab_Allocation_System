const fs = require("fs/promises");
const axios = require("axios");

const cities = [
    "Rajwada",
    "LalBaag",
    "Museum",
    "Ganpati",
    "Khajrana",
    "NehruPark",
    "Patalpani",
    "Ralamandal",
    "Sarafa",
    "Chhatri",
    "C21Mall",
    "IIM",
    "MGIT",
    "Malhar",
    "Tincha",
    "NightMarket"
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const seedDB = async () => {
    let dict = {};

    for (const city of cities) {
        try {
            await axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=1&namePrefix=${city}`)
                .then((response) => {
                    data = response.data.data[0].id;
                    console.log(data);
                    if(data) dict[city] = data;
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(`Error fetching data for ${city}: ${error.message}`);
        }

        // Sleep for 2 seconds before the next API call
    }

    // Write the mapping to a file
    try {
        await fs.writeFile('cityMapping.json', JSON.stringify(dict, null, 2));
        console.log('City mapping has been written to cityMapping.json');
    } catch (error) {
        console.error(`Error writing city mapping to file: ${error.message}`);
    }
};

seedDB();

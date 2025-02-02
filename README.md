<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />


  <br>
  
  <h1 align="center">Smart-Cab-Allocation-System</h1>

  <p align="center">
  Book Your Cab and Get your Ride.
    <br />
    <br />
    <a href="https://github.com/shiv3191/Smart_Cab_Allocation_System">GITHUB REPOSITORY</a>
  </p>
</div>

Only the user with the unique Email ID **ce220004044@iiti.ac.in** is designated as the admin, who has exclusive rights to register cabs in the system. All other users are assigned regular user roles.

Watch the Demo Video: https://drive.google.com/file/d/1U_y1jkt5GCaWyB7WhPh3ZeanzStm4TUV/view?usp=drive_link


<!-- ABOUT THE PROJECT -->
## About The Project

> **_NOTE:_** 
This website is currently designed for optimal viewing on laptop or desktop screens. Please avoid accessing it on mobile or tablet devices.


 





## Features
* **Explore a wide array of cabs**: Choose from a variety of cabs for your journey, complete with detailed information on routes and estimated travel times.
* **Efficient cab allocation**: Quickly find the nearest available cab based on your location and route preferences.
* **Secure Booking Process**: Rest assured that your cab bookings are safe and secure with advanced encryption and security measures.
* **User-Friendly Interface**: Our intuitive interface allows users to navigate through cab options, select their preferred cab, and confirm bookings with just a few clicks.

Whether you're a daily commuter or planning a one-time trip, **CabHub** is designed to meet all your transportation needs efficiently and reliably. Let us handle your journey while you enjoy the convenience of a smooth, well-planned ride!





### Built With

* [React](https://legacy.reactjs.org/)
* [Tailwind](https://tailwindcss.com/)
* [NodeJS](https://nodejs.org/docs/latest/api/)
* [Express](http://expressjs.com)
* [MongoDB](https://www.mongodb.com/)






<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up and run Pokemania on your local machine:

#### Pre Requisites

* Install [Node >=20](https://nodejs.org/en/download) on your system.

#### Setup Steps

* Clone this repository
    ```sh
    git clone https://github.com/shiv3191/Smart_Cab_Allocation_System
    ```
#### For Client Side (Frontend):
* Navigate to the `client` directory

    ```sh
    cd client
    ```

* Install all client dependencies.
  ```sh
  npm install
  ```

  * If any error occurs, try running above with root permissions.

* Spin up the developmental client side.

  ```sh
  npm run start
  ```

* Client side is now running on ```http://localhost:3000```.

* Visit http://localhost:3000.

#### For Server Side (Backend):
* Open new terminal(cmd)/tab or shift + cmd+ tab.

* Navigate to the `server` directory.
  ```sh
  cd server
  ```

* Install server dependencies.
  ```sh
  npm install
  ```
  *  Make sure you have installed NodeJS and MongoDB before running this command.

* Start the server by running below command
  ```sh
  npm run start
  ```
* Client side is now running on ```http://localhost:8000```.




<!-- USAGE EXAMPLES -->
<!-- ## Usage

For usage and Project Demo, please checkout the [Demo Video](https://res.cloudinary.com/defj06zfq/video/upload/v1703702825/g2ja7rclvzhzu1xp1szn.mp4) provided. -->

## Walkthrough of the Platform

# CabHub - Smart Cab Allocation System

## User Section:

### Login and Signup:
- Users must first create an account through the Signup page. 
- After successful registration or login, users can access their profile.

### Profile Page:
- In the profile section, users can view past cab bookings and make new bookings for upcoming trips.

### Cab Booking Process:
- When users initiate a new cab booking, they are directed to the Booking page, where they must select:
  - **Pickup location**
  - **Destination**
  - **Date** for their journey.
- Available cabs are displayed based on a **predefined static route system** (as the system doesn’t use dynamic routing via Google Maps APIs). This allows users to find the nearest available cab for their trip.
- Once the booking is confirmed, users receive detailed confirmation of their trip, including cab details and pickup time.

---

## Admin Section:

### Admin Login:
- Admins must log in from the homepage.
- Once logged in, they are redirected to the **Admin Dashboard**.

### Manage Cabs:
- In the Admin Dashboard, admins can add new cabs by specifying:
  - **Cab name**
  - **Pickup location**
  - **Destination**
  - **Total availability**
  - **Operational schedule** (the days the cab operates).
- Although dynamic Google Maps routing is not used due to cost considerations, admins define static routes for reliable trip planning.

### Modify and Delete Cabs:
- Admins have the authority to update or delete cab information as needed, ensuring accurate and up-to-date data for users.

---


## Code Samples
<details>
  <summary>Click to expand Dijkstra's Logic</summary>

  ```javascript
  export default async function findKShortestPaths(cities, distanceMatrix, src, dest, k) {
  const n = cities.length;

  // Initialize graph
  const g = new Array(n + 1).fill(null).map(() => []);
  for (const [edge, distance] of Object.entries(distanceMatrix)) {
    const [city1, city2] = edge.split("-");
    const city1Index = cities.indexOf(city1) + 1;
    const city2Index = cities.indexOf(city2) + 1;
    if(city1Index <= n && city2Index <= n) g[city1Index].push({ dest: city2Index, cost: distance });
  }

  // Vector to store distances
  const dis = new Array(n + 1).fill(null).map(() => Array(k).fill({cost: Infinity, pred: null}));
  const pred = new Array(n + 1).fill(null).map(() => Array(k).fill(Infinity));
  // Priority queue for Dijkstra's algorithm
  const pq = [{ cost: 0, node: cities.indexOf(src) + 1 }];
  let vis = []
  for(let i = 1; i <= n; i++) vis[i] = false;
  while (pq.length > 0) {
    const { node: u, cost: d } = pq.shift();
    // Check if the distance is less than the kth shortest distance to the destination
    if (dis[u][k - 1] < d) continue;
    if (u === cities.indexOf(dest) + 1) continue;
    if (vis[u]) continue;
    vis[u] = true;
    const v = g[u];

    // Traverse the adjacency list
    for (const { dest, cost } of v) {
      const newCost = d + cost;

      // Check if the new cost is less than the kth shortest distance to the destination
      if (newCost < dis[dest][k - 1].cost) {
        // Clear predecessors and add the new predecessor
        dis[dest][k - 1] = {cost: newCost, pred: u};
        
        // Sort the distances and predecessors after updating
        dis[dest].sort((a, b) => a.cost - b.cost);

        // Push the new cost and destination to the priority queue
        pq.push({ cost: newCost, node: dest });

        // Sort the priority queue based on cost
        pq.sort((a, b) => a.cost - b.cost);
      } 
    }
    
  }

  // Printing K shortest paths
  const result = dis[cities.indexOf(dest) + 1].slice(0, k);
  console.log(`Top ${k} Shortest Paths from ${src} to ${dest}:`);
  let res = new Set();
  for (let i = 0; i < k; i++) {
    const paths = await getPaths(dis, cities, src, dest, result[i].cost);

      res.add(JSON.stringify({distance: result[i].cost, paths: paths}))

    console.log(`Path ${i + 1}: ${result[i].cost} (Distance) - ${paths.join(" | ")}`);
    }
    return res;
   }

    async function getPaths(result, cities, src, dest, distance) {
    const paths = [];
    const path = [cities.indexOf(dest) + 1];
    let current = cities.indexOf(dest) + 1;
    while (current !== cities.indexOf(src) + 1) {
        const pred = result[current].find((x) => x.cost.toFixed(1) === distance.toFixed(1)).pred;
        path.push(pred);
        distance -= getDistance(cities[current - 1], cities[pred - 1]);
        current = pred;
    }
    path.reverse();
    for (let i = 0; i < path.length - 1; i++) {
        const city1 = cities[path[i] - 1];
        const city2 = cities[path[i + 1] - 1];
        paths.push(`${city1},${city2}`);
    }
    return paths;
  }

  function getDistance(city1, city2) {
  const key = `${city1}-${city2}`;
  return distanceMatrix[key];
  }

 // Load city data and distance matrix
 const cities = Object.keys(require("./cityMapping.json"));
 const distanceMatrix = require("./matrix.json");
  
  ```
</details>

<!-- <details>
<summary>Click to expand the evolution chain fetching logic</summary>

```javascript

useEffect(() => {
        const fetchAllEvolutionChains = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/evolution-chain?limit=541');
                const evolutionChainURLs = response.data.results.map((result) => result.url);
                const chainMap = {};

                // Fetch and process each evolution chain
                await Promise.all(evolutionChainURLs.map(async (url) => {
                    const chainResponse = await axios.get(url);
                    const evolutionData = chainResponse.data.chain;
                    const evolutionArray = buildEvolutionArray(evolutionData);

                    // Update the chainMap for each Pokémon in the evolution chain
                    evolutionArray.forEach((pokemon) => {
                        chainMap[pokemon] = evolutionArray;
                    });
                }));

                setEvolutionChains(chainMap);
            } catch (error) {
                console.error('Error fetching evolution chains:', error);
            }
        };

        // Recursive function to build the evolution array
        const buildEvolutionArray = (evolutionData) => {
            const evolvesTo = evolutionData.evolves_to.flatMap((evolution) => {
                return buildEvolutionArray(evolution);
            });

            return [evolutionData.species.name, ...evolvesTo];
        };

        fetchAllEvolutionChains();
    }, []);
```
</details>

<details>
<summary>Click to expand the sorting and fetch all pokemon logic</summary>

```javascript

const getAllPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1302")
      .then((response) => response.json())
      .then((data) => {
        // setAllPokemons(data.results);
        // setFullPokemons(data.results);
        console.log(sort)
        console.log("anbfhjksdbvfhkwevfeghkjvdf wjehd")
        switch (sort) {
          case "1":
            setAllPokemons([...data.results].sort((a, b) => parseInt(a.url.split("/")[6]) - parseInt(b.url.split("/")[6])));
            break;
          case "2":
            setAllPokemons([...data.results].sort((a, b) => parseInt(b.url.split("/")[6]) - parseInt(a.url.split("/")[6])));
            break;
          case "3":
            setAllPokemons([...data.results].sort((a, b) => a.name.localeCompare(b.name)));
            break;
          case "4":
            setAllPokemons([...data.results].sort((a, b) => b.name.localeCompare(a.name)));
            break;
          default:
            setAllPokemons([...data.results]);
        }
      });
  };
```
</details> --> 


<!-- ROADMAP -->
## Roadmap


- [x] User/Admin Authentication
- [x] Add new cab by Admin
- [x] Delete and Edit cab by Admin
- [ ] Display available cabs in sorted order based on proximity to the user (static routes)
- [ ] Optimize cab allocation for efficient trip planning



## Platform's Users' Perspective

* Enthusiasts of travel and commuters, whether occasional travelers or frequent cab users, will find **CabHub** to be a valuable tool for streamlining their cab booking and trip planning. The system's user-friendly interface and efficient functionality make it an essential resource for individuals seeking convenient and reliable cab allocation services.

* **CabHub** functions as a centralized platform that provides detailed information on available cabs, predefined routes, and real-time availability. It caters to a variety of users, including commuters looking for convenient transportation, travelers planning trips, and administrators managing cab operations.

* The platform serves as an efficient resource for users who want to optimize their travel experience. Whether it's finding the nearest available cab, confirming trip details, or admins managing cab availability and routes, **CabHub** offers a seamless and streamlined solution for all their transportation needs.


<!-- CONTACT -->
## Contact

Mail: [ce220004044@iiti.ac.in](ce220004044@iiti.ac.in)

Project Link: [https://github.com/shiv3191/Smart_Cab_Allocation_System](https://github.com/shiv3191/Smart_Cab_Allocation_System)


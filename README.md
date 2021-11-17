# Airport Cloud Coverage app!

**This application consists of the following challenge:**

**Assumptions:**

 - The Frontend must be a SPA written in React with React hooks.
 - Backend must be written nodejs using krakenjs suite.
 - All calculations must be performed on an endpoint in the backend
   (API).
 - The frontend must send the initial data to the api, being minimum number of airports: 3, minimum amount of clouds: 4, terrain size having at least an area of ​​10 x 10. As a result it must receive data for plotting a graph or grid with the result of the calculation.
 - The result must always start with the number of clouds and airports
   in random positions, remembering that an airport cannot start
   with a cloud over it.

**The challenge:**
A volcano has just erupted, causing a cloud of ash that spreads and impedes air circulation. The government is very concerned and wants to know when an ash cloud will hit every airport in the country. A map detailing the current situation is available. The map is rectangular, divided into small squares. On this map there are three types of squares: cloud (indicating that this region of the map is already covered by clouds), airports (indicating the location of an airport) and all others (indicating places where the cloud has not yet arrived). Each day, the cloud expands one square horizontally and one square vertically. That is, at the end of each day, all squares adjacent (vertically or horizontally) to a cloud, also contain clouds.

To prepare contingency plans, the government needs to know:
> How many days will it take for at least one airport to be covered by clouds.
> In how many days will all airports be covered by clouds. Given a minimum grid of 10 rows and 10 columns, in addition to the initial indication of clouds and airports, develop a program that reports the number of days until a first airport is under the ash cloud and the number of days until all airports become covered by the ashes. Being able to upload the test result in the candidate's personal git sending me the project link for analysis.


# How to use the application

The project is divided into two environments: A frontend in React.js and a backend in Node.js.

### Frontend

From the project's root folder, use the commands:


    yarn install
    yarn start

### Backend

As with the *frontend* folder, use these commands to launch the API.

    yarn install
    yarn run dev
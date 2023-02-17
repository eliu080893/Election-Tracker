# Election-Tracker

This application pulls the results of the 2020 Presidential Election from a NY times API, and then displays it on a SPA. It should be connected to an instance of a MongoDB database in order to serve the webpage properly.

## How to connect to MongoDB

Your personal MongoDB database connection string should be copied and saved in the **.env** file under the variable name MONGO.
Example : MONGO = 'your_personal_connection_string_here'

## How to Use
If properly loaded, the page should contain a map of each U.S. state, as well as who won the electoral vote for that state. There is no interactivity with the basic map, unless you toggle **Custom Mode** to be on.

## Custom Mode
If this is turned on, you can now click on each individual U.S. state to cycle through all the candidates that were on the ballot for that state. This should update the scoreboard accordingly.

You can also choose to save your custom map while you are in **Custom Mode**. An explanation of each button is provided below.

- **Save Custom Map** : Save your custom map, using the input name, into your MongoDB instance.
- **Load Custom Map** : Load your custom map, using the input name, from your MongoDB instance.
- **Reset the Map** : Reset the map to the original state.
- **Delete Custom Map** : Delete your custom map, using the input name, from your MongoDB instance.

## Demo of the application
![Demo](https://github.com/eliu080893/Election-Tracker/blob/master/assets/DemoGIF.gif)

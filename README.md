# MyGamesStore Back-End

This is repository contains the back-end implementation of the MyGamesStore project, which I built to reinforce and practice concepts of ReactJS and ExpressJS.

You can find the front-end implementation [here](https://github.com/marcosmatasousa/mygamesstore-frontend).

The back-end side of the project was implemented using ExpressJS and MongoDB for data persitence. The API's base URL is running on https://mygamesstore-backend.onrender.com/.


## Endpoints

### **1. Get all games**
#### `GET /api/games`
Returns a list of all available games.  

#### **Query Parameters (optional)**
| Parameter | Type   | Description                              |
|-----------|--------|------------------------------------------|
| `page`    | Number | Page number for pagination              |
| `count`   | Number | Number of games per page                |

#### **Example Request**

GET /api/games?page=1&count=2

#### **Example Response**
```json
[
  {
    "_id": "6798e02247cb59d01938c2d3",
    "name": "Grand Theft Auto V",
    "released": "2013-09-17",
    "background_image": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
    "genres": [
      "Action"
    ],
    "short_screenshots": [
      "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg",
      "https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg",
    ],
    "price": "41.32",
    "__v": 0
  },
  {
    "_id": "6798e02247cb59d01938c2d5",
    "name": "The Witcher 3: Wild Hunt",
    "released": "2015-05-18",
    "background_image": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "genres": [
      "Action",
      "RPG"
    ],
    "short_screenshots": [
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
      "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg",
    ],
    "price": "54.55",
    "__v": 0
  }
]
```

### **2. Get specific game**

#### `GET /api/games/:game`
Returns a list of game titles that match the `game` query parameter.

#### **Query Parameters (optional)**
| Parameter | Type   | Description                              |
|-----------|--------|------------------------------------------|
| `game`    | String | Title to be searched              |

#### **Example Request**

GET /api/games/red%20dead

#### **Example Response**
```json
[
  {
    "_id": "6798e02247cb59d01938c2e3",
    "name": "Red Dead Redemption 2",
    "released": "2018-10-26",
    "background_image": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    "genres": [
      "Action"
    ],
    "short_screenshots": [
      "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
      "https://media.rawg.io/media/screenshots/7b8/7b8895a23e8ca0dbd9e1ba24696579d9.jpg",
    ],
    "price": "38.80",
    "__v": 0
  }
]
```

### **3. Get cart items**
#### `GET /api/cart`
Returns a list of all games currently at the cart.

### **4. Add a game to the cart**
#### `POST /api/cart`
Adds a game to the cart. A game id must be sent in the request body:

```json 
  {
    id: "6798e02247cb59d01938c2e3"
  }
```

### **5. Get the number of games in the cart**
#### `GET /api/cart/cart`
Returns the total number of items in the cart.

#### **Example Request**

GET /api/games/count

#### **Example Response**
```json
{
  items: 3
}
```

### **6. Remove an item from the cart**
#### `DELETE /api/cart/:id`
Removes a game from the cart based on the provided id.

#### **Example Request**

GET /api/cart/6798e02247cb59d01938c2e3

### **7. Clear the cart**
#### `DELETE /api/cart`
Removes all games from the cart.







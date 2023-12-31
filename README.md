﻿# InstagramClone-backend



# Backend

This is the backend code for a web application. It is built using Node.js, Express.js, and MongoDB.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd backend`
3. Install the dependencies: `npm install`

## Configuration

1. Create a `keys.js` file in the root directory.
2. Inside `keys.js`, define the following key-value pairs:
   - `mongourl`: MongoDB connection URL
   - `Jwt_secret`: Secret key for JSON Web Token (JWT) authentication

## Starting the Server

Run the following command to start the server:

```
npm start
```

The server will run on `http://localhost:5000`.

## Routes

The backend provides the following routes:

- `POST /signup`: User registration. Requires the following fields in the request body: `name`, `username`, `email`, `password`.
- `POST /signin`: User login. Requires the following fields in the request body: `email`, `password`.
- `GET /user`: Get user details. Requires a valid JWT token in the request headers.
- `GET /user/:id`: Get user details by ID. Requires a valid JWT token in the request headers.
- `PUT /follow`: Follow a user. Requires a valid JWT token in the request headers and the `followId` of the user to follow in the request body.
- `PUT /unfollow`: Unfollow a user. Requires a valid JWT token in the request headers and the `followId` of the user to unfollow in the request body.
- `PUT /uploadProfilePic`: Upload a user's profile picture. Requires a valid JWT token in the request headers and the `pic` data in the request body.
- `GET /allposts`: Get all posts. Requires a valid JWT token in the request headers.
- `POST /createPost`: Create a new post. Requires a valid JWT token in the request headers and the `body` and `pic` data in the request body.
- `GET /myposts`: Get posts created by the logged-in user. Requires a valid JWT token in the request headers.
- `PUT /like`: Like a post. Requires a valid JWT token in the request headers and the `postId` of the post to like in the request body.
- `PUT /unlike`: Unlike a post. Requires a valid JWT token in the request headers and the `postId` of the post to unlike in the request body.
- `PUT /comment`: Add a comment to a post. Requires a valid JWT token in the request headers, the `postId` of the post, and the `text` of the comment in the request body.
- `DELETE /deletePost/:postId`: Delete a post. Requires a valid JWT token in the request headers and the `postId` of the post to delete as a route parameter.
- `GET /myfollowingpost`: Get posts from users followed by the logged-in user. Requires a valid JWT token in the request headers.

Note: Some routes require authentication using a JSON Web Token (JWT). Make sure to include the JWT token in the request headers for authenticated routes.

## Contributing

Contributions are welcome! If you find any issues or would like to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.

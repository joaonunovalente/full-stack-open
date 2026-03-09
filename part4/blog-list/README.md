# Blog list

## Exercise 4.1 - Blog List, step 1

Create a index.js file.

```bash
npm init
npm install express mongoose
```

- http://localhost:3003/api/blogs

Create a requests folder for different requests:

- GET
- POST

Example of a POST request.

```json
POST http://localhost:3003/api/blogs
Content-Type: application/json

{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "url": "https://the-hobbit.com",
  "likes": 15
}
```

### MongoDB

I used the same databased, but for a different App.

```bash
mongodb+srv://<username>:<password>@<username>.2k5dikm.mongodb.net/bloglistApp?retryWrites=true&w=majority&appName=<username>
```

### Lint

I use the config file from the previous exercise.


```bash
npm install eslint @eslint/js --save-dev
npm install globals --save-dev
npm run lint
```

### .gitignore

The gitignore file has the following ignored folder:

```bash
/node_modules
```

## Exercise 4.2 - Blog List, step 2

1. Install dotenv and add the variables PORT and MONGODB_URI to it.
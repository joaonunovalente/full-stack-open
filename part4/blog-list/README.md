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

### .gitignore

Add .env to .gitignore.

```bash
/node_modules
.env
```

### Environmental Variables

1. Install dotenv.

```bash
npm install dotenv
```

2. Make .env file and add the variables PORT and MONGODB_URI to it.

```bash
MONGODB_URI=mongodb://localhost/bloglist
PORT=3003
```

3. Create **config.js** in *utils* folder

### Schema

Refactor the code into *./models/blog*.

### app

Create *app.js* and refactor *index.js*.

### Router

Create a _blogs.js_ in a folder called _controllers_ to control the paths requests.

## Exercise 4.3: Helper Functions and Unit Tests, step 1

Add *dummy.test.js* and *list_helper* files and changed the *package.json* to include `"test": "node --test"`.

## Exercise 4.4: Helper Functions and Unit Tests, step 2

`totalLikes()` function was created with the 3 tests that passed: .

## Exercise 4.6: Helper Functions and Unit Tests, step 4

I installed Lodash.

```
npm i --save lodash
```

I imported it via `var _ = require('lodash');`.

`mostBlogs()` function was created and I used ChatGPT to it. Iniatially it outputed:

```
["J.R.R. Tolkien", 2]
```

I then put the result in a dictionary.

```
const [author, number_of_blogs] = result
return {
  'author': author,
  'blogs': number_of_blogs
}
```

## Exercise 4.7: Helper Functions and Unit Tests, step 5

Same as the previous exercise.

```
> blog-list@1.0.0 test
> node --test

▶ dummy
  ✔ 'dummy' returns one. (1.132126ms)
✔ dummy (2.691888ms)
▶ Favorite blog:
  ✔ returns the blog with most likes (2.46246ms)
✔ Favorite blog: (4.31047ms)
▶ Most blogs:
  ✔ returns the blog top author and its number of blogs (3.824234ms)
✔ Most blogs: (5.55688ms)
▶ Most likes:
  ✔ returns the author whose blog posts have the largest amount of likes (3.098279ms)
✔ Most likes: (4.655561ms)
▶ Total likes:
  ✔ of empty list is zero (0.97047ms)
  ✔ when list has only one blog, equals the likes of that (0.196543ms)
  ✔ of a bigger list is calculated right (0.256423ms)
✔ Total likes: (3.071798ms)
ℹ tests 7
ℹ suites 5
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 157.479338

```
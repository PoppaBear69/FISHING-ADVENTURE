# The JAMStack, AJAX and Static Site Generation

<!-- ## Homework

- create your own New York Times developer account and use it to customize your Ajax page -->

## Reading

- watch this video on [Fetch](https://youtu.be/Oive66jrwBs)
- watch this video on [Eleventy](https://11ty.rocks)

## Recomended 11ty Resources

- [11ty](https://www.11ty.dev/)
- [11ty Rocks](https://11ty.rocks)
- an extensive [11ty](https://learn-eleventy.pages.dev) course

## Goals

- introduce static site generation (SSG) with eleventy (11ty)
- introduce the Markdown language
- use templates and markdown to generate a web site
- introduce templating languages (Liquid) and YAML

<!-- The [site we are creating](https://heuristic-morse-711174.netlify.app/). -->

## Static Site Generation

### The JAMstack

A "stack" is a collection of software used to solve a common problem. In web development common stacks include MEAN (MongoDB, ExpressJS, Angular and Node), MERN (MongoDB, ExpressJS, React and Node) and LAMP (Linux, Apache, MySQL, and PHP).

The [JAMstack](https://jamstack.org) is an architecture that uses a build process to create web pages and sites that are deployed to a content delivery network.

Recall the [design patterns](https://github.com/front-end-foundations/FlexNav#aside---design-patterns) we examined previously. JAMstack sites are the simplest and most traditional - static HTML pages - but they way they are created is thoroughly modern.

### Eleventy

As we just learned, JAMstack sites use pre-rendering tools that use a build process to create the multiple pages that comprise a web site.

[Eleventy](https://www.11ty.io/) (aka 11ty) is a simple [static site generator](https://jamstack.org/generators/) (SSG). SSG websites are very popular due to their simplicity, superior speed, SEO and security.

The benefits of 11ty over other completing generators include the fact that it is written in JavaScript (Node) and its simplicity. 

### Initial Setup

<!-- Today we're are building a simple multipage [static website](https://zealous-kilby-113356.netlify.com) with an [ajax connection](https://zealous-kilby-113356.netlify.com/posts/ajax/) that fetches articles from the New York Times. -->

Note the `.gitignore` file at the top level targeting the node_modules folder:

```sh
node_modules
```

```sh
$ npm init -y
$ npm install @11ty/eleventy
```

Add a script to `package.json`:

```js
"scripts": {
  "start": "eleventy --serve"
},
```

Note the `.prettierignore`:

```
# Ignore artifacts:
build
coverage

# Ignore all readme files:
readme.md
```

Since 11ty converts Markdown files to HTML we need to either delete the readme.md file in this repo or create an `.eleventyignore` file with the contents `readme.md`. Here's the [documentation](https://www.11ty.dev/docs/ignores/) for Eleventy ignore files.

### Eleventy Configuration

Add [passthroughs](https://www.11ty.dev/docs/copy/) for our static assets in an `.eleventy.js` file.

```js
module.exports = function (config) {
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/img/");
  config.addPassthroughCopy("./src/js/");
};
```

This is our eleventy configuration file. It is a function that exports its contents for use by the Eleventy publishing system.

Add instructions for input and output folders:

```js
module.exports = function (config) {
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/img/");
  config.addPassthroughCopy("./src/js/");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
```

Run `npm start` and open the localhost address in Chrome.

Note:

- the generated `_site` folder
- the folders specified in our config are copied into `_site`

Add the `_site` folder to the `.gitignore` file:

```txt
node_modules
_site
```

### Markdown

Create `src/index.md` on the top level with the following text:

```md
## Articles

A list of articles will appear here
```

Note the conversion to HTML.

### Create a Layout Template

[Reference](https://www.11ty.io/docs/layouts/)

Create `src/_includes/layout.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/styles.css" />
    <title>My Blog</title>
  </head>
  <body>
    <main tabindex="-1" class="content">
      <h1>{{ pageTitle }}</h1>
      {{ content }}
    </main>
  </body>
</html>
```

Note the `{{ pageTitle }}` and `{{ content }}` template regions. Our content will be inserted there.

Eleventy supports [many](https://www.developerdrive.com/best-javascript-templating-engines/) templating languages:

- [Pug](https://pugjs.org/api/getting-started.html)
- [Handlebars](https://handlebarsjs.com)
- [Moustache](https://github.com/janl/mustache.js/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)

If template languages are new to you don't worry, they are generally quite simple, resemble JavaScript and can be mastered easily.

We'll use [Liquid](https://shopify.github.io/liquid/) today. Liquid is the in-house templating language created and maintained by Shopify.

Add a new block at the top of `index.md`:

```md
---
layout: layout.html
pageTitle: New York Today
---

## Articles

A list of articles will appear here
```

The material at the top between the `---`'s is commonly called [front matter](https://www.11ty.io/docs/data-frontmatter/) and is written in [YAML](https://yaml.org/) (YAML Ain't Markup Language). YAML is typically used for processing instructions.

Add more content:

```md
---
layout: layout.html
pageTitle: New York Today
---

## Articles

> Dorothy followed her through many of the beautiful rooms in her castle.

A list of articles will appear here

- bullet one
- etc
```

The index file we created has been merged with `_includes/layout` because of the `layout: layout.html` front matter instruction.

Now that the page is linked to our template - `layout.html` - it includes the `<h1>` tag referenced there `<h1>{{ pageTitle }}</h1>`.

`layout.html` uses a [liquid](https://shopify.github.io/liquid/basics/introduction/) snippet. We will be using a handful of these.

Because the `_site` folder is generated by eleventy we can add it to our `.gitignore`.

### 1.6.1. Markdown

[Markdown](https://www.markdownguide.org/getting-started/) is an extremely simple language used extensively in web development.

It allows you to create content using an easy-to-read, easy-to-write plain text format. It converts to structurally valid HTML. Invented by [John Gruber](https://daringfireball.net/projects/markdown/) - it (or one of its many [flavors](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)) is ubiquitous in web publishing. This readme file is written in [markdown](https://www.markdownguide.org/basic-syntax#code).

Note: many of the conventions for Markdown arose from how people used email when it was confined to simple text documents, e.g. a bulleted list:

```txt
- item one
- item two
- item three
```

### 1.6.2. Create a Collection

We wll create a collection of pages using [tags](https://www.11ty.io/docs/collections/) in our front matter.

In a new pages folder, `pages/about.md`:

```md
---
layout: layout.html
pageTitle: About Us
tags: page
navTitle: About
---

## We are

- a group of commited citizens
- a caring community
- a force in national politics

We are New Yorkers.

[Home](/)
```

Note:

- the changes in the `_site` folder (navigate to `http://localhost:8080/pages/about/`)
- the transformation of markdown to HTML (examine the HTML in dev tools)

Create a navbar in `layout.html`:

```html
<nav>
  <ul>
    {% for page in collections.page %}
    <li>{{ page.data.navTitle }}</li>
    {% endfor %}
  </ul>
</nav>
```

Add a tag and nav title to index.md:

```md
---
layout: layout.html
pageTitle: New York Today
navTitle: Home
tags: page
---
```

You should see a list of navTitles at the top.

The front matter `navTitle` and `tags` in our two pages are used in the template's navbar.

Add anchor tags to the template:

```html
<nav>
  <ul>
    {% for page in collections.page %}
    <li>
      <a href="{{ page.url | url }}">{{ page.data.navTitle }}</a>
    </li>
    {% endfor %}
  </ul>
</nav>
```

Let's a few more pages to the pages folder:

`contact.md`:

```md
---
layout: layout.html
pageTitle: Contact Us
tags: page
navTitle: Contact
---

## Here's how:

- 917 865 5517

[Home](/)
```

And `pictures.md`:

```md
---
pageTitle: Apples
navTitle: Pictures

---

![alt info goes here](/img/apples.png)
```

Link it to the template, add a tag and multiple images:

```md
---
layout: layout.html
pageTitle: Apples
navTitle: Pictures
tags: page
singleImage: /img/apples.png
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

![alt info goes here]( {{ singleImage }} )
```

Examine the image options:

```md
---
layout: layout.html
pageTitle: Apples
navTitle: Pictures
tags: page
singleImage: /img/apples.png
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

## Markdown, single image:

![alt info goes here]( {{ singleImage }} )

## HTML, single image:

<img src="{{ singleImage }}" alt="info goes here" style="transform: scale(50%) rotate(20deg);" />

## Markdown in Liquid for loop:

{% for filename in images %}
![alt info goes here](/img/{{ filename }})
{% endfor %}

## HTML in Liquid for loop:

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." />
{% endfor %}
```

Note the use of HTML in the Markdown file.

Navigate to `http://localhost:8080/pages/pictures/`

We can use the front matter to define a class for this page.

Add the following to the `pictures.md` front matter:

```txt
pageClass: pictures
```

```html
<body class="p-{{ pageClass }}">
    <nav>
      <ul>
        {% for page in collections.page %}
        <li class="t-{{page.data.pageClass}}">
          <a href="{{ page.url | url }}">{{ page.data.navTitle }}</a>
        </li>
        {% endfor %}
      </ul>
    </nav>
```

```css
nav ul {
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
}

nav ul a {
  padding: 0.5rem 1rem;
}

nav a:hover,
.p-home .t-home a,
.p-about .t-about a,
.p-pictures .t-pictures a,
.p-contact .t-contact a {
  background-color: #007eb6;
  color: #fff;
  border-radius: 4px;
}
```

Add the following to the template's body tag:

```html
<body class="{{ pageClass }}">
```

Now we can address any element on the page using our style sheet:

```css
.pictures img {
  max-width: 50%;
}
.pictures h1 {
  color: rgb(11, 123, 11);
}
```

### Data Folder

11ty allows you to create a `_data` folder which can then be used to store information you need for your site.

Create a `_data` folder in `src` and add `site.json` with the following json:

```js
{
  "siteTitle": "My first 11ty Site"
}
```

Then use it in your template:

```html
<title>{{site.siteTitle}}</title>
```

#### Tagged Collections

[Collections](https://www.11ty.io/docs/collections/) use tags to group content.

Note: you can use multiple tags, e.g.:

```md
---
layout: layout.html
pageTitle: Contact Us
tags:
  - page
  - contact
navTitle: Contact
---
```

Tags can be written

`tags: page` or

`tags: [page]`

i.e. if you need multiple tags use: `tags: [page, other]`.

Here's the tagging [documentation](https://www.11ty.io/docs/collections/#tag-syntax).

#### HTML and Markdown

As noted, you can use HTML in a markdown file.

Change `contact.md`:

```html
---
layout: layout.html
pageTitle: Contact Us
tags: page
navTitle: Contact
---

<h2>Here's how:</h2>

<ul>
  <li>917 865 5517</li>
</ul>

<a href="/">Home</a>
```

You can use HTML files alongside markdown.

Change the name of `contact.md` to `contact.html`.

Note that you cannot use markdown in an HTML file.

### Simplify the Posts Collection

You can use json to simplify data management.

We will add additional tags that can be used to reorganize content.

Create `pages/pages.json`:

```js
{
	"layout": "layout.html",
	"tags": ["page", "nav"]
}
```

Note: it might be necessary to restart 11ty.

Any document in the pages folder will inherit these properties. We can now remove the `tags` and `layout` metadata from all files in the pages directory.

E.g.: `pages/about.md`:

```md
---
pageTitle: About Us
navTitle: About
pageClass: about
---

## We are

- a group of commited citizens
- a caring community
- a force in national politics

We are New Yorkers.

```

Perform the same deletions on all files in `pages`.

Let's use the `page` collection to display all the posts.

In `index.md` :

```md
---
layout: layout.html
pageTitle: New York Today
tags: page
navTitle: Home
---

## Articles

{% for page in collections.page %}
  <h2><a href="{{ page.url }}">{{ page.data.pageTitle }}</a></h2>
  <em>{{ page.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

Note: the `|` character in `post.date | date: "%Y-%m-%d"` is a filter.

There are quite a number of [available filters](https://help.shopify.com/en/themes/liquid/filters) for example: `upcase`:

```html
{% for page in collections.page %}
<h2><a href="{{ page.url }}">{{ page.data.pageTitle | upcase }}</a></h2>
<em>{{ page.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

### Commit and Deploy

Commit your changes, merge them into the main branch and push your site to a new Github repository.

Sign into Netlify and create a new site from Git. Check the settings to ensure that Netlify has auto detected 11ty and deploy the site.

Examine the deploy logs. Note that Netlify will download and install 11ty in order to generate your `_site` folder and deploy that folder to a web server.

## Fetch 

Fetch allows you to get data from your own or another's service. Web services expose data in the form of an API which allow you to get, delete, update or create data via [routes](http://jsonplaceholder.typicode.com/).

Today, we will get data from the New York Times and display it on our home page.

Edit `index.md` in VS Code:

```md
---
layout: layout.html
pageTitle: New York Today
pageClass: home
---

## Articles

<button>Show Stories</button>
```

Add a hard coded link to the page in the template:

```html
<nav>
  <ul>
    <!-- NEW -->
    <li><a href="/">Home</a></li>
    {% for page in collections.page %}
    <li>
      <a href="{{ page.url | url }}">{{ page.data.navTitle }}</a>
    </li>
    {% endfor %}
  </ul>
</nav>
```

The `fetch()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) takes one mandatory argument, the path to the resource you want to fetch. It returns something known as a Promise that returns a response after the content is received.

_API_ stands for [Application Programming Interface](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82).

### 1.8.2. Rest API

We need data we can fetch from the internet. We'll start with the [Typicode](http://jsonplaceholder.typicode.com/) playground. Note that you can do more than just get data, you can also post, create, delete and update data. Together these functions are often refered to as `CRUD`.

Open a console in the browser.

A promise:

```js
fetch('https://jsonplaceholder.typicode.com/posts')
```

A resolved promise using `.then`:

<!-- ```js
fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
``` -->

```js
fetch('https://jsonplaceholder.typicode.com/posts')
.then(function(response){
  return response.json()
})
```

Since the promise is resolved you can see the actual data in the console. It returns an array of 100 fake posts which we can console.log:

<!-- ```sh
fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(data => console.log(data))
``` -->

```js
fetch('https://jsonplaceholder.typicode.com/posts')
.then(
  function(response){
  return response.json()
})
.then(
  function(data){
  console.log(data)
});
```

```sh
fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(data => console.log( data.map( item => `<h2>${item.title}</h2>` )))
```

You can see the same data if you travel to `https://jsonplaceholder.typicode.com/posts/` in a new tab. Try [other resources](http://jsonplaceholder.typicode.com/) such as comments or photos.

Note the basic structure - an array of objects:

```js
[
  { ... },
  { ... }
]
```

The format is json - [JavaScript Object Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

Let's start out our script with event delegation.

In layout.html:

`<script src="/js/scripts.js"></script>`

In `scripts.js`:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  console.log(event.target);
}
```

Use [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) in the context of in `if` statement to run a function:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => console.log(json));
}
```

Instead of logging the data we will call another function:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => showData(data));
}

function showData(data) {
  document.querySelector(".stories").innerText = data[1].body;
}
```

Be sure to add an empty element to the home page:

```html
<main class="stories"></main>
```

Note:

- `document.querySelector(".stories")` - targets an empty div
- `data[1]` - we use `[1]` to get the second entry
- `data[1].body` - we use dot notation to access just one of the properties of the object


`document.querySelector(".stories").innerText = data;` WONT WORK

Demo : a quick tour of the network panel in Chrome's dev tools.

```js
function showData(data) {
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    console.log("foo::", i, data[i]);
  }

  document.querySelector(".stories").innerText = data;
}
```

```js
function showData(data) {
  console.log(data);

  let content = "";

  for (let i = 0; i < data.length; i++) {
    console.log("foo::", i, data[i]);
    content += data[i].title;
  }

  document.querySelector(".stories").innerText = content;
}
```

```js
  for (let i = 0; i < data.length; i++) {
    console.log("foo::", i, data[i]);
    content += `<h3>${data[i].title}</h3>`;
  }
```

Use `innerHTML`: `document.querySelector(".stories").innerHTML = content;`

```js
for (let i = 0; i < data.length; i++) {
  console.log("foo::", i, data[i]);
  content += `<h3>${data[i].title}</h3><p>${data[i].body}</p>`; // new
}
```

With a `for of` loop:

```js
  for (let post of data) {
    console.log("foo::", post);
    content += `<h3>${post.title}</h3><p>${post.body}</p>`; // new
  }
```

With array.map():

```js
function showData(data) {
  let content = data.map((post) => `<h3>${post.title}</h3><p>${post.body}</p>`);

  document.querySelector(".stories").innerHTML = content;
}
```

## Local JSON Server

Use the db directory to start a server.

Create a form to create a new employee.

## New York Times API

Let's use the New York Times [developers](https://developer.nytimes.com/) site for our data.

```js
document.addEventListener("click", clickHandlers);

// store the link plus the API key in a variable
const API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=RuG9N6lD1Xss81PdRbmhuiJHjuiPEt6R";

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data));
}

function showData(data) {
  console.log(data);
}
```

Examine the nature of the returned data in the console. The `results` property contains the data we are interested in.

```js
function showData(data) {
  console.log(data.results);
}
```

### 1.8.3. Looping

```js
document.addEventListener("click", clickHandlers);

var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=RuG9N6lD1Xss81PdRbmhuiJHjuiPEt6R";

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  console.log(stories[0].title);
  // initialize an empty string
  var looped = "";
  // use += in a for loop that uses the length of the results
  for (let story of stories) {
    console.log(story);
    looped =
      looped +
      `
      <div class="item">
        <h3>${story.title}</h3>
        <p>${story.abstract}</p>
      </div>
      `;
  }
  console.log(looped);
}
```

Here's the script so far:

```js
document.addEventListener("click", clickHandlers);

var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=RuG9N6lD1Xss81PdRbmhuiJHjuiPEt6R";

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = "";
  for (let story of stories) {
    looped += `
      <div class="item">
        <h3>${story.title}</h3>
        <p>${story.abstract}</p>
      </div>
      `;
  }

  document.querySelector(".stories").innerHTML = looped;
}
```

An alternative method: use the `map()` method on the array:

```js
document.addEventListener("click", clickHandlers);

var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=RuG9N6lD1Xss81PdRbmhuiJHjuiPEt6R";

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = stories
    .map(
      (result) => `
    <div class="item">
      <h3>${result.title}</h3>
      <p>${result.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
}
```

Add CSS to format the data:

```css
@media (min-width: 480px) {
  .stories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }
}

.stories .item {
  border-bottom: 1px dashed #aaa;
}
```

Remove the button:

```md
---
layout: layout.html
pageTitle: New York Today
---

## Articles

<div class="stories"></div>
```

And the script's dependency on it:

```js
var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=RuG9N6lD1Xss81PdRbmhuiJHjuiPEt6R";

function getStories(event) {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = stories
    .map(
      (result) => `
    <div class="item">
      <h3>${result.title}</h3>
      <p>${result.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
}

getStories();
```

Add elements from the API:

```js
function showData(stories) {
  var looped = stories
    .map(
      (story) => `
    <div class="item">
    <picture>
    <img src="${story.multimedia[2].url}" alt="" />
    <caption>${story.multimedia[2].caption}</caption>
    </picture>
      <h3><a href="${story.url}">${story.title}</a></h3>
      <p>${story.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
}
```

[MDN picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)

The script will error on all pages other than the home page.

Add a page class and make getStories run only when that class is present on the page.

```md
---
layout: layout.html
pageTitle: New York Today
pageClass: home
---

## Articles

<div class="stories">Loading...</div>
```

```js
if (document.querySelector(".home")) {
  getStories();
}

```


### 1.8.4. Second Deploy

Commit, merge and push the content to Github. Log in to [app.netlify.com](https://app.netlify.com) and ensure that the deploy has succeeded.

## 1.9. Notes



### Create a blog (`pages/blog.md`):

```md
---
pageTitle: Blog
navTitle: Blog
---

## My Blog

{% for post in collections.post %}

<h2><a href="{{ post.url }}">{{ post.data.pageTitle }}</a></h2>
<em>{{ post.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

`src/posts/posts.json`:

```js
{
  "layout": "layout.html",
  "tags": ["post"]
}
```

Dogs:

```md
---
pageTitle: Dogs
---

## Dawgs

![Cute!](https://place-puppy.com/300x300)
```

Cats:

```md
---
pageTitle: Cats
---

## Cats

![Cute!](http://placekitten.com/200/300)
```

## Generate pages from the NYT feed

Adding rendered articles

`$ npm i node-fetch`

`/_data/articles.js`

```js
const fetch = require("node-fetch");

API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=RuG9N6lD1Xss81PdRbmhuiJHjuiPEt6R";

module.exports = function () {
  return new Promise((resolve, reject) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => resolve(data.results))
      .catch((e) => reject(e));
  });
};
```


`/src/articles.liquid`

```
---
tags: articles
layout: layout.html

pagination:
    data: articles
    size: 1
    alias: article
permalink: "article/{{ article.title | slug }}/"
---

<h2>{{ article.title }} </h2>

<p>{{ article.abstract }}</p>

```

`/src/pages/articles.md`

```md
---
pageTitle: Articles
navTitle: Articles
---

## Articles from file system

{% for article in articles %}

<p><a href="/article/{{ article.title | slug }}/">{{ article.title }}</a></p>
{% endfor %}
```


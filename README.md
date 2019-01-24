# Example Univeral React App

## What is a Universal/Isomorphic App?

An application which uses the same JavaScript code (more or less) to provide server and client side renders which are the same in either place.  Using this method, you can provide functional server renders for user agents with disabled javascript and engage in progressive enhancement to allow additional javascript functionality.

You might see benefits in performance, seo, and general usability.

## What do we need?

### A client file
An entry point client file into a root.

```
import React from 'react';
import ReactDOM from 'react-dom';
import ExamplePage from './containers/ExamplePage';

const reactRoot = window.document.getElementById('react-root');
window.global = window;

ReactDOM.render(<ExamplePage />, reactRoot);
```

### A server
A server which renders a page shell with a root, the generated client script, and maybe meta data.  It should also be able to provide access to the generated client script.


```
import Hapi from 'hapi';
import React from 'react';
import Inert from 'inert';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import ExamplePage from './containers/ExamplePage';

const server = Hapi.server({
    port: 8000,
    host: 'localhost',
});

async function init() {
    try {
        await server.register(Inert);

        server.route([
            {
                method: 'GET',
                path: '/',
                handler: (request, h) => {
                    const sheet = new ServerStyleSheet();
                    const markup = renderToString(sheet.collectStyles(<ExamplePage />));
                    return `
                        <!doctype html>
                        <html>
                            <head>
                                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                                ${sheet.getStyleTags()}
                            </head>
                            <body>
                                <div id="react-root">
                                    ${markup}
                                </div>
                                <script src="/dist/client.js"></script>
                            </body>
                        </html>
                    `;
                }
            },
            {
                method: 'GET',
                path: '/dist/{param*}',
                handler: {
                    directory: {
                        path: path.join(__dirname, '../dist'),
                    },
                },
            },
        ]);

        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch (error) {
        console.log(`Server failed to start`, { error });
    }
}

process.on('unhandledRejection', error => {
    console.log({ error });
    process.exit(1);
});

init();
```

### What do we do?
Given a path, the server and the client should render the same application into the react root.

In our example, we have a simple container using some react-bootstrap components that we will load on both the server and the client.

```
import React from 'react';
import {
  Carousel,
  MenuItem,
  Nav,
  NavDropdown,
  NavItem,
  Navbar,
} from 'react-bootstrap';
import styled from 'styled-components';

const CarouselWrap = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const ExamplePage = () => (
  <React.Fragment>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Example App
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
          <NavItem href="#">
            Example Link
          </NavItem>
          <NavItem href="#">
            Example Link
          </NavItem>
          <NavDropdown title="Example Dropdown" id="example-dropdown">
            <MenuItem>Item #1</MenuItem>
            <MenuItem>Item #2</MenuItem>
            <MenuItem>Item #3</MenuItem>
            <MenuItem>Item #4</MenuItem>
          </NavDropdown>
        </Nav>
    </Navbar>
    <CarouselWrap>
      <Carousel>
        <Carousel.Item>
          <img width={500} height={500} alt="First Kitten" src="https://placekitten.com/500/500" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={500} alt="Second kitten" src="https://placekitten.com/502/501" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={500} alt="Third kitten" src="https://placekitten.com/500/502" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </CarouselWrap>
  </React.Fragment>
);

export default ExamplePage;
```

## Trying out the application

We've set up a few npm scripts in our package.json.

### Building the Client File

Use `npm run build-client` to generate a client file in dist/client.js.  Using webpack, we bundle together our client entry point and its dependencies so that we can serve a single static asset.

### Building the Server File

Use `npm run build-server` to generate a server entry file at dist/client.js.  Using babel, we transpile our code into a version that targets the systems we might run it on.

### Building both the Client and the Server File

Use `npm run build` to execute both `npm run build-client` and `npm run build-server`.

### Running a dev server

Use `npm run dev` to execute `npm run build-client` and then utilize babel-node to start a server listening at http://localhost:8000.

### Running a "production" server

This app will never see production, but:

Use `npm run start` to execute `npm run build` and then start the server from lib/server.js listening at http://localhost:8000.

### What is not included in this example

* An integration with react-router to provide multiple routes that can be loaded isomorphically
* Hot-reloading for development
* Many other exciting things you can do with your application!

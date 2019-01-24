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

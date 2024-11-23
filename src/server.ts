import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const server = express();
const engine = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 */
server.get('/api/**', (request, response) => {
  response.json({ message: 'hello world' });
});

/**
 * Serve static files from /browser
 */
server.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
server.use('/**', (request, response, next) => {
  engine.handle(request)
    .then(res => response ? writeResponseToNodeResponse(res, response) : next())
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const PORT = process.env['PORT'] || 4000;
  server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(server);

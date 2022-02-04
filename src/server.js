const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyle,
  '/success': responses.success,
  '/badRequest': responses.badRequest,
  '/unauthorized': responses.unauthorized,
  '/forbidden': responses.forbidden,
  '/internal': responses.internalError,
  '/notimplemented': responses.notImplemented,
  notFound: responses.notFound,
};

const onRequest = (request, response) => {
  console.log(request);
  
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  if(urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  }
  else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`listening on 127.0.0.1:${port}`);
});
const respondJson = (request, response, status, object) => {
    const headers = {
        'content-type': 'application/json',
    };

    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const success = (request, response) => {
    const object = {
        message: 'this is a successful response',
    };

    respondJson(request, response, 200, object);
};

const badRequest = () => {
    const object = {
        message: 'missing valid query parameter',
        id: 'badRequest',
    };

    respondJson(request, response, 400, object);
};

const unauthorized = () => {
    const object = {
        message: 'missing loggedIn query parameter set to yes',
        id: 'unauthorized',
    };

    respondJson(request, response, 401, object);
};

const forbidden = () => {
    const object = {
        message: 'you dont have access to this content',
        id: 'forbidden',
    };

    respondJson(request, response, 403, object);
};

const internalError = () => {
    const object = {
        message: 'internal server error. something went wrong',
        id: 'internalError',
    };

    respondJson(request, response, 500, object);
};

const notImplemented = () => {
    const object = {
        message: 'a get request for this page has not been implemented yet. check again later for updated content',
        id: 'notImplemented',
    };

    respondJson(request, response, 501, object);
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internalError,
    notImplemented,
};
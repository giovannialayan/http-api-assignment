const respond = (request, response, content, status, type) => {
    response.writeHead(status, { 'content-type': type });
    response.write(content);
    response.end();
};

const success = (request, response, acceptedTypes) => {
    const object = {
        message: 'this is a successful response',
    };

    const status = 200;

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = `
        <responses>
            <message>${object.message}</message>
        </responses>
        `;

        return respond(request, response, responseXML, status, acceptedTypes[0]);
    }

    const jsonString = JSON.stringify(object);

    respond(request, response, jsonString, status, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
    if(params.valid && params.valid === 'true') {
        return success(request, response, acceptedTypes);
    }

    const object = {
        message: 'missing valid query parameter',
        id: 'badRequest',
    };

    const status = 400;

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = `
        <responses>
            <message>${object.message}</message>
            <id>${object.id}</id>
        </responses>
        `;

        return respond(request, response, responseXML, status, acceptedTypes[0]);
    }

    const jsonString = JSON.stringify(object);

    respond(request, response, jsonString, status, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
    if(params.loggedIn === 'yes') {
        return success(request, response, acceptedTypes);
    }

    const object = {
        message: 'missing loggedIn query parameter set to yes',
        id: 'unauthorized',
    };

    const status = 401;

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = `
        <responses>
            <message>${object.message}</message>
            <id>${object.id}</id>
        </responses>
        `;

        return respond(request, response, responseXML, status, acceptedTypes[0]);
    }

    const jsonString = JSON.stringify(object);

    respond(request, response, jsonString, status, 'application/json');
};

const forbidden = (request, response, params, acceptedTypes) => {
    const object = {
        message: 'you dont have access to this content',
        id: 'forbidden',
    };

    const status = 403;

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = `
        <responses>
            <message>${object.message}</message>
            <id>${object.id}</id>
        </responses>
        `;

        return respond(request, response, responseXML, status, acceptedTypes[0]);
    }

    const jsonString = JSON.stringify(object);

    respond(request, response, jsonString, status, 'application/json');
};

const internalError = (request, response, params, acceptedTypes) => {
    const object = {
        message: 'internal server error. something went wrong',
        id: 'internalError',
    };

    const status = 500;

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = `
        <responses>
            <message>${object.message}</message>
            <id>${object.id}</id>
        </responses>
        `;

        return respond(request, response, responseXML, status, acceptedTypes[0]);
    }

    const jsonString = JSON.stringify(object);

    respond(request, response, jsonString, status, 'application/json');
};

const notImplemented = (request, response, params, acceptedTypes) => {
    const object = {
        message: 'a get request for this page has not been implemented yet. check again later for updated content',
        id: 'notImplemented',
    };

    const status = 501;

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = `
        <responses>
            <message>${object.message}</message>
            <id>${object.id}</id>
        </responses>
        `;

        return respond(request, response, responseXML, status, acceptedTypes[0]);
    }

    const jsonString = JSON.stringify(object);

    respond(request, response, jsonString, status, 'application/json');
};

const notFound = (request, response, params, acceptedTypes) => {
    const object = {
        message: 'the page you were looking for was not found',
        id: 'notFound',
    };

    const status = 404;

    if(acceptedTypes[0] === 'text/xml') {
        let responseXML = `
        <responses>
            <message>${object.message}</message>
            <id>${object.id}</id>
        </responses>
        `;

        return respond(request, response, responseXML, status, acceptedTypes[0]);
    }

    const jsonString = JSON.stringify(object);

    respond(request, response, jsonString, status, 'application/json');
}

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internalError,
    notImplemented,
    notFound,
};
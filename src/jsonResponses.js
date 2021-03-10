const calen = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getCalendars = (request, response, params) => {
  const responseJSON = {
    message: 'Name and/or password is incorrect',
  };

  if (calen[params.name] != null && calen[params.name].password === params.password) {
    console.log('success');
      responseJSON.message = 'Success';
      responseJSON.data = calen[params.name];
      return respondJSON(request, response, 200, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const getCalendarsMeta = (request, response) => { respondJSONMeta(request, response, 200); };

const addCalendar = (request, response, body) => {
  const responseJSON = {
    message: 'Name and password is required',
  };

    console.log(body.name);
  if (!body.name || !body.password) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (calen[body.name]) {
    responseCode = 204;
  } else {
    calen[body.name] = {};
  }

  calen[body.name].name = body.name;
  calen[body.name].password = body.password;

  calen[body.name].week = {
    sunday: body.sunday,
    monday: body.monday,
    tuesday: body.tuesday,
    wednesday: body.wednesday,
    thrusday: body.thrusday,
    friday: body.friday,
    saturday: body.saturday,
  };
  console.log(calen);

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getCalendars,
  getCalendarsMeta,
  addCalendar,
  notFound,
  notFoundMeta,
};

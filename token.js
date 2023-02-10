var request = require('request')
var client_id = '6ef23fac780043c9b9671bd4c978fba4';
var client_secret = 'af239a52d2ef47da82593026a5eb4e7e';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body)
  }
});
/**
 * This will hold all api endpoints in a key-value matter
 */

let apiEndpoint;
if ( PRODUCTION )
    apiEndpoint = 'http://';

if ( DEVELOPMENT )
    apiEndpoint = 'http://localhost:7777/';

module.exports = {
    app: apiEndpoint + 'app',
    user: apiEndpoint + 'user'
}

// https://github.com/prograhammer/vue-pizza/wiki/HTTP-Requests
// similiar to how the routes files collects the external API of your app, this would collects the API to your backend

import auth from '@/auth/helpers';

export default {

  // List out all your API requests here.

  getFriends (callback) { auth.get('/response', {}, callback) }
}
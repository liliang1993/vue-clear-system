import fetch from '../utils/ajax.js'

export default {
  getLogins() {
    return fetch.get('/logins');
  }
}

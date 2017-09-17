import server from '../utils/ajax.js'
// console.log('fetch',fetch);
export default {
  getLogins() {
    return server.get('/logins');
  },
  getBridgeRecords(params){
    return server.post('/bridge_record',params);
  }
}

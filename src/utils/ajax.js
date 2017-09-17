// import Vue from 'vue';
// import axios from 'axios';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios, axios);
// import {
//   apiAddress,
//   ajaxConfig
// } from "../config/"
// // 动态设置本地和线上接口域名
// Vue.axios.defaults.baseURL = apiAddress;
// Vue.axios.interceptors.response.use((res) => {

// });
// export default {
//   get: (url, fn, errfn) => {
//     var options = Object.assign(ajaxConfig, {
//       method: 'get',
//       url: url
//     });
//     Vue.axios(options).then((res) => {
//       if (res.status == 200) {
//         fn(res.data);
//       }
//     }).catch((err) => {

//     })
//   },
//   post: (url, data, fn, errfn) => {
//     var options = Object.assign(ajaxConfig, {
//       method: 'post',
//       url: url,
//       data: data
//     });
//     Vue.axios(options).then((res) => {
//       if (res.status == 200) {
//         fn(res.data);
//       }
//     }).catch((err) => {

//     })
//   }
// }
import axios from 'axios'
import qs from 'qs'
import config from "../config/";
console.log('address',config.apiAddress);
// import * as _ from '../util/tool'
axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = config.apiAddress;
 //配置接口地址
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data);
  // }
  return config;
}, (error) => {
  // _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  if (res.data.error_code!==0) {
    // _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  // _.toast("网络异常", 'fail');
  return Promise.reject(error);
});
//返回一个Promise(发送post请求)
export default {
      get: (url) => {
        return new Promise((resolve, reject) => {
          axios.get(url)
            .then(response => {
              resolve(response.data);
            }, err => {
              reject(err);
            })
            .catch((error) => {
              reject(error)
            })
        })
      },
    post: (url, params) => {
        return new Promise((resolve, reject) => {
          axios.post(url, params)
            .then(response => {
              resolve(response.data);
            }, err => {
              reject(err);
            })
            .catch((error) => {
              reject(error)
            })
        })
    }
}

import axios from 'axios'

class Http {

  get(url, data) {
    return this.request(url, data, 'GET');
  }

  post(url, data) {
    return this.request(url, data, 'POST');
  }

  delete(url, data = '') {
    return this.request(url, data, 'DELETE');
  }

  put(url, data) {
    return this.request(url, data, 'PUT');
  }

  request(url, data, method) {
    return new Promise((resolve, reject) => {
      axios({
        url: 'http://laravel.loc/api/' + url, data: data, method: method, headers: {
          // 'Authorization': 'Bearer ',
        }
      })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          });
    });
  }

}


export default Http
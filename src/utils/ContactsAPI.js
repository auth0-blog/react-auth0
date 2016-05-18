import AuthStore from '../stores/AuthStore';
import request from 'superagent/lib/client';

export default {

  // We want to get a list of all the contacts
  // from the API. This list contains reduced info
  // and will be be used in the sidebar
  getContacts: (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  },

  getContact: (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .set('Authorization', 'Bearer ' + AuthStore.getJwt())
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  }
}
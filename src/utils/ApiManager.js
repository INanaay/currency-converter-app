import axios from 'axios';

const apiUrl = 'http://localhost:3000/';

export default {
  // eslint-disable-next-line no-unused-vars
  convertCurrency(from, to, value) {
    const url = `${apiUrl}convert`;
    return axios.get(encodeURI(url), { params:
    {
      base_currency: from,
      value,
      quote_currency: to,


    } }).then(response => response);
  },
};

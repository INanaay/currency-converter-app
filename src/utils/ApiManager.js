import axios from 'axios';

const apiUrl = 'https://shrouded-mountain-35551.herokuapp.com/';

export default {
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

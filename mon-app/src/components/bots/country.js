import axios from 'axios';
import store from '../store';
import { userMessage } from '../actions';

const callApiCountry = (token) => {
  let newToken = {};
  if (token.commande === 'help') {
    const messhelp = 'Hi im bot Country ! I give some information about the country. You just need to put the country (Example : !country France)';
    newToken = { ...token, data: messhelp };
    store.dispatch(userMessage(newToken));
  } else {
    const name = token.commande;
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    axios.get(url).then((response) => {
      const mess = `${response.data[0].name} is a country from ${response.data[0].region}. The capital is ${response.data[0].capital} and has ${response.data[0].population} inhabitants`;
      newToken = { ...token, data: mess };
      store.dispatch(userMessage(newToken));
    }).catch(() => {
      newToken = { ...token, isErrorMessage: true };
      store.dispatch(userMessage(newToken));
    });
  }
};
// message: 'Wrong command type !horos + astrological sign

export default callApiCountry;

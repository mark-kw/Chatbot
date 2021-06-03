import axios from 'axios';
import store from '../store';
import { userMessage } from '../actions';

const callApiHours = (token) => {
  let newToken = {};
  if (token.commande === 'help') {
    const messhelp = 'Hi im bot Hours ! I give you the current time in every country. (Example : !avalre paris)';
    newToken = { ...token, data: messhelp };
    store.dispatch(userMessage(newToken));
  } else {
    const cityId = token.commande;
    const url = `https://timezone.abstractapi.com/v1/current_time/?api_key=ef4e53fa8a714f5ab2fd9f0bd7997d2f&location=${cityId}`;
    axios.get(url).then((response) => {
      const hours = response.data.datetime.split(' ');
      const mess = `It is currently ${hours[1].substring(0, hours[1].length - 3)} in ${cityId} `;
      newToken = { ...token, data: mess };
      store.dispatch(userMessage(newToken));
    }).catch(() => {
      newToken = { ...token, isErrorMessage: true };
      store.dispatch(userMessage(newToken));
    });
  }
};
// message: 'Wrong command type !horos + astrological sign

export default callApiHours;

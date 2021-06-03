import axios from 'axios';
import store from '../store';
import { userMessage } from '../actions';

const callApiHoros = (token) => {
  let newToken = {};
  if (token.commande === 'help') {
    const messhelp = 'Hi im bot Horos ! I give you the horoscope of today, tomorrow or yesterday, you just need to put you sign and the days (Example : !horos leo today) or only the sign and that will give you the horoscop of the day';
    newToken = { ...token, data: messhelp };
    store.dispatch(userMessage(newToken));
  } else {
    let url;
    const param = token.commande.split(' ');
    if (param.length === 2) {
      url = `https://aztro.sameerkumar.website/?sign=${param[0]}&day=${param[1]}`;
    } else {
      const sign = token.commande;
      url = `https://aztro.sameerkumar.website/?sign=${sign}&day=today`;
    }
    axios.post(url).then((response) => {
      newToken = { ...token, data: response.data.description };
      store.dispatch(userMessage(newToken));
    }).catch(() => {
      newToken = { ...token, isErrorMessage: true };
      store.dispatch(userMessage(newToken));
    });
  }
};
// message: 'Wrong command type !horos + astrological sign

export default callApiHoros;

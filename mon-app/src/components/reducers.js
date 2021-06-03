import { actionsType } from './actions';

const initialState = {
  messages: [
  ]
};

// Set le state pour le réutiliser après
const allbotreponse = (newtab, action) => {
  const bots = ['hours', 'horos', 'country'];
  let newMessage;
  let tab = newtab;
  const d = new Date();
  const hours = `${d.getHours()} : ${d.getMinutes()}`;
  bots.forEach((botName) => {
    let mess;
    if (action.message.message.toUpperCase() === 'HELLO') {
      mess = `Hi im bot ${botName}`;
    } else {
      mess = `Im bot ${botName} type !${botName} help to view my command`;
    }
    newMessage = {
      name: botName,
      message: mess,
      sender: 'bot',
      bot: botName,
      heure: hours,
      isErrorMessage: false
    };
    tab = [...tab, newMessage];
  });
  return { ...newtab, messages: tab };
};

const botresponse = (state, newtab, action) => {
  const { messages } = state;
  const d = new Date();
  const hours = `${d.getHours()} : ${d.getMinutes()}`;
  const bot = {
    name: action.message.bot,
    message: action.message.data,
    sender: 'bot',
    heure: hours,
    isErrorMessage: false
  };
  const tab = [...newtab, bot];
  return { ...messages, messages: tab };
};

const addmessage = (state, action) => {
  const d = new Date();
  const hours = `${d.getHours()} : ${d.getMinutes()}`;
  const { messages } = state;
  const newState = [...messages, action.message];
  if (action.message.isErrorMessage) {
    const bot = {
      message: 'Wrong command. Type help or !bot_name help',
      sender: 'bot',
      heure: hours,
      isErrorMessage: false
    };
    const adderrormess = [...newState, bot];
    return { ...messages, messages: adderrormess };
  }
  if (action.message.bot !== 'all') {
    return botresponse(state, newState, action);
  }
  return allbotreponse(newState, action);
};

const data = (state = initialState, action) => {
  // eslint-disable-next-line
  console.log(action);
  switch (action.type) {
    case actionsType.ADD_MESSAGE:
      return addmessage(state, action);
    default:
      return state;
  }
};

export default data;

const createToken = (message) => {
  const mess = message;
  const d = new Date();
  const hours = `${d.getHours()} : ${d.getMinutes()}`;
  let token = {
    name: 'You',
    sender: 'user',
    message: mess,
    bot: 'all',
    heure: hours,
    isErrorMessage: true
  };
  if (message.charAt(0) !== '!') {
    if (message.toUpperCase() === 'HELLO' || message.toUpperCase() === 'HELP') {
      token = {
        name: 'You',
        sender: 'user',
        message: mess,
        bot: 'all',
        heure: hours,
        isErrorMessage: false
      };
      return token;
    }
  } else {
    const newMessage = message.substring(1);
    const tabmess = newMessage.split(' ');
    const array = ['hours', 'horos', 'country'];
    if (array.includes(tabmess[0]) && tabmess.length === 2) {
      token = {
        name: 'You',
        sender: 'user',
        message: mess,
        commande: tabmess[1],
        bot: tabmess[0],
        data: '',
        heure: hours,
        isErrorMessage: false
      };
      return token;
    }
    const time = ['today', 'tomorrow', 'yesterday'];
    if (tabmess[0] === 'horos' && tabmess.length === 3 && time.includes(tabmess[2])) {
      token = {
        name: 'You',
        sender: 'user',
        message: mess,
        commande: `${tabmess[1]} ${tabmess[2]}`,
        bot: tabmess[0],
        data: '',
        heure: hours,
        isErrorMessage: false
      };
      return token;
    }
  }
  return token;
};

export default createToken;

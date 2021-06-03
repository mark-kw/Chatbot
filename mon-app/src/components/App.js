import React from 'react';
import { connect } from 'react-redux';
import { userMessage } from './actions';
import store from './store';
import './App.css';
import createToken from './token';
import callApiHoros from './bots/horos';
import callApiAvalre from './bots/hours';
import callApiCountry from './bots/country';

const App = ({ messages }) => {
  const [input, setInput] = React.useState('');
  const messageToEnd = React.useRef();

  const scrollToBottom = () => {
    messageToEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = createToken(event.target[0].value);
    if (token.bot === 'all') {
      store.dispatch(userMessage(token));
    }
    if (token.bot === 'horos') {
      callApiHoros(token);
    }
    if (token.bot === 'hours') {
      callApiAvalre(token);
    }
    if (token.bot === 'country') {
      callApiCountry(token);
    }
    setInput('');
  };

  const onChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="cont">
      <div className="liste">
        <div className="block">
          <div className="imgbot">
            <img src="https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif" alt="" />
          </div>
          <div className="horos">
            Horos
          </div>
        </div>
        <div className="block">
          <div className="img">
            <img src="https://i.pinimg.com/originals/7d/9b/1d/7d9b1d662b28cd365b33a01a3d0288e1.gif" alt="" />
          </div>
          <div className="horos">
            Hours
          </div>
        </div>
        <div className="block">
          <div className="img">
            <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_800,h_600/https://etmerci.fr/wp-content/uploads/2020/03/robot-steve.gif" alt="" />
          </div>
          <div className="horos">
            Country
          </div>
        </div>
      </div>
      <div className="container">
        <div className="chat">
          <h1>Chat Bot</h1>
          <div className="historyContainer">
            {messages.map((mess) => (
              <div className="messageContainer">
                <div className="botChatImg">
                  {mess.name === 'horos' ? (<img src="https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif" alt="" />) : null }
                  {mess.name === 'hours' ? (<img src="https://i.pinimg.com/originals/7d/9b/1d/7d9b1d662b28cd365b33a01a3d0288e1.gif" alt="" />) : null }
                  {mess.name === 'country' ? (<img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_800,h_600/https://etmerci.fr/wp-content/uploads/2020/03/robot-steve.gif" alt="" />) : null }
                </div>
                <div className={mess.sender} key={Math.random()}>
                  <div>
                    <p><b>{mess.name}</b></p>
                    <p>{mess.message}</p>
                    <span className="time_date">{mess.heure}</span>
                  </div>
                </div>
                <div className="botChatImg">
                  {mess.name === 'You' ? (<img src="https://cdn.dribbble.com/users/253392/screenshots/3008253/1.gif" alt="" />) : null }
                </div>
              </div>
            ))}
            <div ref={messageToEnd} />
          </div>
          <form onSubmit={(event) => handleSubmit(event)}>
            <input type="text" onChange={(event) => onChange(event)} placeholder="Type here to chat!" value={input} />
            <button type="button" variant="primary" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapTopProps = (state) => ({ messages: state.data.messages });

export default connect(mapTopProps)(App);

export const actionsType = {
  CHANGE_COLOR_CONTACT: 'CHANGE_COLOR_CONTACT',
  ADD_MESSAGE: 'ADD_MESSAGE'
};

export const userMessage = (value) => ({
  type: actionsType.ADD_MESSAGE,
  message: value
});

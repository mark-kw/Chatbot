import
{
  createStore, combineReducers
} from 'redux';
import data from './reducers';

const tmp = combineReducers({ data });
const store = createStore(tmp);
export default store;

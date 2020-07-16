import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import clickEvents from './helpers/clickEvents';
import '../styles/main.scss';
import 'bootstrap';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  auth.loginButton();
  auth.logoutEvent();
  clickEvents.allClickEvents();
};

init();

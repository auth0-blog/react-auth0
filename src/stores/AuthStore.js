import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

function setUser(profile, token) {
  if (!localStorage.getItem('id_token')) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', token);
  }
}

function removeUser() {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
}

class AuthStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
  
  isAuthenticated() {
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }
  
  getUser() {
    return localStorage.getItem('profile');
  }
  
  getJwt() {
    return localStorage.getItem('id_token');
  }
}

const AuthStore = new AuthStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
AuthStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
      
    case AuthConstants.LOGIN_USER:
      setUser(action.profile, action.token);
      AuthStore.emitChange();
      break
      
    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emitChange();
      break

    default:
  }

  
});

export default AuthStore;
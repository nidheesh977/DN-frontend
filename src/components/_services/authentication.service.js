import { BehaviorSubject } from 'rxjs';
import axios from 'axios'
import { handleResponse } from '../_helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { 
      return currentUserSubject.value }
};

function login(props, d) { 
    axios.post('https://demo-nexevo.in/haj/auth-app/public/api/auth/login', {
      email: d.email,
      password: d.password
    }).then(res => {      
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token); 
      localStorage.setItem('token_type', res.data.token_type);  
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      } 
      axios.get('https://demo-nexevo.in/haj/auth-app/public/api/auth/public/api/auth/user', config)
        .then(user => {   
            localStorage.setItem('currentUser', JSON.stringify(user.data.role_id));
            currentUserSubject.next(user.data.role_id);  
            return user.data.role_id;
            {res.data.role_id === 1 && 
              props.history.push('/Profile');
            } 
              {res.data.role_id === 2 &&
              props.history.push('/OfficeProfile');
            }
        }) 
    }) 
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

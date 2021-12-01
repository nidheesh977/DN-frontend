import 'react-phone-number-input/style.css' 
import axios from 'axios'   
import { BehaviorSubject } from 'rxjs'; 

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  login, 
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { 
    return currentUserSubject.value }
};
  

// LOGIN  s
function login(props, d) {   
  
  axios.post('http://localhost/auth-app/public/api/auth/login', {
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
      axios.get('http://localhost/auth-app/public/api/auth/user', config)
        .then(user => {    
          // {user.data.role_id === 1 &&   
          // // window.location.replace('/vijay/abctestdfetest#/Profile');   
          // PageRedirect
          // } 
          //   {user.data.role_id === 2 && 
          //   // window.location.replace('/vijay/abctestdfetest#/OfficeProfile');  
          //   PageRedirect

          // }
          localStorage.setItem('currentUser', JSON.stringify(user.data.role_id));
          currentUserSubject.next(user.data.role_id);  
          return user.data.role_id;
        },
          err => { 
            console.log(err); 
            localStorage.clear();
            // startRefreshToken();
          }
        )
    })
      .catch(error => {    
      }); 
      
}
 
           
// LOGOUT
export const logout = () => {
    localStorage.clear();
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    window.location.reload();
}

// LOGIN STATUS
export const isLogin = () => {
    if (localStorage.getItem('access_token') &&  localStorage.getItem('refresh_token') && 
       localStorage.getItem('token_type')) return true; 
    return false;
    
}

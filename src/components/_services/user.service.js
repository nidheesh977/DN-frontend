import handleResponse from '../_helpers/handle-response';
import authHeader from '../_helpers/auth-header';
import axios from 'axios'

export const userService = {
    User,
    Profile,
    Accountsettings,
    Applieddroners,
    Social,
    Email,
    Subscriptioncheck,
    Accountsettings 
};

function User() {
    const requestOptions = { method: 'GET', headers: authHeader()};
    return axios(``, requestOptions).then();
}

function Profile() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return axios(``, requestOptions).then();
}

function Applieddroners() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return axios(``, requestOptions).then();
}

function Email() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return axios(``, requestOptions).then();
}

function Social() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return axios(``, requestOptions).then();
}


function Subscriptioncheck() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return axios(``, requestOptions).then();
}



function Accountsettings() {
    const requestOptions = { method: 'Post', headers: authHeader() };
    return axios(``, requestOptions).then();
}

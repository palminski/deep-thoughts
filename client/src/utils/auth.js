import decode from 'jwt-decode';

class AuthService {
    //retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }
    //check if user logged in
    loggedIn() {
        //check if there is a saved token and if it is still valid
        const token = this.getToken();
        //use type coersion to check if token is NOT undefined and the token is not expired
        return !!token && !this.isTokenExpired(token);
    }

    //check if the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }

    //retrieve token from local storage
    getToken() {
        //retrieves token
        return localStorage.getItem('id_token');
    }

    //set token to local storage and reload to homepage
    login(idToken) {
        localStorage.setItem('id_token',idToken);
        window.location.assign('/');
    }

    // clear token and logout
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();
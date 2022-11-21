const jwt = require('jsonwebtoken');

const secret = 'testsecretjdtyjsrd';
const expiration= '2h';

module.exports = {
    signToken: function({username,email,_id}) {
        const payload = {username, email, _id};
        return jwt.sign({data:payload}, secret, {expiresIn: expiration});
    },
    authMiddleware: function({req}) {
        //allows token to be sent via req.body, querry, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        //seperate bearer from token value
        if (req.headers.authorization) {
            token = token
            .split(' ')
            .pop()
            .trim();
        }
        //if no token return request as is
        if (!token) {
            return req;
        }

        try {
            //decode and atatch user data to request object
            const {data}=jwt.verify(token,secret, {maxAge: expiration});
            req.user = data;
        }
        catch 
        {
            console.log('Invalid Token');
        }
        
        return req;
    }
};
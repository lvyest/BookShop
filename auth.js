const jwt = require('jsonwebtoken'); //jwt 모듈
const dotenv = require('dotenv'); //dotenv 모듈
dotenv.config(); //dotenv 설정

const ensureAuthorization = (req, res) => {
    try {
        let receivedJwt = req.headers["authorization"];
        console.log("receivedJwt:", receivedJwt);

        if(receivedJwt){
            let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
            console.log("decodedJwt:", decodedJwt);

            return decodedJwt;
        } else {
            throw new ReferenceError("jwt must be provided");
        }

    } catch (err) {
        console.log(err.name);
        console.log(err.message);

        return err;
    }

}

module.exports = ensureAuthorization;
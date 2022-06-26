// const { error } = require("../helpers/responseApi")
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {

    const authorizationHeader = req.header("Authorization");

    if(!authorizationHeader){
        console.log("No Auth")
        return res.status(400).json({message: "No authorization token"});
    }
        

    // Split the authorization header value
    const splitAuthorizationHeader = authorizationHeader.split(" ");

    // Get the type of token and actual token
    const bearer = splitAuthorizationHeader[0];
    const token = splitAuthorizationHeader[1];

    // Check the type
    if (bearer !== "Bearer")
        return res
            .status(400)
            .json({message: "TYpe must be abearer"});

    // Check the token
    if (!token) return res.status(404).json(error("No token found"));

    try {
        const jwtData = await jwt.verify(token, 'IAMOLIVER' );

        // Check the JWT token
        if (!jwtData)
            return res.status(401).json({message: "Unauthorized"});

        // If is a valid token that JWT verify
        // Insert the data to the request
        req.user = jwtData.user;

        // Continue the action
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({message: "Unauthorized"});
    }
};
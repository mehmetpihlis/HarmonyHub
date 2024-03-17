import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {

    try {
        // console.log(`DEMO: ${req.headers.authorization}`);
        const accessToken = req.headers.authorization.split(" ")[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log("Burdayımm");
                return res.status(401).json(err);
            }
            console.log("Buradayım222")
            req.creatorId = decoded.id;
            next();
        });
    } catch (error) {
        console.log(error.message);
    }
}

export default auth;
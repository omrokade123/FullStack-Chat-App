import jwt from "jsonwebtoken";
export const genrateToken = (userID,res) => {

    const token = jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, // prevent an XSS attack cross-site scripting attacks
        sameSite: "strict",// CSRF attacks cross-site request foregery attack
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
};
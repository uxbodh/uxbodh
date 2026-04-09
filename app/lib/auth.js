import jwt from "jsonwebtoken";

export function generateToken(user) {
    return jwt.sign(
        { 
            id: user._id, 
            emailId: user.emailId,
            userName: user.userName,
            fullName: user.fullName
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
    );
}

import express from 'express';
import jwt from 'jsonwebtoken';
// in order to generate a token, we need a payload which is why we will pass the user object to this function. The payload will contain the user's id and email. We will use the jsonwebtoken library to generate a token. The token will be signed with a secret key which we will store in an environment variable. The token will expire in 1 hour.
export const generateToken = (user ,res) => {
    // create a token
    const token = jwt.sign({id: user._id , email: user.email}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie("jwt", token , {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // the cookie cannot be accessed by client-side JavaScript
        sameSite: none, // the cookie will be sent in all contexts, i.e. in responses to both same-site and cross-site requests. If you want to restrict the cookie to same-site requests only, you can set this to 'strict' or 'lax'.
        secure: true // the cookie will only be sent over HTTPS in production
    })

    return token;
}


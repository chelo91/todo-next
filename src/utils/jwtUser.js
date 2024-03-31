import jwt from 'jsonwebtoken'
const secretJWT = process.env.SECRET_JWT;

export const getUserInToken = (token) => {
    try {
        const verify = jwt.verify(token, secretJWT);
        return verify.user
    } catch (error) {
        return null
    }
}
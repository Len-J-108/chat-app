import jwt from 'jsonwebtoken';

// JWT sign function
export const createJWT = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: '10d'})
}

export const verifyJWT = (token) => {
    
    const res = jwt.verify(token, process.env.TOKEN_SECRET)
      return res;   
    }


import jwt from 'jsonwebtoken';

// JWT sign function
export const createJWT = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: '10d'})
}

export const verifyJWT = (token) => {
    
    const res = jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenData)=>{
        if (err) return false;
        else {
            console.log({tokenData});
            return true
        }
    })
      return res;   
    }


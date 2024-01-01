export const auth = async (req, res, next) => {
    try{
        const {accessToken} = req.cookies;
        const decoded = verifyJWT(accessToken);
        if (!decoded) { throw new Error('not granted');}
        req.id = decoded.id // send id as req parameter to next middleware
        next();
    } catch(err) {
        res.status(500).json(err.message);
      }
}

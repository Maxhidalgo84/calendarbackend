const jwt = require('jsonwebtoken')

const generateToken = ( uid, name)=>{


        
        const payload = {uid, name}

        
        const token = jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'  
        })

        if(!token){
            return "no se pudo Generar token"
        
        }
        return token

}

module.exports = {
    generateToken

}
const {response} = require('express')
const {validationResult}= require('express-validator')
const bcrypt = require('bcrypt');
const User  = require('../models/User')
const {generateToken} = require('../helpers/jwt')



const createUser = async (req,res = response)=> {
    //console.log(req.body);
    const {email, password} = req.body;
    try {
        
        let user = await User.findOne({email})
        
        if(user){
            return res.status(400).json({
                ok:false,
                msg:"un usuario existe con ese correo"
            })
        }
        
        user = new User(req.body)

        //encrptar pass
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);  
        user.password = hash    

        await user.save()

        //genera JWT 
        const token = generateToken(user.id,user.name)

        //manejo errores
        // const errors = validationResult(req);
        // if(!errors.isEmpty()) {
        //     return res.status(400).json ({
        //         ok:false,
        //         errors: errors.mapped()
        //     })
        // }

        res.status(201).json ({
            ok: true,
            uid: user.id,
            name: user.name,
            token
            // name,
            // email,
            // password
        })
    }catch (error){
        console.log(error);
        res.status(500).json ({
            ok: false,
            msg:'hable con el admin',
        })
    }

}

const loginUser = async (req, res = response)=> {
    
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"el usuario no existe con ese email"
            })
        }
    
    //check pass
    const validPass = bcrypt.compareSync(password, user.password)// true

    if(!validPass){
        return res.status(400).json({
            ok:false,
            msg:"Pass Incorrecto"
        })
    }

    //genera JWT
    const token = generateToken(user.id,user.name)

    res.json({
        ok:true,
        uid: user.id,
        name:user.name,
        token
    })




    }catch(error){
        console.log(error);
        res.status(500).json ({
            ok: false,
            msg:'hable con el admin',
        })
    }

    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     return res.status(400).json ({
    //         ok:false,
    //         errors: errors.mapped()
    //     })
    // }

    // res.json({
    //     ok:true,
    //     msg:'login'
    // })
}

const renewUser =  ( req, res = response) => {

    const uid = req.uid;
  
    //const token = generateToken(uid,name)

    res.json({
        ok:true,
        uid: uid
    })

}


module.exports = {
    createUser,
    loginUser,
    renewUser
}

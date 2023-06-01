const {response} = require('express')
const Event = require("../models/event")
//const {generateToken} = require('../helpers/jwt')


const getEvents = async (req,res = response)=> {

   const events = await Event.find()
   .populate('user','name')

    res.json({
        ok: true,
        events
        })
}


const createEvent = async (req,res = response)=> {

    const event = new Event(req.body)

    try {
       
      //console.log(req.uid);  
      event.user = req.uid; 

      const saveEvent =   await event.save()

      res.json({
        ok:true,
        Event: saveEvent
    })
                
    } catch (error) {
        console.log(error);
        res.status(500).json ({
            ok: false,
            msg:'hable con el admin',
        })
        
    }
}

const updateEvent = async(req,res= response)=> {

    const eventId = req.params.id
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId)

        if(!event){
            res.status(404).json({
            ok:false,
            msg: "evento no existe por ese Id"
            })
    }
    
    if (event.user.toString() !== uid){
        return res.status(401).json({
            ok:false,
            msg: "no tiene permisos"
        })    
    }
    const newEvent = {
        ...req.body,
        user: uid
    }

    const eventupdated = await Event.findByIdAndUpdate(eventId,newEvent)
    
    res.json({
        ok:true,
        msg: "evento actualizado"
    })


    } catch (error) {
            console.log(error);
            res.status(500).json ({
                ok: false,
                msg:'hable con el admin',
            })
        
    }


}

const deleteEvent = async(req,res= response)=> {

    const eventId = req.params.id
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId)

        if(!event){
            res.status(404).json({
            ok:false,
            msg: "evento no existe por ese Id"
            })
    }
    
    if (event.user.toString() !== uid){
        return res.status(401).json({
            ok:false,
            msg: "no tiene permisos"
        })    
    }
    
    await Event.findByIdAndDelete(eventId)
    
    
    res.json({
        ok:true,
        msg: "evento borrado"
    })


    } catch (error) {
            console.log(error);
            res.status(500).json ({
                ok: false,
                msg:'hable con el admin',
            })
        
    }


}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}

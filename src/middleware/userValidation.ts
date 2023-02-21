import { userRequest, userResponse } from "../controllers/userController"

exports.login = (req: userRequest, res: userResponse, next : Function) => {
    const passwordLength = 6
    const body = req.body
    if(!body.email || !body.password ){
        res.status(403).json({ error: "bad request, email or password missing"})
    }
    if(body.email === ""){
        res.status(403).json({error: "email cannot be null"})
    }
    if(body.password.length < passwordLength){
        res.status(403).json({error: `password length must be ${passwordLength}char min`})
    }

    next()
}

exports.signup = (req: userRequest, res: userResponse, next: Function) => {
    const body = req.body
    const passwordLength = 6
    const maxLength = 100

    // check if email and password exist
    if(!body.email || !body.password ){
        res.status(403).json({ error: "bad request, email or password missing"})
    }
    //check if email is empty
    if(body.email === ""){
        res.status(403).json({error: "email cannot be null"})
    }
    // check if password is ok
    if(body.password.length < passwordLength){
        res.status(403).json({error: `password length must be ${passwordLength}char min`})
    }
    //check max length of email and password
    if(body.password.length > maxLength || body.password.length > maxLength) {
        res.status(403).json({error: `email or password length is too important`})
    }

    //check email is valid emailType

    next()
}
import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction)=>{
    const headertoken = req.headers['authorization']
    console.log(headertoken);
    if(headertoken != undefined && headertoken.startsWith('Bearer ')){
        try {
            const token = headertoken.slice(7)
            jwt.verify(
                token, 
                process.env['SECRET_KEY'] || '$78JUJnqH&%Dfnj$D8GXUg'
            );
            next()
        } catch (error) {
            res.status(401).json({
                msg: `Se ha terminado tu sesión`
            })
        }
    } else {
        res.status(401).json({
            msg: `Acceso Denegado`
        })
    }
}

export default validateToken
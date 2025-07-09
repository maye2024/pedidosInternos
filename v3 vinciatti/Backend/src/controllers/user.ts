import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user'
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';


export const getUsers = async(req: Request, res: Response) => {
    const listUsers = await User.findAll();
    res.json({listUsers})
}

export const register = async(req: Request, res: Response): Promise<void> => {
    const {name, lastname, password, email, credential, role} = req.body;

    try {
        const user= await User.findOne({where: { [Op.or]: {email: email, credential: credential}}});

        if(user) {
            res.status(400).json({
                msg: `Usuario ya existe con el email ${email} o el número de identificación ${credential}`
            });
            return;
        }
        console.log("estoy por aquí");
        const passwordHash = await bcrypt.hash(password, 10)
        await User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            role: role,
            status: 1
        });
        res.json({
            msg: `User ${name} ${lastname} create success...`
        });
        } catch (error) {
            console.error("Error en el registro:", error)
            res.status(400).json({
                msg: `Existe un error al crear el usuario ${name} ${lastname}`
            })
        } 
};


export const login = async(req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body
        const user: any = await User.findOne({where: {email: email}})
    
        if(!user){
            res.status(400).json({
                msg: `Usuario no existe con el email =>${email}`
            });
            return;
        }
        
        const passwordValid = await bcrypt.compare(password, user.password);
    
        if(!passwordValid) {
            res.status(400).json({
                msg: `Password Incorrecto => ${password}`
            });
            return;
        }
    
        const token = jwt.sign(
            {
                email: email,
                role: user.role
    
        }, process.env.SECRET_KEY || '$78JUJnqH&%Dfnj$D8GXUg', {
            expiresIn: '1d'
        });
        
        res.json({token})
    } catch(error) {
        console.error("Error en el login", error);
        res.status(500).json({message: "Error interno del servidor"})
    }
    
    // res.json({
    //     msg: `Inicio de sesion exitoso =>`,
    //     body: req.body
    // })
    
}
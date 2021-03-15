import { Request, Response } from 'express';
import dB from '../';
import { compare, genSalt, hash } from 'bcryptjs';
import { User } from '../models/user-models';

export const registerUser = async (req: Request<User>, res: Response) => {
    try {
        const { name, surname, age, biography, location, gender, looking_for, email, password } = req.body;

        if (!email || !password || !name)
            throw Error('İsim, email veya şifre alanları boş bırakılamaz.');

        const tool = (key: number | string) => { return key ? key : null };

        const salt = await genSalt(10);
        const hashedPw = await hash(password, salt);

        const dbResponse = await dB.query(`
            insert into users 
            (name, surname, age, biography, location, gender, looking_for, email, password)
            values
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `, [name, tool(surname), tool(age), tool(biography), tool(location), tool(gender), tool(looking_for), email, hashedPw]);

        if (dbResponse) {
            res.send({
                user: {
                    name, surname, age, biography, location, gender, looking_for, email, hashedPw
                }
            });
        } else
            throw Error('Kayıt sırasında bir hata oluştu, tekrar dene.')

    } catch (error) {
        res.send({
            error: error.message
        })
    }
}
import { IUser, Users } from '../Models/User';
import { Request, Response } from 'express';
import statusCodes from 'http-status-codes';

export async function createUser(req: Request, res: Response) {
    try {
        const { name, address } = req.body;

        const data: IUser = {
            name: name,
            address: address
        }
        const user = await Users.create(data);

        return res.status(statusCodes.OK).json({ st: true, data: user });

    } catch (error: any) {
        console.log(error);
        return res.status(statusCodes.BAD_REQUEST).json({ st: false, msg: error?.message });
    }
}

export async function getUser(req: Request, res: Response) {
    try {
        const { address } = req.body;

        const data = await Users.findOne({ address: address });

        return res.status(statusCodes.OK).json({ st: true, data: data });

    } catch (error: any) {
        return res.status(statusCodes.BAD_REQUEST).json({ st: false, msg: error?.message });
    }
}
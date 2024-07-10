import { IRoom, Room } from '../Models/Room';
import { Request, Response } from 'express';
import statusCodes from 'http-status-codes';

export async function createRoom(req: Request, res: Response) {
    try {
        const { name, address } = req.body;

        const now = new Date().getTime();

        const data: IRoom = {
            creator: address,
            entryFees: 0,
            roomCode: `${String(name).toUpperCase()}${now}`,
            currentTurn: 'BASE_3',
            winnersList: []
        }
        const room = await Room.create(data);

        return res.status(statusCodes.OK).json({ st: true, data: room });

    } catch (error: any) {
        console.log(error);

        return res.status(statusCodes.BAD_REQUEST).json({ st: false, msg: error?.message });
    }
}

export async function getRoom(req: Request, res: Response) {
    try {
        const { roomCode } = req.body;

        const data = await Room.findOne({ roomCode: roomCode });
        return res.status(statusCodes.OK).json({ st: true, data: data });

    } catch (error: any) {
        return res.status(statusCodes.BAD_REQUEST).json({ st: false, msg: error?.message });
    }
}
import { Schema, Types, model } from 'mongoose';
import { IBase } from "../Types/Ludo";
import { types } from "util";


type IRoom = {
    roomCode: string,
    creator: string,
    entryFees: Number,
    players?: { [baseID: string]: IBase },
    currentTurn?: string,
    winnersList: any[],
    status?: string,
    isStarted?: boolean,
    isClosed?: boolean,
    position?: string,
    steps?: number,
}

const roomSchema = new Schema<IRoom>({
    roomCode: { type: String },
    creator: { type: String },
    entryFees: { type: Number },
    players: Object,
    currentTurn: { type: String },
    winnersList: [],
    status: { type: String },
    isStarted: { type: Boolean, default: false },
    isClosed: { type: Boolean, default: false },
    position: { type: String },
    steps: { type: Number },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString()
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true
});

const Room = model<IRoom>('room', roomSchema);

export { Room, IRoom }
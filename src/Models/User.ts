import { Schema, Types, model } from 'mongoose';

interface IUser {
    name: String,
    address: String,
    balance?: Number
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    balance: { type: Number, default: 0 }
});

userSchema.index({ address: 1 }, { unique: true });
userSchema.index({ name: 1 }, { unique: true });


const Users = model<IUser>('users', userSchema);

export { Users, IUser }
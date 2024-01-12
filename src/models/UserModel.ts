import mongoose, { Schema } from 'mongoose';
import { UserRole } from '../constants/UserRole';
import IUser from '../types/IUser';

const userSchema: Schema = new Schema<IUser>({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    resetPassword: {
        resetCode: Number,
        expire: Date,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'users',
});

const UserModel = mongoose.model<IUser, mongoose.Model<IUser>>('User', userSchema);
export default UserModel;

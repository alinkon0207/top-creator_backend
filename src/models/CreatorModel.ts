import mongoose, { Schema } from 'mongoose';
import ICreator from '../types/ICreator';
import { LicenseType } from '../constants/licenseType';

const preferenceSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    subscriberId: {
        type: String,
        required: true
    },
}, { _id: false });

const creatorSchema: Schema = new Schema<ICreator>({
    link: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    license: {
        type: String,
        enum: Object.values(LicenseType),
        default: LicenseType.NONE,
    },
    userName: String,
    avatarURL: String,
    joinDate: Date,
    creatorAuth: {
        user_agent: String,
        x_bc: String,
        user_id: String,
        cookie: String,
        expiredAt: Date,
    },
    preferences: [preferenceSchema],
}, {
    timestamps: true,
    versionKey: false,
    collection: 'creators',
});

const CreatorModel = mongoose.model<ICreator, mongoose.Model<ICreator>>('Creator', creatorSchema);
export default CreatorModel;

import mongoose, { Schema } from 'mongoose';
import IVisibility from '../types/IVisibility';

const visibilityModel: Schema = new Schema<IVisibility>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    showScripts: {
        type: Boolean,
        default: false,
    },
    showFanDetails: {
        type: Boolean,
        default: false,
    },
    showGlobalInfo: {
        type: Boolean,
        default: false,
    },
    showFanSpending: {
        type: Boolean,
        default: false,
}, }, {
    timestamps: true,
    versionKey: false,
});

const VisibilityModel = mongoose.model<IVisibility, mongoose.Model<IVisibility>>('Visibility', visibilityModel);
export default VisibilityModel;

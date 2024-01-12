import mongoose, { Schema } from 'mongoose';
import IAutoFollow from '../types/IAutoFollow';

const autoFollowModel: Schema = new Schema<IAutoFollow>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const AutoFollowModel = mongoose.model<IAutoFollow, mongoose.Model<IAutoFollow>>('AutoFollow', autoFollowModel);
export default AutoFollowModel;
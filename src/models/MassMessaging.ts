import mongoose, { Schema } from 'mongoose';
import IMassMessaging from '../types/IMassMessaging';

const massMessagingModel: Schema = new Schema<IMassMessaging>({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    startDate: Date,
    endDate: Date,
    excludeFans: {
        type: Number,
        default: 0,
    },
    activeSub: {
        type: Boolean,
        default: false,
    },
    neverChatBefore: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const MassMessagingModel =
    mongoose.model<
        IMassMessaging, mongoose.Model<IMassMessaging>>('MassMessaging', massMessagingModel);
export default MassMessagingModel;

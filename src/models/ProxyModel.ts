import mongoose, { Schema } from 'mongoose';
import { ProxyType } from '../constants/proxyType';
import IProxy from '../types/IProxy';

const proxySchema: Schema = new Schema<IProxy>({
    proxyType: {
        type: String,
        enum: Object.values(ProxyType),
        required: true,
    },
    host: String,
    port: String,
    userName: String,
    password: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    country: String
}, {
    timestamps: true,
    versionKey: false,
    collection: 'proxies',
});

const ProxyModel = mongoose.model<IProxy, mongoose.Model<IProxy>>('Proxy', proxySchema);
export default ProxyModel;

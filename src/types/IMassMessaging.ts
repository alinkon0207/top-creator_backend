import { Document, Types } from 'mongoose';
import { MassMessaging as GraphQLMassMessaging } from '../generated/graphql';

interface IMassMessaging extends Document, Omit<GraphQLMassMessaging, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

export default IMassMessaging;

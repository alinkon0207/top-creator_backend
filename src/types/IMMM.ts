import { Document, Types } from 'mongoose';
import { MassMessagingMessage as GraphQLMassMessagingMessage } from '../generated/graphql';

interface IMMM extends Document, Omit<GraphQLMassMessagingMessage, 'id' | 'massMess'> {
    _id: Types.ObjectId;
    massMess: Types.ObjectId;
}

export default IMMM;

import { Document, Types } from 'mongoose';
import { MassMessaging as GraphQLMassMessaging } from '../generated/graphql';
import ICreator from './ICreator';
import IMMM from './IMMM';

interface IPopulateMassMessagingMessage extends Document, Omit<GraphQLMassMessaging, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: ICreator;
    createdBy: Types.ObjectId;
    messages: IMMM[]
}

export default IPopulateMassMessagingMessage;

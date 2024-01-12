import { Document, Types } from 'mongoose';
import { MassMessaging as GraphQLMassMessaging } from '../generated/graphql';
import ICreator from './ICreator';

interface IPopulateMassMessaging extends Document, Omit<GraphQLMassMessaging, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: ICreator;
    createdBy: Types.ObjectId;
}

export default IPopulateMassMessaging;

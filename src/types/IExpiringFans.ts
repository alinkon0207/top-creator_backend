import { Document, Types } from 'mongoose';
import { ExpiringFans as GraphQLExpiringFans} from '../generated/graphql';

interface IExpiringFans extends Document, Omit<GraphQLExpiringFans, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

export default IExpiringFans

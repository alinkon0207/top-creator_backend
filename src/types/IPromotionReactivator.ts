import { Document, Types } from 'mongoose';
import { PromotionReactivator as GraphQLPromotionReactivator } from '../generated/graphql';

interface IPromotionReactivator extends Document, Omit<GraphQLPromotionReactivator, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

export default IPromotionReactivator;

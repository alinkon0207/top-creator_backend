import { Document, Types } from 'mongoose';
import { Creator as GraphQLCreator } from '../generated/graphql';

interface ICreator extends Document, Omit<GraphQLCreator, 'id' | 'userId'> {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
}

export default ICreator;

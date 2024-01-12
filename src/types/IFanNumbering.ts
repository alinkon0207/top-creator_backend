import { Document, Types } from 'mongoose';
import { FanNumbering as GraphQLFanNumbering } from '../generated/graphql';

interface IFanNumbering extends Document, Omit<GraphQLFanNumbering, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

export default IFanNumbering;

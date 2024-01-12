import { Document, Types } from 'mongoose';
import { User as GraphQLUser  } from '../generated/graphql';


interface IUser extends Document, Omit<GraphQLUser, 'id'> {
    _id: Types.ObjectId;
}

export default IUser;

import { Document, Types } from 'mongoose';
import { WelcomeSettings as GraphQLWelcomeSettings } from '../generated/graphql';

interface IWelcomeSettings extends Document, Omit<GraphQLWelcomeSettings, 'id' | 'creatorId' | 'createdBy'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

export default IWelcomeSettings;

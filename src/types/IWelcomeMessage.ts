import { Document, Types } from 'mongoose';
import { WelcomeMessage as GraphQLWelcomeMessage } from '../generated/graphql';

interface IWelcomeMessage extends Document, Omit<GraphQLWelcomeMessage, 'id' | 'welcomeSettings' > {
    _id: Types.ObjectId;
    welcomeSettings: Types.ObjectId;
}

export default IWelcomeMessage;

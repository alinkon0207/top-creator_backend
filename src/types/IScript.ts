import { Document, Types } from 'mongoose';
import { NameType } from '../constants/NameType';
import { Script as GraphQLScript } from '../generated/graphql';

interface IScript extends Document, Omit<GraphQLScript,
    'id' | 'scriptFolder' | 'customName' | 'fanName'>
{
    _id: Types.ObjectId;
    scriptFolder: Types.ObjectId;
    customName: NameType;
    fanName: NameType;
}

export default IScript;

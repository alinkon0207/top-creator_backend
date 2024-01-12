import { Document, Types } from 'mongoose';
import { ScriptFolder as ScriptFolderQLCreator } from '../generated/graphql';

interface IScriptFolder extends Document, Omit<ScriptFolderQLCreator, 'id' | 'creatorId'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
}

export default IScriptFolder;

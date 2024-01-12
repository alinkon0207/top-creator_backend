import ScriptFolderModel from '../models/ScriptFolderModel';
import ScriptModel from '../models/ScriptModel';
import { getNextNumber } from '../utils/getNextNumber';
import { checkCreatorOwner } from '../utils/checkCreatorOwner';
import { validateCreateScriptFolder, validateUpdateScriptFolder } from '../validation/scriptFolderValidation';
import { CreateScriptFolderInput, UpdateScriptFolderInput } from '../generated/graphql';
import IScriptFolder from '../types/IScriptFolder';
import IScript from '../types/IScript';

class ScriptFolderService {
    private model: typeof ScriptFolderModel = ScriptFolderModel;

    async getScriptFolderById(token: string, id: string) {
        try {
            const scriptFolder = await this.model.findById(id) as IScriptFolder;

            if (!scriptFolder) {
                throw new Error('Script folder not found');
            }

            await checkCreatorOwner(token, scriptFolder.creatorId.toString());

            return scriptFolder;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch script folder by id.');
        }
    }

    async getCreatorScriptFolders(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const scriptFolders = await this.model.find({ creatorId }).sort({ number: 1 }).lean() as IScriptFolder[];

            const enrichedScriptFolders = await Promise.all(scriptFolders.map(async (folder) => {
                const scripts = await ScriptModel.find({ scriptFolder: folder._id }).sort({ number: 1 }).lean() as IScript[];

                const transformedScripts = scripts.map(script => ({
                    id: script._id.toString(),
                    name: script.name,
                    text: script.text,
                    fallbackName: script.fallbackName,
                    number: script.number,
                }));

                return {
                    id: folder._id.toString(),
                    folderName: folder.folderName,
                    number: folder.number,
                    creatorId: folder.creatorId,
                    scripts: transformedScripts
                };
            }));

            return enrichedScriptFolders.map(folder => ({scriptFolders: folder}));

        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch script folders.');
        }
    }

    async createScriptFolder(token: string, input: CreateScriptFolderInput) {
        try {
            await validateCreateScriptFolder(input);

            await checkCreatorOwner(token, input.creatorId);

            const nextNumber = await getNextNumber(ScriptFolderModel, 'creatorId', input.creatorId, 'number');

            return await this.model.create({
                ...input,
                number: nextNumber
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create script folder.');
        }
    }

    async changeScriptFolder(token: string, input: UpdateScriptFolderInput) {
        try {
            await validateUpdateScriptFolder(input);

            await checkCreatorOwner(token, input.creatorId);

            return await this.model.findOneAndUpdate({
                _id: input.id
            }, {
                ...input
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change script folder.');
        }
    }

    async deleteScriptFolder(token: string, id: string) {
        try {
            const scriptFolder = await this.model.findById(id) as IScriptFolder;

            if (!scriptFolder) {
                throw new Error('Script folder not found');
            }

            await checkCreatorOwner(token, scriptFolder.creatorId.toString());

            return await this.model.deleteOne({
                _id: id
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete script folder.');
        }
    }
}

export default new ScriptFolderService;

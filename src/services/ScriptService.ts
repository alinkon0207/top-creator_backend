import ScriptModel from '../models/ScriptModel';
import { authService } from './AuthService';
import creatorService from './CreatorService';
import scriptFolderService from './ScriptFolderService';
import { getNextNumber } from '../utils/getNextNumber';
import { validateCreateScript, validateUpdateScript } from '../validation/scriptValidation';
import { CreateScriptInput, UpdateScriptInput } from '../generated/graphql';
import ICreator from '../types/ICreator';
import IScript from '../types/IScript';

class ScriptService {
    private model: typeof ScriptModel = ScriptModel;

    async getScriptById(token: string, id: string) {
        try {
            const script = await this.model.findById(id) as IScript;

            if (!script) {
                throw new Error('Script not found');
            }

            await this.checkCreatorOwner(token, script.scriptFolder.toString());

            return script;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch script by id.');
        }
    }

    async createScript(token: string, input: CreateScriptInput) {
        try {
            await validateCreateScript(input);
            await this.checkCreatorOwner(token, input.scriptFolder);
            const nextNumber = await getNextNumber(ScriptModel, 'scriptFolder', input.scriptFolder, 'number');

            return await this.model.create({
                ...input,
                number: nextNumber
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create script.');
        }
    }

    async changeScript(token: string, input: UpdateScriptInput) {
        try {
            await validateUpdateScript(input);
            const existScript = await this.model.findById(input.id) as IScript;
            await this.checkCreatorOwner(token, existScript.scriptFolder.toString());

            return await this.model.findOneAndUpdate({
                _id: input.id
            }, {
                ...input
            }, {
                new: true
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change script.');
        }
    }

    async deleteScript(token: string, id: string) {
        try {
            const existScript = await this.model.findById(id) as IScript;
            await this.checkCreatorOwner(token, existScript.scriptFolder.toString());

            return await this.model.findOneAndDelete({
                _id: id
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete script.');
        }
    }

    private async checkCreatorOwner(token: string, scriptFolder: string) {
        const data = await authService.getDataFromToken(token);

        if (!data) {
            throw new Error('User not found');
        }

        const existScriptFolder = await scriptFolderService.getScriptFolderById(token, scriptFolder);
        const creator = await creatorService.getCreatorById(existScriptFolder.creatorId.toString()) as ICreator;

        if (creator.userId.toString() !== data.id) {
            throw new Error('You are not owner of this creator');
        }

    }
}

export default new ScriptService;

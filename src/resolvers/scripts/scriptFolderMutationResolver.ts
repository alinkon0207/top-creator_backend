import { authService } from '../../services/AuthService';
import scriptFolderService from '../../services/ScriptFolderService';
import { CreateScriptFolderInput, UpdateScriptFolderInput } from '../../generated/graphql';

const scriptFolderMutationResolver =  {
    Mutation: {
        async createScriptFolder(_: never, { input }: { input: CreateScriptFolderInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const scriptFolder = await scriptFolderService.createScriptFolder(token, input);

                return {
                    message: `Script folder with name: ${ scriptFolder.folderName } successfully created`,
                    scriptFolder
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to create script folder.');
            }
        },

        async changeScriptFolder(_: never, { input }: { input: UpdateScriptFolderInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const scriptFolder = await scriptFolderService.changeScriptFolder(token, input);

                return {
                    message: `Script folder with id: ${ input.id } successfully changed`,
                    scriptFolder
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change script folder.');
            }
        },

        async deleteScriptFolder(_: never, { id }: { id: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                await scriptFolderService.deleteScriptFolder(token, id);

                    return `Script folder with id: ${ id } successfully deleted`;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to delete script folder.');
            }
        }
    }
};

export default scriptFolderMutationResolver;

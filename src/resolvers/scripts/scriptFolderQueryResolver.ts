import { authService } from '../../services/AuthService';
import scriptFolderService from '../../services/ScriptFolderService';

const scriptFolderQueryResolver = {
    Query: {
        async getScriptFolderById(_: never, { id }: { id: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scriptFolderService.getScriptFolderById(token, id);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch script folder by id.');
            }
        },

        async getCreatorScriptFolders(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scriptFolderService.getCreatorScriptFolders(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch script folders.');
            }
        }

    }
};

export default scriptFolderQueryResolver;

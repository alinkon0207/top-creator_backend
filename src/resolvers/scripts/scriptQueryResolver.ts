import { authService } from '../../services/AuthService';
import scriptService from '../../services/ScriptService';

const scriptQueryResolver = {
    Query: {
        async getScriptById(_: never, { id }: { id: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scriptService.getScriptById(token, id);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch script by id.');
            }
        }
    }
};

export default scriptQueryResolver;

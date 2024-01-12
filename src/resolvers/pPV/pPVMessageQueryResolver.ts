import { authService } from '../../services/AuthService';
import { ppvMessageService } from '../../services/pPVMessageService';

const pPVMessageQueryResolver = {
    Query: {
        async getOnePPVMessage(_: never, { pPVMessageId }: { pPVMessageId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await ppvMessageService.getOnePPVMessage(token, pPVMessageId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get one mass message.');
            }
        },

        async getAllPPVMessage(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await ppvMessageService.getAllPPVMessage(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get all mass messages.');
            }
        }
    }
};

export default pPVMessageQueryResolver;

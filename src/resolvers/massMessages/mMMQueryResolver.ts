import { authService } from '../../services/AuthService';
import MMMService from '../../services/MMMService';

const mMMQueryResolver = {
    Query: {
        async getAllMessages(_: never, { massMessId }: { massMessId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await MMMService.getAllMessages(token, massMessId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get messages.');
            }
        },

        async getOneMassMessage(_: never, { massMessageId }: { massMessageId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await MMMService.getOneMassMessage(token, massMessageId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get mass message.');
            }
        }
    }
};

export default mMMQueryResolver;

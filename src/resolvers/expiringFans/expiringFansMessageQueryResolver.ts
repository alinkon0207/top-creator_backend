import { authService } from '../../services/AuthService';
import ExpiringFansMessageService from '../../services/ExpiringFansMessageService';

const expiringFansMessageQueryResolver = {
    Query: {
        async getOneExpiringFansMessage(_: never, { expiringFansMessageId }: { expiringFansMessageId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await ExpiringFansMessageService.getOneExpiringFansMessage(token, expiringFansMessageId);
            } catch (error) {
                console.error('Error:', error);
                throw Error;
            }
        },

        async getAllExpiringFansMessages(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await ExpiringFansMessageService.getAllExpiringFansMessages(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw Error;
            }
        }
    }
};

export default expiringFansMessageQueryResolver;

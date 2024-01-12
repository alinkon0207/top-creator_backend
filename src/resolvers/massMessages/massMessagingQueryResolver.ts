import { authService } from '../../services/AuthService';
import massMessagingService from '../../services/MassMessagingService';

const massMessagingQueryResolver = {
    Query: {
        async getAllMassMessaging(_: never, { creatorId }: { creatorId: string }, context: any) {
           try {
               const token = authService.checkToken(context.token);

               return await massMessagingService.getAllMassMessaging(token, creatorId);
           } catch (error) {
               console.error('Error:', error);
               throw new Error('Failed to get mass messaging.');
           }
        },

        async getOneMassMessaging(_: never, { massMessagingId }: { massMessagingId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await massMessagingService.getOneMassMessaging(token, massMessagingId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get mass messaging.');
            }
        }
    }
};

export default massMessagingQueryResolver;

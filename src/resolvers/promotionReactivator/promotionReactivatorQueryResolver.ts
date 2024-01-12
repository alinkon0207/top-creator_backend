import { authService } from '../../services/AuthService';
import PromotionReactivatorService from '../../services/PromotionReactivatorService';

const promotionReactivatorQueryResolver = {
    Query: {
        async getPromotionReactivator(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await PromotionReactivatorService.getPRByCreatorId(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get promotion reactivator.');
            }
        }
    }
};

export default promotionReactivatorQueryResolver;

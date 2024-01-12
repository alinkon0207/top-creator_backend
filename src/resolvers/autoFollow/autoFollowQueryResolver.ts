import { authService } from '../../services/AuthService';
import AutoFollowService from '../../services/AutoFollowService';

const autoFollowQueryResolver = {
    Query: {
        async getAutoFollow(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);
                return await AutoFollowService.getAFByCreatorId(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get auto follow.');
            }
        }
    }
};

export default autoFollowQueryResolver;

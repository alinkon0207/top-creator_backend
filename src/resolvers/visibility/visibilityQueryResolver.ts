import { authService } from '../../services/AuthService';
import visibilityService from '../../services/VisibilityService';

const visibilityQueryResolver = {
    Query: {
        async getCreatorVisibility(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const result = await visibilityService.getCreatorVisibility(token, creatorId);

                return {
                    message: 'Visibility successfully retrieved',
                    visibility: result
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to authenticate user.');
            }
        }
    }
};

export default visibilityQueryResolver;

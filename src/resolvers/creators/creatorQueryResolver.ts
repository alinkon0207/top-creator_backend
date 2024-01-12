import { authService } from '../../services/AuthService';
import creatorService from '../../services/CreatorService';

const creatorQueryResolver = {
    Query: {
        async getCreatorAuth(_: never, { user_id }: { user_id: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await creatorService.getCreatorAuth(token, user_id);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get creator auth.');
            }
        },
    }
};

export default creatorQueryResolver;

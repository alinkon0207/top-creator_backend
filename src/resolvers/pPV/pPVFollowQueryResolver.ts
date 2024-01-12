import { authService } from '../../services/AuthService';
import { ppvFollowService} from '../../services/pPVFollowService';

const PPVFollowQueryResolver = {
    Query: {
        async getPPVFollow(_: never, { creatorId }: { creatorId: string }, context: any) {
           try {
               const token = authService.checkToken(context.token);

               return await ppvFollowService.getPPVFollowByCreatorId(token, creatorId);
           } catch (error) {
               console.error('Error:', error);
               throw new Error('Failed to get mass messaging.');
           }
        },
    }
};

export default PPVFollowQueryResolver;

import { authService } from '../../services/AuthService';
import ExpiringFansService from '../../services/ExpiringFansService';

const expiringFansQueryResolver = {
    Query: {
        async getExpiringFans(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await ExpiringFansService.getEFByCreatorId(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw Error;
            }
        }
    }
};

export default expiringFansQueryResolver;

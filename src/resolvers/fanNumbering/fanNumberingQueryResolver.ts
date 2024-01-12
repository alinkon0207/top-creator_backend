import { authService } from '../../services/AuthService';
import FanNumberingService from '../../services/FanNumberingService';

const fanNumberingQueryResolver = {
    Query: {
        async getFanNumbering(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);
                return await FanNumberingService.getFNByCreatorId(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get fan numbering.');
            }
        }
    }
};

export default fanNumberingQueryResolver;

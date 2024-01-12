import { authService } from '../../services/AuthService';
import DisplaySettingsService from '../../services/DisplaySettingsService';

const displaySettingsQueryResolver = {
    Query: {
        async getDisplaySettings(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await DisplaySettingsService.getDSByCreatorId(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw error
            }
        }
    }
};

export default displaySettingsQueryResolver;

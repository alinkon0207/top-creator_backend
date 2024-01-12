import { authService } from '../../services/AuthService';
import DisplayColorsService from '../../services/DisplayColorsService';

const displayColorQueryResolver = {
    Query: {
        async getOneDisplayColor(_: never, { displayColorId }: { displayColorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await DisplayColorsService.getOneDisplayColor(token, displayColorId);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },

        async getAllDisplayColors(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await DisplayColorsService.getAllDisplayColors(token, creatorId);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }
    }
};

export default displayColorQueryResolver;

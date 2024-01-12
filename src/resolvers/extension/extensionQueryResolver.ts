import { GetPreferencesByChatterIdExtensionInput } from '../../generated/graphql';
import { authService } from '../../services/AuthService';
import extensionService from '../../services/ExtensionService';

const extensionQueryResolver = {
    Query: {
        async getPreferencesByChatterIdExtension(_: never, { input }: { input: GetPreferencesByChatterIdExtensionInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await extensionService.getPreferencesByChatterIdExtension(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get creator auth.');
            }
        },

        async getVisibilitySettingByTokenExtension(_: never, { user_id }: { user_id: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await extensionService.getVisibilityByTokenExt(token, user_id);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }
    }
};

export default extensionQueryResolver;

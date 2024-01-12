import { authService } from '../../services/AuthService';
import { ChangeDisplaySettingsInput} from '../../generated/graphql';
import DisplaySettingsService from '../../services/DisplaySettingsService';

const displaySettingsMutationResolver = {
    Mutation: {
        async changeDisplaySettings(_: never, { input }: { input: ChangeDisplaySettingsInput }, context: any) {
           try {
               const token = authService.checkToken(context.token);

               const displaySettings = await DisplaySettingsService.changeDisplaySettings(token, input);

               return {
                   message: 'Display settings changed successfully',
                   displaySettings
               };
           } catch (error) {
               console.error('Error:', error);
               throw error
           }
        },
    }
};

export default displaySettingsMutationResolver;

import extensionService from '../../services/ExtensionService';
import creatorService from '../../services/CreatorService';
import { authService } from '../../services/AuthService';
import ICreator from '../../types/ICreator';
import { AddPreferencesInput, ChangeCreatorAuthInput, LoginExtensionInput } from '../../generated/graphql';

const extensionMutationResolver = {
    Mutation: {
        async loginExtension(_: never, { input}: { input: LoginExtensionInput }) {
            try {
                const { token, visibilitySettings } = await extensionService.loginExtension(input);

                return {
                    token,
                    visibilitySettings
                };
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },

        async changeCreatorAuthByExtension(_: never, { input }: { input: ChangeCreatorAuthInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const creator = await creatorService.changeCreatorAuthByExtension(token, input) as ICreator;

                return `Creator auth for creator with id: ${ creator.id } successfully changed`;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change creator auth.');
            }
        },

        async addPreferences(_: never, { input }: { input: AddPreferencesInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const preferences = await extensionService.addPreferences(token, input);

                return {
                    message: `Preferences for chatter with id: ${ input.chatterId } successfully added`,
                    preferences
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to add preferences.');
            }
        }
    }
};

export default extensionMutationResolver;

import userService from './UserService';
import creatorService from './CreatorService';
import visibilityService from './VisibilityService';
import { authService } from './AuthService';
import { checkCreatorOwnerByExtension } from '../utils/checkCreatorOwner';
import { validateAddPreferences } from '../validation/creatorValidation';
import {
    AddPreferencesInput,
    GetPreferencesByChatterIdExtensionInput,
    LoginExtensionInput,
    UserDto
} from '../generated/graphql';
import ICreator from '../types/ICreator';

class ExtensionService {

    async loginExtension(input: LoginExtensionInput){
        try {

            const user = await userService.authenticateByExtension(input.email, input.password) as UserDto;
            const creator = await creatorService.getCreatorByAuthUser_Id(input.user_id) as ICreator;

            if (creator.userId.toString() !== user.id) {
                throw new Error('You are not owner of this creator');
            }

            const visibilitySettings = await visibilityService.getCreatorVisibilityForExtension(creator.id);

            const extensionToken = authService.generateExtensionToken(user.id, creator.id);
            return {
                token: extensionToken,
                visibilitySettings
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addPreferences(token: string, input: AddPreferencesInput) {
        try {
            const creator =  await checkCreatorOwnerByExtension(token, input.user_id) as ICreator;
            await validateAddPreferences(input);

            const newPreferences = input.preferencesText?.map(text => ({
                text: text,
                subscriberId: input.chatterId
            })) || [];

            creator.preferences = creator.preferences || [];
            creator.preferences = creator.preferences.filter(p => p?.subscriberId !== input.chatterId);
            creator.preferences.push(...newPreferences);

            await creator.save();

            return creator.preferences.filter(p => p?.subscriberId === input.chatterId);
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to add Preferences');
        }
    }

    async getPreferencesByChatterIdExtension(token: string, input: GetPreferencesByChatterIdExtensionInput) {
        try {
            const creator =  await checkCreatorOwnerByExtension(token, input.user_id) as ICreator;

            const preferences = creator && creator.preferences
                ? creator.preferences.filter(preference => preference?.subscriberId === input.chatterId)
                : [];

            const creatorWithoutPreferences = {
                id: creator.id,
                link: creator.link,
                userId: creator.userId,
                license: creator.license,
                userName: creator.userName,
                avatarURL: creator.avatarURL,
                joinDate: creator.joinDate,
                creatorAuth: creator.creatorAuth
            };

            return {
                preferences,
                chatter: creatorWithoutPreferences
            };
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get Preferences By ChatterId for creator');
        }
    }

    async getVisibilityByTokenExt(token: string, user_id: string) {
        try {
            const creator =  await checkCreatorOwnerByExtension(token, user_id) as ICreator;
            const visibilitySettings = await visibilityService.getCreatorVisibilityForExtension(creator.id);

            return {
                user_id,
                visibilitySetting: visibilitySettings
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}
export default new ExtensionService;

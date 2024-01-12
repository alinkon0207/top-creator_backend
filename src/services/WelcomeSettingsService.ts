import WelcomeSettingsModel from '../models/WelcomeSettingsModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { ChangeWelcomeSettingsInput } from '../generated/graphql';
import IUser from '../types/IUser';
import ICreator from '../types/ICreator';
import IWelcomeSettings from '../types/IWelcomeSettings';
import schedule from 'node-schedule'

class WelcomeSettingsService {
    private model: typeof WelcomeSettingsModel = WelcomeSettingsModel;

    async getWSById(welcomeSettingsId: string) {
        try {

            return await this.model.findById(welcomeSettingsId) as IWelcomeSettings;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get welcome settings by id.');
        }
    }

    async getWSByCreatorId(token: string, creatorId: string) {
        try {
            const welcomeSettings = await this.model.findOne({ creatorId: creatorId }) as IWelcomeSettings;

            await this.ownerCreatorCheck(token, welcomeSettings._id.toString());

            return welcomeSettings;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get welcome settings by creator id.');
        }
    }

    async createWelcomeSettings(creatorId: string, createdBy: string) {
        try {

            return await this.model.create({
                creatorId,
                createdBy
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create welcome settings in Service.');
        }
    }

    async changeWelcomeSettings(token: string, input: ChangeWelcomeSettingsInput) {
        try {
            await this.ownerCreatorCheck(token, input.id);

            return await this.model.findOneAndUpdate({
                    _id: input.id
                },
                {
                    ...input
                },
                {
                    new: true
                });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change welcome settings in Service.');
        }
    }

    async temporarySendWelcomeMessage(token: string, creatorId: string) {
        try {
            await this.ownerCreatorCheck(token, creatorId);
            
            const welcomeSettings = await this.model.find({ creatorId, active: true }) as IWelcomeSettings[]

            if (welcomeSettings) {
                for (const welcomeSetting of welcomeSettings) {
                schedule.scheduleJob(welcomeSetting.time, function() {
                  // logic to send the message

                  // TODO send real message
                console.log(`Sending message: ${welcomeSetting._id}`);
                });
                return "Message scheduled successfully";
                }
              }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change welcome settings in Service.');
        }
    }


    private async ownerCreatorCheck(token: string, welcomeSettingsId: string) {
        const user = await userService.getUserByToken(token) as IUser;
        const welcomeSettings = await this.model.findById(welcomeSettingsId) as IWelcomeSettings;
        const creator = await creatorService.getCreatorById(welcomeSettings.creatorId.toString()) as ICreator;

        if(user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

export default new WelcomeSettingsService;

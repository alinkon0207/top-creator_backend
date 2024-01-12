import WelcomeMessageModel from '../models/WelcomeMessageModel';
import welcomeSettingsService from './WelcomeSettingsService';
import userService from './UserService';
import { validateChangeWelcomeMessage, validateCreateWelcomeMessage } from '../validation/massMessageValidation';
import { ChangeWelcomeMessageInput, CreateWelcomeMessageInput } from '../generated/graphql';
import IWelcomeMessage from '../types/IWelcomeMessage';
import { checkCreatorOwner } from '../utils/checkCreatorOwner';
import WelcomeSettingsModel from '../models/WelcomeSettingsModel';

class WelcomeMessageService {
    private welcomeMessageModel: typeof WelcomeMessageModel = WelcomeMessageModel;

    async getOneWelcomeMessage(token: string, welcomeMessageId: string) {
        try {
            const welcomeMessage = await this.welcomeMessageModel.findById(welcomeMessageId) as IWelcomeMessage;
            await this.ownerCreatorCheck(token, welcomeMessage.welcomeSettings.toString());

            return welcomeMessage;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get welcome message.');
        }
    }

    async getAllWelcomeMessage(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const welcomeSettings = await WelcomeSettingsModel.findOne({creatorId})
            if (!welcomeSettings) throw new Error("WelcomeSettings Is undefined")
            return await this.welcomeMessageModel.find({welcomeSettings: welcomeSettings._id });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get welcome messages.');
        }
    }

    async createWelcomeMessage(token: string, input: CreateWelcomeMessageInput) {
        try {
            await validateCreateWelcomeMessage(input);
            const welcomeSettings = await welcomeSettingsService.getWSById(input.welcomeSettings);
            await this.ownerCreatorCheck(token, welcomeSettings._id.toString());

            return await this.welcomeMessageModel.create({
                ...input,
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create welcome message.');
        }
    }

    async changeWelcomeMessage(token: string, input: ChangeWelcomeMessageInput) {
        try {
            await validateChangeWelcomeMessage(input);
            const welcomeMessage = await this.welcomeMessageModel.findById(input.id) as IWelcomeMessage;
            await this.ownerCreatorCheck(token, welcomeMessage.welcomeSettings._id.toString());

            return await this.welcomeMessageModel.findOneAndUpdate({
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
            throw new Error('Failed to change welcome message.');
        }
    }

    async deleteWelcomeMessage(token: string, welcomeMessageId: string) {
        try {
            const welcomeMessage = await this.welcomeMessageModel.findById(welcomeMessageId) as IWelcomeMessage;
            await this.ownerCreatorCheck(token, welcomeMessage.welcomeSettings.toString());

            return await this.welcomeMessageModel.findByIdAndDelete(welcomeMessageId);
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete welcome message.');
        }
    }

    private async ownerCreatorCheck(token: string, welcomeSettingsId: string) {
        const user = await userService.getUserByToken(token);
        const welcomeSettings = await welcomeSettingsService.getWSById(welcomeSettingsId);

        if (user.id !== welcomeSettings.createdBy.toString()) {
            throw new Error('You are not the owner of this welcome settings.');
        }
    }
}

export default new WelcomeMessageService;

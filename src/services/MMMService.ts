import MMMModel from '../models/MMMModel';
import {validateChangeMassMessage, validateCreateMassMessage} from '../validation/mMMValidation';
import massMessagingService from './MassMessagingService';
import userService from './UserService';
import {
    ChangeMassMessageInput,
    CreateMassMessageInput,
    CreateMassMessageInputForMessaging,
    InputMaybe
} from '../generated/graphql';
import IUser from '../types/IUser';
import IMassMessaging from '../types/IMassMessaging';
import IMMM from '../types/IMMM';

class MMMService {
    private model: typeof MMMModel = MMMModel;

    async findById(id: string) {

        return this.model.findById(id);
    }

    async getOneMassMessage(token: string, massMessageId: string) {
        try {

            const massMessage = await this.model.findOne({_id: massMessageId}) as IMMM;
            await this.checkMassMessagingOwner(token, massMessage.massMess.toString());

            return await this.model.findOne({_id: massMessageId});
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get mass message in Service.');
        }
    }

    async getAllMessages(token: string, massMessId: string) {
        try {

            await this.checkMassMessagingOwner(token, massMessId);

            return await this.model.find({massMess: massMessId});
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get messages in Service.');
        }
    }

    async createMassMessage(token: string, input: CreateMassMessageInput) {
        try {
            await validateCreateMassMessage(input);

            const massMessaging = await massMessagingService.findById(input.massMess) as IMassMessaging;
            await this.checkMassMessagingOwner(token, massMessaging._id.toString());

            return await this.model.create({
                ...input,
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create mass message in Service.');
        }
    }

    async createManyMassMessages(massMessagingId: string, messages: Array<InputMaybe<CreateMassMessageInputForMessaging>>) {
        try {
             const massMessagesToCreate = messages.map(message => ({
                massMess: massMessagingId,
                ...message
            }));

            return await this.model.insertMany(massMessagesToCreate);
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create mass messages.');
        }
    }

    async changeMassMessage(token: string, input: ChangeMassMessageInput) {
        try {
            await validateChangeMassMessage(input);

            const massMessage = await this.model.findOne({_id: input.id}) as IMMM;
            await this.checkMassMessagingOwner(token, massMessage.massMess.toString());

            return await this.model.findOneAndUpdate(
                {_id: input.id},
                {
                    ...input
                },
                {new: true}
                );
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change mass message in Service.');
        }
    }

    async deleteMassMessage(token: string, massMessageId: string) {
        try {

            const massMessage = await this.model.findOne({_id: massMessageId}) as IMMM;
            await this.checkMassMessagingOwner(token, massMessage.massMess.toString());

            await this.model.deleteOne({_id: massMessageId});
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete mass message in Service.');
        }
    }

    private async checkMassMessagingOwner(token: string, massMessagingId: string) {
        const massMessaging = await massMessagingService.findById(massMessagingId) as IMassMessaging;

        const user = await userService.getUserByToken(token) as IUser;

        if (massMessaging.createdBy.toString() !== user.id.toString()) {
            throw new Error('You are not creator of this mass messaging!');
        }
    }
}

export default new MMMService();

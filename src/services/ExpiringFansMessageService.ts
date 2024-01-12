import userService from './UserService';
import { checkCreatorOwner } from '../utils/checkCreatorOwner';
import ExpiringFansMessageModel from '../models/ExpiringFansMessageModel';
import ExpiringFansService from './ExpiringFansService';
import { validateChangeExpiringFansMessage, validateCreateExpiringFansMessage } from '../validation/expiringFansMessageValidation';
import ExpiringFansModel from '../models/ExpiringFansModel';
import { ChangeExpiringFansMessageInput, CreateExpiringFansMessageInput} from '../generated/graphql';
import IExpiringFansMessage from '../types/IExpiringFansMessage';
import IExpiringFans from '../types/IExpiringFans';


class ExpiringFansMessageService {
    private model: typeof ExpiringFansMessageModel = ExpiringFansMessageModel;

    async getOneExpiringFansMessage(token: string, expiringFansId: string) {
        try {
            const expiringFansMessageModel = await this.model.findById(expiringFansId) as IExpiringFansMessage;
            await this.ownerCreatorCheck(token, expiringFansMessageModel.expiringFans.toString());

            return expiringFansMessageModel;
        } catch (error) {
            console.error('Error:', error);
            throw Error
        }
    }

    async getAllExpiringFansMessages(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const expiringFans = await ExpiringFansModel.findOne({creatorId}) as IExpiringFans
            if (!expiringFans) throw new Error("Expiring fans Is undefined")

            return await this.model.find({expiringFans: expiringFans._id });
        } catch (error) {
            console.error('Error:', error);
            throw Error
        }
    }

    async createExpiringFansMessage(token: string, input: CreateExpiringFansMessageInput) {
        try {
            await validateCreateExpiringFansMessage(input);
            const expiringFans = await ExpiringFansService.getEFById(input.expiringFans);
            await this.ownerCreatorCheck(token, expiringFans._id.toString());

            return await this.model.create({
                ...input,
            });
        } catch (error) {
            console.error('Error:', error);
            throw Error
        }
    }

    async changeExpiringFansMessage(token: string, input: ChangeExpiringFansMessageInput) {
        try {
            await validateChangeExpiringFansMessage(input);
            const expiringFans = await this.model.findById(input.id) as IExpiringFansMessage;
            await this.ownerCreatorCheck(token, expiringFans.expiringFans._id.toString());

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
            throw Error
        }
    }

    async deleteExpiringFansMessage(token: string, expiringFansId: string) {
        try {
            const expiringFansMessage = await this.model.findById(expiringFansId) as IExpiringFansMessage;
            await this.ownerCreatorCheck(token, expiringFansMessage.expiringFans.toString());

            return await this.model.findByIdAndDelete(expiringFansId);
        } catch (error) {
            console.error('Error:', error);
            throw Error
        }
    }

    private async ownerCreatorCheck(token: string, expiringFansId: string) {
        const user = await userService.getUserByToken(token);
        const expiringFans = await ExpiringFansService.getEFById(expiringFansId);

        if (user.id !== expiringFans.createdBy.toString()) {
            throw new Error("You are not owner of this creator")
        }
    }
}

export default new ExpiringFansMessageService;

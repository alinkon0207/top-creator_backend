import userService from './UserService';
import creatorService from './CreatorService';
import { ChangeFanNumberingInput } from '../generated/graphql';
import IUser from '../types/IUser';
import ICreator from '../types/ICreator';
import { validateChangeFanNumbering } from '../validation/fanNumberingValidation';
import FanNumberingModel from '../models/FanNumberingModel';
import IFanNumbering from '../types/IFanNumbering';

class FanNumberingService {
    private model: typeof FanNumberingModel = FanNumberingModel;

    async getFNById(welcomeSettingsId: string) {
        try {

            return await this.model.findById(welcomeSettingsId) as IFanNumbering;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get fan numbering by id.');
        }
    }

    async getFNByCreatorId(token: string, creatorId: string) {
        try {
            const fanNumbering = await this.model.findOne({ creatorId: creatorId }) as IFanNumbering;

            await this.ownerCreatorCheck(token, fanNumbering._id.toString());

            return fanNumbering;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get fan numbering by creator id.');
        }
    }

    async createFanNumbering(creatorId: string, createdBy: string) {
        try {

            return await this.model.create({
                creatorId,
                createdBy
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create fan numbering in Service.');
        }
    }

    async changeFanNumbering(token: string, input: ChangeFanNumberingInput) {
        try {
            await validateChangeFanNumbering(input);
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
            throw new Error('Failed to change fan numbering in Service.');
        }
    }

    private async ownerCreatorCheck(token: string, promotionReactivatorId: string) {
        const user = await userService.getUserByToken(token) as IUser;
        const promotionReactivator = await this.model.findById(promotionReactivatorId) as IFanNumbering;
        const creator = await creatorService.getCreatorById(promotionReactivator.creatorId.toString()) as ICreator;

        if(user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

export default new FanNumberingService;

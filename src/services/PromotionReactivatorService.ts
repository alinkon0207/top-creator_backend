import userService from './UserService';
import creatorService from './CreatorService';
import { ChangePromotionReactivatorInput } from '../generated/graphql';
import IUser from '../types/IUser';
import ICreator from '../types/ICreator';
import PromotionReactivatorModel from '../models/PromotionReactivatorModel';
import IPromotionReactivator from '../types/IPromotionReactivator';
import { validateChangePromotionReactivator } from '../validation/promotionReactivatorValidation';

class PromotionReactivatorService {
    private model: typeof PromotionReactivatorModel = PromotionReactivatorModel;

    async getPRById(welcomeSettingsId: string) {
        try {

            return await this.model.findById(welcomeSettingsId) as IPromotionReactivator;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get promotion reactivator by id.');
        }
    }

    async getPRByCreatorId(token: string, creatorId: string) {
        try {
            const welcomeSettings = await this.model.findOne({ creatorId: creatorId }) as IPromotionReactivator;

            await this.ownerCreatorCheck(token, welcomeSettings._id.toString());

            return welcomeSettings;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get promotion reactivator by creator id.');
        }
    }

    async createPromotionReactivator(creatorId: string, createdBy: string) {
        try {

            return await this.model.create({
                creatorId,
                createdBy
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create promotion reactivator in Service.');
        }
    }

    async changePromotionReactivator(token: string, input: ChangePromotionReactivatorInput) {
        try {
            await validateChangePromotionReactivator(input);
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
            throw new Error('Failed to change promotion reactivator in Service.');
        }
    }

    private async ownerCreatorCheck(token: string, promotionReactivatorId: string) {
        const user = await userService.getUserByToken(token) as IUser;
        const promotionReactivator = await this.model.findById(promotionReactivatorId) as IPromotionReactivator;
        const creator = await creatorService.getCreatorById(promotionReactivator.creatorId.toString()) as ICreator;

        if(user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

export default new PromotionReactivatorService;

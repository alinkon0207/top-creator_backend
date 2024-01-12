import userService from './UserService';
import creatorService from './CreatorService';
import { ChangeAutoFollowInput } from '../generated/graphql';
import IUser from '../types/IUser';
import ICreator from '../types/ICreator';
import AutoFollowModel from '../models/AutoFollowModel';
import IAutoFollow from '../types/IAutoFollow';

class AutoFollowService {
    private model: typeof AutoFollowModel = AutoFollowModel;

    async getAFById(welcomeSettingsId: string) {
        try {

            return await this.model.findById(welcomeSettingsId) as IAutoFollow;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get auto follow by id.');
        }
    }

    async getAFByCreatorId(token: string, creatorId: string) {
        try {
            const fanNumbering = await this.model.findOne({ creatorId: creatorId }) as IAutoFollow;

            await this.ownerCreatorCheck(token, fanNumbering._id.toString());

            return fanNumbering;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get auto follow by creator id.');
        }
    }

    async createAutoFollow(creatorId: string, createdBy: string) {
        try {

            return await this.model.create({
                creatorId,
                createdBy
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create auto follow in Service.');
        }
    }

    async changeAutoFollow(token: string, input: ChangeAutoFollowInput) {
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
            throw new Error('Failed to change auto follow in Service.');
        }
    }

    private async ownerCreatorCheck(token: string, promotionReactivatorId: string) {
        const user = await userService.getUserByToken(token) as IUser;
        const promotionReactivator = await this.model.findById(promotionReactivatorId) as IAutoFollow;
        const creator = await creatorService.getCreatorById(promotionReactivator.creatorId.toString()) as ICreator;

        if(user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

export default new AutoFollowService;

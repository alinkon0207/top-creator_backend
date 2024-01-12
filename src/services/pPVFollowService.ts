import PPVFollowModel from '../models/PPVFollowModel';
import userService from './UserService';
import { validateChangePPVFollow, validateCreatePPVFollow } from '../validation/pPVFollowValidation';
import { ChangePpvFollowInput } from '../generated/graphql';
import IUser from '../types/IUser';
import IPPVFollow from '../types/IPPVFollow';
import CreatorService from './CreatorService';
import ICreator from '../types/ICreator';
import { checkCreatorOwner } from '../utils/checkCreatorOwner';

export interface CreatePPVFollowInput {
    creatorId: string;
    active?: boolean;
    include?: boolean;
    time?: number;
}

class PPVFollowService {
    private model: typeof PPVFollowModel = PPVFollowModel;

    async getById(id: string) {
        try {

            return await this.model.findById(id);
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get pPVFollow by id.');
        }
    }

    async getPPVFollowByCreatorId(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            return await this.model.findOne({
                creatorId,
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get pPVFollow.');
        }
    }

    async createPPVFollow(token: string, input: CreatePPVFollowInput) {
        try {
            await validateCreatePPVFollow(input);

            const user = await userService.getUserByToken(token) as IUser;

            return await this.model.create({
                ...input,
                createdBy: user.id
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create pPVFollow.');
        }
    }

    async changePPVFollow(token: string, input: ChangePpvFollowInput) {
        try {
            await validateChangePPVFollow(input);
            const pPVFollow = await this.model.findOne({ _id: input.id }) as IPPVFollow;

            await checkCreatorOwner(token, pPVFollow.creatorId.toString());

            return await this.model.findByIdAndUpdate(
                { _id: input.id },
                {
                    ...input
                },
                { new: true }
            );
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change pPVFollow.');
        }
    }
}

export const ppvFollowService = new PPVFollowService();

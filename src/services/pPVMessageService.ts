import PPVMessageModel from '../models/PPVMessageModel';
import { validateChangePpvMessage, validateCreatePpvMessage } from '../validation/pPVMessageValidation';
import { ChangePpvMessageInput, CreatePpvMessageInput } from '../generated/graphql';
import IPPVMessage from '../types/IPPVMessage';
import { checkCreatorOwner } from '../utils/checkCreatorOwner';

class PPVMessageService {
    private model: typeof PPVMessageModel = PPVMessageModel;

    async getById(id: string) {
        try {

            return await this.model.findById(id);
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get PPV message by id.');
        }
    }

    async getOnePPVMessage(token: string, pPVMessageId: string) {
        try {
            const pPVMessage = await this.getById(pPVMessageId) as IPPVMessage;

            await checkCreatorOwner(token, pPVMessage.creatorId.toString());

            return pPVMessage;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get one PPV message.');
        }
    }

    async getAllPPVMessage(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            return await this.model.find({creatorId} );
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get all PPV messages.');
        }
    }

    async createPPVMessage(token: string, input: CreatePpvMessageInput) {
        try {
            await validateCreatePpvMessage(input);
            await checkCreatorOwner(token, input.creatorId);

            return await this.model.create({
                ...input,
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create PPV message in Service.');
        }
    }

    async changePPVMessage(token: string, input: ChangePpvMessageInput) {
        try {
            await validateChangePpvMessage(input);
            const pPVMessage = await this.getById(input.id) as IPPVMessage;
            await checkCreatorOwner(token, pPVMessage.creatorId.toString());

            return await this.model.findOneAndUpdate({_id: input.id}, {
                ...input,
            }, {new: true});
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change PPV message in Service.');
        }
    }

    async deletePPVMessage(token: string, pPVMessageId: string) {
        try {
            const pPVMessage = await this.getById(pPVMessageId) as IPPVMessage;
            await checkCreatorOwner(token, pPVMessage.creatorId.toString());

            return await this.model.deleteOne({_id: pPVMessageId});
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete PPV message in Service.');
        }
    }
}

export const ppvMessageService = new PPVMessageService;

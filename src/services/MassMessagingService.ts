import mongoose from 'mongoose';
import MassMessagingModel from '../models/MassMessaging';
import userService from './UserService';
import MMMService from './MMMService';
import { checkCreatorOwner} from '../utils/checkCreatorOwner';
import { validateChangeMassMessaging, validateCreateMassMessaging } from '../validation/massMessagingValidation';
import { validateCreateMassMessageForMessaging } from '../validation/mMMValidation';
import { ChangeMassMessagingInput, CreateMassMessagingInput } from '../generated/graphql';
import IMassMessaging from '../types/IMassMessaging';
import IUser from '../types/IUser';
import IMMM from '../types/IMMM';
import IPopulateMassMessaging from '../types/IPopulateMassMessaging';

class MassMessagingService {
    private model: typeof MassMessagingModel = MassMessagingModel;

    async findById(id: string) {

        return this.model.findById(id);
    }

    async getOneMassMessaging(token: string, massMessagingId: string) {
        try {
            const massMessaging = await this.model.findById({ _id: massMessagingId }) as IMassMessaging;

            await checkCreatorOwner(token, massMessaging.creatorId.toString());

            return massMessaging;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get mass messaging in Service.');
        }
    }

    async getAllMassMessaging(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const result = await MassMessagingModel.aggregate([
                { $match: { creatorId: new mongoose.Types.ObjectId(creatorId) } },
                {
                    $lookup: {
                        from: 'massmessagingmessages',
                        localField: '_id',
                        foreignField: 'massMess',
                        as: 'messages'
                    }
                },
                {
                    $project: {
                        creatorId: 1,
                        status: 1,
                        startDate: 1,
                        endDate: 1,
                        excludeFans: 1,
                        activeSub: 1,
                        neverChatBefore: 1,
                        createdBy: 1,
                        messages: 1
                    }
                }
            ]) as any[];

            return result.map(item => {
                return {
                    id: item._id,
                    creatorId: item.creatorId,
                    status: item.status,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    excludeFans: item.excludeFans,
                    activeSub: item.activeSub,
                    neverChatBefore: item.neverChatBefore,
                    createdBy: item.createdBy,
                    massMessages: item.messages.map((message: IMMM) => {
                        return {
                            id: message._id,
                            text: message.text,
                            fallbackName: message.fallbackName,
                            media: message.media
                        };
                    })
                };
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get mass messaging in Service.');
        }
    }

    async createMassMessaging(token: string, input: CreateMassMessagingInput) {
        try {
            await validateCreateMassMessaging(input.massMessaging);
            await checkCreatorOwner(token, input.massMessaging.creatorId.toString());

            const user = await userService.getUserByToken(token) as IUser;

            const massMessaging = await this.model.create({
                ...input.massMessaging,
                createdBy: user.id
            });

            let messages;

            if (input.messages && input.messages.length > 0) {
                await validateCreateMassMessageForMessaging(input.messages);
                const createdMessages = await MMMService.createManyMassMessages(massMessaging.id, input.messages);
                messages = createdMessages.map(doc => {
                    const docObject = doc.toObject();
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { massMess, ...rest } = docObject;
                    return {
                        id: doc.id,
                        ...rest
                    };
                });
            }

            return {
                    ...massMessaging.toJSON(),
                    massMessages: messages
                };
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create mass messaging in Service.');
        }
    }

    async changeMassMessaging(token: string, input: ChangeMassMessagingInput) {
        try {
            await validateChangeMassMessaging(input);
            const massMessaging = await this.model.findOne({ _id: input.id }) as IMassMessaging;

            await checkCreatorOwner(token, massMessaging.creatorId.toString());

            return await this.model.findOneAndUpdate(
                {_id: input.id},
                {
                    ...input
                },
                {new: true}
            );
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change mass messaging in Service.');
        }
    }

    async duplicateMassMessaging(token: string, massMessagingId: string) {
        try {
            const massMessaging = await this.model.findOne({ _id: massMessagingId }) as IMassMessaging;

            await checkCreatorOwner(token, massMessaging.creatorId.toString());

            const user = await userService.getUserByToken(token) as IUser;

            const newMassMessagingData = {
                ...massMessaging.toObject(),
                creatorId: user.id,
                _id: new mongoose.Types.ObjectId(),
                __v: undefined,
            };

            return await this.model.create(newMassMessagingData);
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to duplicate mass messaging in Service.');
        }
    }

        async fetchMassMessagingDocuments() {
            try {
                const currentDate = new Date();
                currentDate.setSeconds(0, 0);
        
                const nextMinuteDate = new Date(currentDate);
                nextMinuteDate.setMinutes(currentDate.getMinutes() + 1); 
                
                const aggregateResults = await MassMessagingModel.aggregate([
                    {
                        $lookup: {
                            from: 'massmessagingmessages',
                            localField: '_id',
                            foreignField: 'massMess',
                            as: 'messages'
                        }
                    },
                    {
                        $project: {
                            creatorId: 1,
                            status: 1,
                            startDate: 1,
                            endDate: 1,
                            excludeFans: 1,
                            activeSub: 1,
                            neverChatBefore: 1,
                            createdBy: 1,
                            messages: 1
                        }
                    }
                ])
                
                const documents = await MassMessagingModel.find({ 
                    startDate: { 
                        $gte: currentDate, 
                        $lt: nextMinuteDate 
                    }
                }).populate({
                    path: 'creatorId'
                }) as IPopulateMassMessaging[];

                const combinedResults = documents.map(doc => {
                    const aggregateData = aggregateResults.find(aggr => aggr._id.equals(doc._id));
                    return {
                        ...doc.toObject(),
                        messages: aggregateData.messages
                    };
                });
                
                return combinedResults;
            } catch (error) {
                console.error('Error fetching documents:', error);
                return []; 
            } 
        }
    
}

export default new MassMessagingService();

import MassMessagingService from '../services/MassMessagingService';
import ScraperService from '../services/ScraperService';
import { CreatorAuth } from '../generated/graphql';
import cron from 'node-cron';
import IPopulateMassMessagingMessage from '../types/IPopulateMassMessagingMessage';
import IChatsOnlyFans from '../types/IChatsOnlyFans';

export function cronMassMessage() {
    cron.schedule('* * * * *', async () => {
        const documents = await MassMessagingService.fetchMassMessagingDocuments() as IPopulateMassMessagingMessage[];
        if (documents) {
            for (const document of documents) {
                for (const message of document.messages) {
                    const chats = await ScraperService.getChatsForMassMessaging(String(document.creatorId._id)) as IChatsOnlyFans[];
                    const sendMessagesPromises = chats.map(async chat => {
                            const replacements = {
                                '%firstfanname%': chat.name.split(' ')[0] || message.fallbackName,
                                '%ufirstfanname%': chat.name.split(' ')[0].toUpperCase() || message.fallbackName,
                                '%lfirstfanname%': chat.name.split(' ')[0].toLowerCase() || message.fallbackName,
                                '%fanname%': chat.name || message.fallbackName,
                                '%ufanname%': chat.name.toUpperCase() || message.fallbackName,
                                '%lfanname%': chat.name.toLowerCase() || message.fallbackName,
                                '%customname%': chat.displayName || message.fallbackName,
                                '%ucustomname%': chat.displayName.toUpperCase() || message.fallbackName,
                                '%lcustomname%': chat.displayName.toLowerCase() || message.fallbackName,
                            };
                        const modifiedText = message.text.replace(
                                /%firstfanname%|%ufirstfanname%|%lfirstfanname%|%fanname%|%ufanname%|%lfanname%|%customname%|%ucustomname%|%lcustomname%/g,
                                (match) => replacements[match as keyof typeof replacements]
                        );
                        const data = {
                            isCouplePeopleMedia: false,
                            isForward: false,
                            lockedText: false,
                            mediaFiles: [],
                            previews: [],
                            price: 0,
                            text: modifiedText
                        };
                        const messageSendPath = `${process.env.ONLYFANS_API_PATH}/chats/${chat.id}/messages`;
                        return ScraperService.postDataCustom(messageSendPath, document.creatorId.creatorAuth as CreatorAuth, data);
                    });

                    await Promise.all(sendMessagesPromises);
                }
            }
        }
    });
}

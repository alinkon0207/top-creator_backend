import axios from 'axios';
import CreatorModel from '../models/CreatorModel';
import creatorService from './CreatorService';
import {createHeaders, getRules} from '../utils/scraperConfigUtils';
import {
    addPPVToCategory,
    addPPVToOneCategory,
    aggregateChartData,
    calculateBestHour,
    calculateWeekDaysStats,
    countPaymentsPerDay,
    extractCertainPPVMessage,
    extractCharts,
    extractIdsChats,
    extractLatestUsers,
    extractNeccessaryInto,
    extractNeccessaryOnePPVInfo,
    extracTrackingInfo,
    extractTopFans,
    extractTopUsers,
    extractTopUsersTransactions,
    extractTotalCharts,
    extractUserIds,
    extractVaultCategories,
    extractVisitors,
    getChatIdUsingMessageId,
    getCompositionFromTransactions,
    getCounts,
    getCountSubscriptionsFromLatestUsers,
    getSubscription,
    getTurnover,
    subscriptionsFromLatestUsers,
    updateAmountStats
} from '../utils/scraperUtils';
import {formatDate} from '../utils/formatDate';
import {generateDateRangeAmountStats} from '../utils/generateDateRangeAmountStats';
import {
    ChatterDetailed,
    ChatterShort,
    CreatorAuth,
    GetChattersTrackingInput,
    GetCreatorStatisticInput,
    GetDatesCreatorIdInput,
    GetDetailedStatisticInput,
    GetOneChatterTrackingInput,
    GetOverallDetailedComparisonResponse,
    GetOverallStatisticInput,
    GetPpvTrackingFolderInput,
    GetPpvTrackingFolderMessagesInput
} from '../generated/graphql';
import IMassMessagePOSTData from '../types/IMassMessagePOSTData';
import ICreator from '../types/ICreator';

class ScraperService {

    async getPublicData(id: string) {
        try {
            const path = `${process.env.ONLYFANS_API_PATH}/users/${id}`;
            const auth = {
                'user-agent': process.env.USER_AGENT,
                'x-bc': process.env.X_BC,
                'user-id': process.env.USER_ID,
                'cookie': process.env.COOKIE
            };

            const rules = {
                ...await getRules(),
                ...auth
            };

            const headers = createHeaders(path, rules);
            const response = await axios.get(`${process.env.ONLYFANS_URL}${path}`, {
                headers
            });

            if (!response.data) {
                throw new Error('Response data is undefined');
            }

            return{
                avatarURL: response.data.avatar,
                userName: response.data.name,
                user_id: response.data.id,
                joinDate: response.data.joinDate
            };
        } catch (err: any) {
            console.error('Error:', err.data);
            throw err;
            //return { photoUrl: 'Undefined', name: `${process.env.CLIENT_URL}/default_logo.png` };
        }
    }

    async getCreatorStatistic(token: string, input: GetCreatorStatisticInput) {
        try {
            const { startDate, endDate, creatorId } = input;

            const creator = await creatorService.getCreatorById(creatorId) as ICreator;

            if (!creator.creatorAuth) {
                throw new Error ('CreatorAuth is undefined');
            }

            /* const startDateFormatted = formatDateForURL(startDate);
            const endDateFormatted = formatDateForURL(endDate); */

            const DATES_FILTER = `?startDate=${startDate}&endDate=${endDate}`;
            const START_DATE_FILTER = `?startDate=${startDate}`;
            const AMOUNT_FILTER = '' +
                '&withTotal=true' +
                '&filter[total_amount]=total_amount' +
                '&filter[subscribes_amount]=subscribes_amount' +
                '&filter[tips_amount]=tips_amount' +
                '&filter[post_amount]=post_amount' +
                '&filter[messages_amount]=messages_amount' +
                '&filter[ref_amount]=ref_amount' +
                '&filter[stream_amount]=stream_amount';

            const chartPath = `${process.env.ONLYFANS_API_PATH}/earnings/chart${DATES_FILTER}${AMOUNT_FILTER}`;
            const subscriptionPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/chart${DATES_FILTER}&by=total`;
            const fansPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/top${DATES_FILTER}&by=total&offset=0`;
            const transactions = `${process.env.ONLYFANS_API_PATH}/payouts/transactions${START_DATE_FILTER}`;

            const chartResponse = await this.scrapeDataCustom(chartPath, creator.creatorAuth);
            const turnover = getTurnover(chartResponse.data);

            const transactionsResponse = await this.scrapeDataCustom(transactions, creator.creatorAuth);

            const daysFromDateFilter = chartResponse.data.total.chartAmount.length;

            const bestHour = calculateBestHour(transactionsResponse.data.list, daysFromDateFilter);
            const composition = getCompositionFromTransactions(transactionsResponse.data.list);
            console.log(composition);
            const amountStats = generateDateRangeAmountStats(startDate, endDate, 'amount');

            composition[0].amountStats = updateAmountStats(amountStats, composition[0]?.amountStats, 'amount');
            composition[1].amountStats = updateAmountStats(amountStats, composition[1]?.amountStats, 'amount');
            composition[2].amountStats = updateAmountStats(amountStats, composition[2]?.amountStats, 'amount');

            const subscriptionResponse = await this.scrapeDataCustom(subscriptionPath, creator.creatorAuth);
            const subscription = getSubscription(subscriptionResponse.data);

            const fansResponse = await this.scrapeDataCustom(fansPath, creator.creatorAuth);
            const topFans = extractTopFans(fansResponse.data);

            const bestDay = calculateWeekDaysStats(chartResponse.data.total.chartAmount);

            return {
                turnover,
                subscription,
                topFans,
                bestDay,
                bestHour,
                composition
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getDetailedStatistic(token: string, input: GetDetailedStatisticInput) {
        try {
            const { startDate, endDate, creatorId } = input;

            const creator = await creatorService.getCreatorById(creatorId) as ICreator;

            if (!creator.creatorAuth) {
                throw new Error ('CreatorAuth is undefined');
            }

            const DATES_FILTER = `?startDate=${startDate}&endDate=${endDate}`;
            const AMOUNT_FILTER = '' +
                '&withTotal=true' +
                '&filter[total_amount]=total_amount' +
                '&filter[subscribes_amount]=subscribes_amount' +
                '&filter[tips_amount]=tips_amount' +
                '&filter[post_amount]=post_amount' +
                '&filter[messages_amount]=messages_amount' +
                '&filter[ref_amount]=ref_amount' +
                '&filter[stream_amount]=stream_amount';

            const chartPath = `${process.env.ONLYFANS_API_PATH}/earnings/chart${DATES_FILTER}${AMOUNT_FILTER}`;
            const subscriptionLatestPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/latest${DATES_FILTER}&by=total&offset=0`;
            const chattersPath = `${process.env.ONLYFANS_API_PATH}/chats?limit=1000&offset=0&skip_users=all&order=recent`;
            const visitorsPath = `${process.env.ONLYFANS_API_PATH}/users/me/profile/stats${DATES_FILTER}&by=total&filter[]=chart`;

            const chartResponse = await this.scrapeDataCustom(chartPath, creator.creatorAuth);
            const subscriptionLatestResponse = await this.scrapeDataCustom(subscriptionLatestPath, creator.creatorAuth);
            const chattersResponse = await this.scrapeDataCustom(chattersPath, creator.creatorAuth);
            const visitorsResponse = await this.scrapeDataCustom(visitorsPath, creator.creatorAuth);

            const extractedData = extractCharts(chartResponse.data);
            const { totalRevenue, newSubsRevenue, tipsRevenue, messagesRevenue } = extractedData;
            const { newSubs } = subscriptionsFromLatestUsers(subscriptionLatestResponse.data.users);
            const chatters = extractUserIds(chattersResponse.data.list);
            const chatCreatedDates = await this.getFirstMessageDates(chatters, creator.creatorAuth);
            const openChatsPerDay = await this.countChatsPerDay(chatCreatedDates);
            const sellingChatsPerDay = await this.getSellingChats(chatters, creator.creatorAuth);
            const visitors = extractVisitors(visitorsResponse.data);

            return totalRevenue.map(revenue => {
                const revenueDate = formatDate(revenue.date);
                const subsData = newSubs.find(sub => sub.date === revenueDate) || { count: 0 };
                const newSubsRevenueData = newSubsRevenue.find(sub => sub.date === revenueDate) || { count: 0 };
                const tipsRevenueData = tipsRevenue.find(sub => sub.date === revenueDate) || { count: 0 };
                const messagesRevenueData = messagesRevenue.find(sub => sub.date === revenueDate) || { count: 0 };
                const openChats = openChatsPerDay[revenueDate] || 0;
                const sellingChats = sellingChatsPerDay[revenueDate] || 0;
                const visitorsData = visitors.find(sub => sub.date === revenueDate) || { count: 0 };

                return {
                    date: new Date(revenueDate),
                    totalRevenue: revenue.count,
                    newSubs: subsData.count,
                    newSubsRevenue: newSubsRevenueData.count,
                    tipsRevenue: tipsRevenueData.count,
                    messagesRevenue: messagesRevenueData.count,
                    openChats,
                    sellingChats,
                    linkClicks: visitorsData.count
                };
            });
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getOverallStatistic(token: string, input: GetOverallStatisticInput) {
        try {
            const { startDate, endDate, creatorIds } = input;

            const dateRangeArray = generateDateRangeAmountStats(startDate, endDate, 'count');
            const creators = await creatorService.getCreatorsByIds(creatorIds) as ICreator[];
            const tempCreators = [...creators];

            const DATES_FILTER = `?startDate=${startDate}&endDate=${endDate}`;
            const START_DATE_FILTER = `?startDate=${startDate}`;
            const AMOUNT_FILTER = '' +
                '&withTotal=true' +
                '&filter[total_amount]=total_amount' +
                '&filter[subscribes_amount]=subscribes_amount' +
                '&filter[tips_amount]=tips_amount' +
                '&filter[post_amount]=post_amount' +
                '&filter[messages_amount]=messages_amount' +
                '&filter[ref_amount]=ref_amount' +
                '&filter[stream_amount]=stream_amount';

            const chartPath = `${process.env.ONLYFANS_API_PATH}/earnings/chart${DATES_FILTER}${AMOUNT_FILTER}`;
            const subscriptionLatestPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/latest${DATES_FILTER}&by=total&offset=0`;
            const transactions = `${process.env.ONLYFANS_API_PATH}/payouts/transactions${START_DATE_FILTER}`;


            if (!tempCreators[0].creatorAuth) {
                throw new Error ('CreatorAuth is undefined');
            }

/*             const overallChartResponse = await this.scrapeDataCustom(chartPath, tempCreators[0].creatorAuth);
            console.log('overallChartResponse', overallChartResponse.data);
            console.log('tips', overallChartResponse.data.tips.total);
            console.log('messages', overallChartResponse.data.chat_messages.total);
            console.log('subscriptions', overallChartResponse.data.subscribes.total); */

            const allTurnovers = [];
            const allNewSubs = [];
            const allPurchases = [];
            let subsIncomeInfo = 0.0;
            let messIncomeInfo = 0.0;
            let tipsIncomeInfo = 0.0;

            for (const creator of tempCreators) {
                if (!creator.creatorAuth) {
                    throw new Error('CreatorAuth is undefined');
                }

                let transactionsResponse;
                let subscriptionLatestResponse;
                let chartResponse;

                [chartResponse, subscriptionLatestResponse, transactionsResponse] = await Promise.all([
                    this.scrapeDataCustom(chartPath, creator.creatorAuth),
                    this.scrapeDataCustom(subscriptionLatestPath, creator.creatorAuth),
                    this.scrapeDataCustom(transactions, creator.creatorAuth)
                ]);

                const turnover = getTurnover(chartResponse.data).chart;
                allTurnovers.push(turnover);

                const { newSubs } = subscriptionsFromLatestUsers(subscriptionLatestResponse.data.users);
                allNewSubs.push(newSubs);


                const purchases = countPaymentsPerDay(transactionsResponse.data.list);

                allPurchases.push(purchases);

                subsIncomeInfo += Number(chartResponse.data.subscribes.total);
                messIncomeInfo += Number(chartResponse.data.chat_messages.total);
                tipsIncomeInfo += Number(chartResponse.data.tips.total);
            }

            const overallTurnover = aggregateChartData(allTurnovers);

            const overallNewSubs = aggregateChartData(allNewSubs);
            overallNewSubs.chart = updateAmountStats(dateRangeArray, overallNewSubs.chart, 'count');

            const overallPurchases = aggregateChartData(allPurchases);
            overallPurchases.chart = updateAmountStats(dateRangeArray, overallPurchases.chart, 'count');

            return {
                totalTurnover: overallTurnover,
                totalNewSubs: overallNewSubs,
                totalPurchases: overallPurchases,
                totalEarnings: overallTurnover.chart,
                incomeInfo: {
                    subscription: subsIncomeInfo,
                    messages: messIncomeInfo,
                    tips: tipsIncomeInfo
                }
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getOverallDetailedComparison(token: string, input: GetOverallStatisticInput): Promise<GetOverallDetailedComparisonResponse[]> {
        try {
            const { startDate, endDate, creatorIds } = input;
            const creators = await creatorService.getCreatorsByIds(creatorIds) as ICreator[];

            const DATES_FILTER = `?startDate=${startDate}&endDate=${endDate}`;
            const AMOUNT_FILTER = '&withTotal=true' +
                '&filter[total_amount]=total_amount' +
                '&filter[subscribes_amount]=subscribes_amount' +
                '&filter[tips_amount]=tips_amount' +
                '&filter[post_amount]=post_amount' +
                '&filter[messages_amount]=messages_amount' +
                '&filter[ref_amount]=ref_amount' +
                '&filter[stream_amount]=stream_amount';

            const chartPath = `${process.env.ONLYFANS_API_PATH}/earnings/chart${DATES_FILTER}${AMOUNT_FILTER}`;
            const subscriptionLatestPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/latest${DATES_FILTER}&by=total&offset=0`;
            const chattersPath = `${process.env.ONLYFANS_API_PATH}/chats?limit=1000&offset=0&skip_users=all&order=recent`;

            return await Promise.all(creators.map(async creator => {
                if (!creator.creatorAuth) {
                    throw new Error('CreatorAuth is undefined');
                }

                const [chartResponse, subscriptionLatestResponse, chattersResponse] = await Promise.all([
                    this.scrapeDataCustom(chartPath, creator.creatorAuth),
                    this.scrapeDataCustom(subscriptionLatestPath, creator.creatorAuth),
                    this.scrapeDataCustom(chattersPath, creator.creatorAuth)
                ]);

                const extractedData = extractTotalCharts(chartResponse.data);
                const {
                    totalRevenue,
                    newSubsRevenue,
                    tipsRevenue,
                    messagesRevenue
                } = extractedData;
                const newSubs = getCountSubscriptionsFromLatestUsers(subscriptionLatestResponse.data.users);

                const chatters = extractUserIds(chattersResponse.data.list);
                const chatCreatedDates = await this.getFirstMessageDates(chatters, creator.creatorAuth);
                const openChatsPerDay = await this.countChatsPerDay(chatCreatedDates);
                const countOpenChats = getCounts(openChatsPerDay);
                const sellingChatsPerDay = await this.getSellingChats(chatters, creator.creatorAuth);
                const sellingChats = getCounts(sellingChatsPerDay);

                return {
                    creatorId: creator.id || '',
                    creatorName: creator.userName || '',
                    totalRevenue: totalRevenue || 0,
                    newSubs: newSubs || 0,
                    newSubsRevenue: newSubsRevenue || 0,
                    recSubsRevenue: 0,
                    tipsRevenue: tipsRevenue || 0,
                    messagesRevenue: messagesRevenue || 0,
                    textingRation: 0,
                    openChats: countOpenChats || 0,
                    sellingChats: sellingChats || 0
                };
            }));
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getChattersTracking(token: string, input: GetChattersTrackingInput) {
        try {
            const { startDate, endDate, creatorId } = input;

            const creator = await creatorService.getCreatorById(creatorId) as ICreator;

            if (!creator.creatorAuth) {
                throw new Error ('CreatorAuth is undefined');
            }

            const DATES_FILTER = `?startDate=${startDate}&endDate=${endDate}`;

            const subscriptionTopPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/top${DATES_FILTER}&by=total&offset=0`;
            const subscriptionLatestPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/subscribers/latest${DATES_FILTER}&by=total&offset=0`;
            const transactionsPath = `${process.env.ONLYFANS_API_PATH}/payouts/transactions${DATES_FILTER}`;

            const subscriptionTopResponse = await this.scrapeDataCustom(subscriptionTopPath, creator.creatorAuth);
            const subscriptionLatestResponse = await this.scrapeDataCustom(subscriptionLatestPath, creator.creatorAuth);
            const transactionsResponse = await this.scrapeDataCustom(transactionsPath, creator.creatorAuth);

            const topChattersChart = extractTopUsers(subscriptionTopResponse.data.users) as ChatterShort[];
            const chatterTable = extractLatestUsers(subscriptionLatestResponse.data.users) as ChatterDetailed[];
            const revenueChart = extractTopUsersTransactions(transactionsResponse.data.list, topChattersChart);

            const amountStats = generateDateRangeAmountStats(startDate, endDate, 'received');

            revenueChart.forEach((chartItem, index) => {
                if (index < revenueChart.length) {
                    chartItem.receivedHistory = updateAmountStats(amountStats, chartItem.receivedHistory, 'received');
                }
            });


            //revenueChart - I have no idea how to get it
            //MAYBE FROM TRANSACTIONS?

            return {
                topChattersChart,
                revenueChart,
                chatterTable,
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getOneChatterTracking(token: string, input: GetOneChatterTrackingInput) {
        try {
            const { startDate, endDate, chatterId, creatorId } = input;

            const dateRangeWithZeros = generateDateRangeAmountStats(startDate, endDate, 'count');

/*
            const creator = await creatorService.getCreatorById(creatorId) as ICreator;

            if (!creator.creatorAuth) {
                throw new Error ('CreatorAuth is undefined');
            }

            //const subscriptionHistoryPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/${chatterId}/history?startDate=${startDate}&endDate=${endDate}`;
            const subscriptionHistoryPath = `${process.env.ONLYFANS_API_PATH}/subscriptions/${chatterId}/history?all=1`;
            const messagesHistoryPath = `${process.env.ONLYFANS_API_PATH}/chats/${chatterId}/messages?limit=1000&order=desc&skip_users=all`;

            //const subscriptionHistoryResponse = await this.scrapeDataCustom(subscriptionHistoryPath, creator.creatorAuth);
            //console.log('subscriptionHistoryResponse', subscriptionHistoryResponse.data);

            const messagesHistoryResponse = await this.scrapeDataCustom(messagesHistoryPath, creator.creatorAuth);
            const sentMessages = extractSentMessages(messagesHistoryResponse.data.list);
*/
            const sentMessagesChart = dateRangeWithZeros.map(dateObj => ({
                date: new Date(dateObj.date),
                count: 0
            }));

            const totalSalesChart = dateRangeWithZeros.map(dateObj => ({
                date: new Date(dateObj.date).toISOString(),
                ppvRevenue: 0,
                tipsRevenue: 0
            }));

            const totalSales = {
                chart: totalSalesChart,
                total: 0
            };

            const ppvPurchaseRate = {
                chart: sentMessagesChart.map(dateObj => ({
                    ...dateObj,
                    sendPPV: 0,
                    boughtPPV: 0
                })),
                percent: 0
            };

            const keystrokes = {
                chart: sentMessagesChart,
                count: 0
            };

            const onlineTime = {
                activeTime: 3600,
                inActiveTime: 3600,
                onlineTime: 7200
            };

            return {
                totalSales,
                ppvPurchaseRate,
                sentMessages: {
                    chart: sentMessagesChart,
                    count: 0
                },
                keystrokes,
                onlineTime,
                date: new Date(),
                totalRevenue: 0,
                newSubs: 0,
                newSubsRevenue: 0,
                recSubsRevenue: 0,
                tipsRevenue: 0,
                messagesRevenue: 0,
                textingRation: 0,
                openChats: 0,
                sellingChats: 0,
                linkClicks: 0,
                conversionRate: 0
            };

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }


    async getChatsForMassMessaging(creatorId: string) {
        try {

            const creator = await creatorService.getCreatorById(creatorId) as ICreator;

            if (!creator.creatorAuth) {
                throw new Error ('CreatorAuth is undefined');
            }

            const allChatsPath = `${process.env.ONLYFANS_API_PATH}/chats?limit=1000&offset=0&skip_users=all&order=recent`;
            const allChatsArray = await this.scrapeDataCustom(allChatsPath, creator.creatorAuth);

            let chatIds;
            if (allChatsArray) {
                chatIds = allChatsArray.data.list.map((chat: { withUser: { id: number;_view: string }; }) => chat.withUser.id);
            }

            let chatIdsQueryParam;
            if (chatIds){
                chatIdsQueryParam = chatIds.map((id: number) => `cl[]=${id}`).join('&');
            }

            const allUserChatsPath = `${process.env.ONLYFANS_API_PATH}/users/list?${chatIdsQueryParam}`;
            const allUserChatsObject = await this.scrapeDataCustom(allUserChatsPath, creator.creatorAuth);

            return Object.values(allUserChatsObject.data);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getPPVTracking(token: string, input: GetDatesCreatorIdInput) {
        try {
            const { startDate, endDate, creatorId } = input;

            const creator = await CreatorModel.findById(creatorId) as ICreator;

            if (!creator.creatorAuth){
                throw new Error('Creater wasn\'t found');
            }

            const allCategoriesPath = `${process.env.ONLYFANS_API_PATH}/vault/lists?view=main&offset=0&limit=100`;

            const allCategoriseResponse = await this.scrapeDataCustom(allCategoriesPath, creator.creatorAuth);
            // all, custom
            const vaultCategoriesResponse = extractVaultCategories(allCategoriseResponse.data) as any;
            // custom
            let customCategories: any[] = [];
            if (vaultCategoriesResponse.custom) {
                for (const document of vaultCategoriesResponse.custom) {
                const oneCategoryPath = `${process.env.ONLYFANS_API_PATH}/vault/media?limit=24&offset=0&field=recent&sort=desc&list=${document.dataId}`;

                const oneCategoryResponse = await this.scrapeDataCustom(oneCategoryPath, creator.creatorAuth);
                customCategories = [...customCategories, {medias: oneCategoryResponse.data.list, name: document.name, id: document.dataId}];
            }
            }

            const allChatsPath = `${process.env.ONLYFANS_API_PATH}/chats?limit=1000&offset=0&skip_users=all&order=recent`;

            const allChatsResponse = await this.scrapeDataCustom(allChatsPath, creator.creatorAuth);
            // all, custom
            const allChatIds = extractIdsChats(allChatsResponse.data) as any;
            let allPPVs: any[] = [];
            if (allChatIds) {
                for (const id of allChatIds) {
                    const oneChatMessagePath = `${process.env.ONLYFANS_API_PATH}/chats/${id}/messages?limit=10&order=desc&skip_users=all`;
                    const oneChatMessageResponse = await this.scrapeDataCustom(oneChatMessagePath, creator.creatorAuth);
                    const trackingInfo = extracTrackingInfo(oneChatMessageResponse.data) as any;
                    allPPVs = [...allPPVs, ...trackingInfo];
                }
            }
            const categoryDone = addPPVToCategory(customCategories, allPPVs);
            return extractNeccessaryInto(categoryDone);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getPPVTrackingFolder (token: string, input: GetPpvTrackingFolderInput) {
        try {
            const { startDate, endDate, creatorId, folderId} = input;

            const creator = await CreatorModel.findById(creatorId) as ICreator;

            if (!creator.creatorAuth){
                throw new Error('Creater wasn\'t found');
            }

            // all, custom
            const oneCategoryNamePath = `${process.env.ONLYFANS_API_PATH}/vault/lists/16550263`;
            const oneCategoryNameResponse = await this.scrapeDataCustom(oneCategoryNamePath, creator.creatorAuth);

            const oneCategoryPath = `${process.env.ONLYFANS_API_PATH}/vault/media?limit=24&offset=0&field=recent&sort=desc&list=${folderId}`;
            const oneCategoryResponse = await this.scrapeDataCustom(oneCategoryPath, creator.creatorAuth);

            const customCategory = {medias: oneCategoryResponse.data.list, name: oneCategoryNameResponse.data.name, id: folderId};

            const allChatsPath = `${process.env.ONLYFANS_API_PATH}/chats?limit=1000&offset=0&skip_users=all&order=recent`;

            const allChatsResponse = await this.scrapeDataCustom(allChatsPath, creator.creatorAuth);
            // all, custom
            const allChatIds = extractIdsChats(allChatsResponse.data) as any;
            let allPPVs: any[] = [];
            if (allChatIds) {
                for (const id of allChatIds) {
                    const oneChatMessagePath = `${process.env.ONLYFANS_API_PATH}/chats/${id}/messages?limit=10&order=desc&skip_users=all`;
                    const oneChatMessageResponse = await this.scrapeDataCustom(oneChatMessagePath, creator.creatorAuth);
                    const trackingInfo = extracTrackingInfo(oneChatMessageResponse.data) as any;
                    allPPVs = [...allPPVs, ...trackingInfo];
                }
            }
            console.log(customCategory)
            const categoryDone = addPPVToOneCategory(customCategory, allPPVs);
            const returnInfo = extractNeccessaryOnePPVInfo(categoryDone, customCategory.name);
            return returnInfo;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getPPVTrackingFolderMessages (token: string, input: GetPpvTrackingFolderMessagesInput) {
        try {
            const { startDate, endDate, creatorId, folderId, ppvId} = input;

            const creator = await CreatorModel.findById(creatorId) as ICreator;

            if (!creator.creatorAuth){
                throw new Error('Creater wasn\'t found');
            }

            // all, custom
            const oneCategoryNamePath = `${process.env.ONLYFANS_API_PATH}/vault/lists/16550263`;
            const oneCategoryNameResponse = await this.scrapeDataCustom(oneCategoryNamePath, creator.creatorAuth);

            const oneCategoryPath = `${process.env.ONLYFANS_API_PATH}/vault/media?limit=24&offset=0&field=recent&sort=desc&list=${folderId}`;
            const oneCategoryResponse = await this.scrapeDataCustom(oneCategoryPath, creator.creatorAuth);

            const customCategory = {medias: oneCategoryResponse.data.list, name: oneCategoryNameResponse.data.name, id: folderId};

            const allChatsPath = `${process.env.ONLYFANS_API_PATH}/chats?limit=1000&offset=0&skip_users=all&order=recent`;
            const chatId: any[] = [];
            const allChatsResponse = await this.scrapeDataCustom(allChatsPath, creator.creatorAuth);
            // all, custom
            const allChatIds = extractIdsChats(allChatsResponse.data) as any;
            let allPPVs: any[] = [];
            if (allChatIds) {
                for (const id of allChatIds) {
                    const oneChatMessagePath = `${process.env.ONLYFANS_API_PATH}/chats/${id}/messages?limit=10&order=desc&skip_users=all`;
                    const oneChatMessageResponse = await this.scrapeDataCustom(oneChatMessagePath, creator.creatorAuth);
                    const trackingInfo = extracTrackingInfo(oneChatMessageResponse.data) as any;
                    chatId.push(getChatIdUsingMessageId(oneChatMessageResponse.data, ppvId, id) as any);
                    allPPVs = [...allPPVs, ...trackingInfo];
                }
            }
            const categoryDone = addPPVToOneCategory(customCategory, allPPVs);
            const returnInfo = extractNeccessaryOnePPVInfo(categoryDone, customCategory.name);
            const messages = extractCertainPPVMessage(returnInfo, ppvId, chatId.toString().replace(/,/g, ''));
            console.log(messages[0]);
            return messages[0];
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    private async scrapeDataCustom(path: string, creatorAuth: CreatorAuth){
        try {
            const auth = {
                'user-agent': creatorAuth.user_agent || '',
                'x-bc': creatorAuth.x_bc || '',
                'user-id': creatorAuth.user_id || '',
                'cookie': creatorAuth.cookie || ''
            };

            const rules = {
                ...await getRules(),
                ...auth
            };

            const headers = createHeaders(path, rules);

            return await axios.get(`${process.env.ONLYFANS_URL}${path}`, {
                headers
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch scraper.');
        }
    }

    async postDataCustom(path: string, creatorAuth: CreatorAuth, data: IMassMessagePOSTData) {
        try {
            const auth = {
                'user-agent': creatorAuth.user_agent || '',
                'x-bc': creatorAuth.x_bc || '',
                'user-id': creatorAuth.user_id || '',
                'cookie': creatorAuth.cookie || ''
            };

            const rules = {
                ...await getRules(),
                ...auth
            };

            const headers = createHeaders(path, rules);

            return await axios.post(`${process.env.ONLYFANS_URL}${path}`, data, {
                headers,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    private async getFirstMessageDates(chatters: number[], creatorAuth: CreatorAuth) {
        const chatFirstMessageDates: { [key: number]: string } = {};

        for (const chatterId of chatters) {
            const messagesPath = `${process.env.ONLYFANS_API_PATH}/chats/${chatterId}/messages?limit=1000&order=desc&skip_users=all`;
            const messagesResponse = await this.scrapeDataCustom(messagesPath, creatorAuth);
            const messages = messagesResponse.data.list;

            if (messages.length > 0) {
                const firstMessage = messages[messages.length - 1];
                chatFirstMessageDates[chatterId] = formatDate(firstMessage.createdAt);
            }
        }

        return chatFirstMessageDates;
    }

    private async countChatsPerDay(chatCreatedDates: { [key: number]: string }) {
        const chatCountsPerDay: { [date: string]: number } = {};

        Object.values(chatCreatedDates).forEach(date => {
            if (!chatCountsPerDay[date]) {
                chatCountsPerDay[date] = 0;
            }
            chatCountsPerDay[date]++;
        });

        return chatCountsPerDay;
    }

    private async getSellingChats(chatters: number[], creatorAuth: CreatorAuth) {
        const sellingChatsCountPerDay: { [date: string]: number } = {};

        for (const chatterId of chatters) {
            const messagesPath = `${process.env.ONLYFANS_API_PATH}/chats/${chatterId}/messages?limit=1000&order=desc&skip_users=all`;
            const messagesResponse = await this.scrapeDataCustom(messagesPath, creatorAuth);
            const messages = messagesResponse.data.list;

            let chatDate = '';
            let hasTip = false;

            for (const message of messages) {
                if (message.tipAmount || message.price > 0) {
                    chatDate = formatDate(message.createdAt);
                    hasTip = true;
                    break;
                }
            }

            if (hasTip) {
                if (!sellingChatsCountPerDay[chatDate]) {
                    sellingChatsCountPerDay[chatDate] = 0;
                }
                sellingChatsCountPerDay[chatDate]++;
            }
        }

        return sellingChatsCountPerDay;
    }
}

export default new ScraperService();

import { WeekDay } from '../constants/weekDay';
import { formatDate } from './formatDate';
import { TransactionType } from '../constants/TransactionType';
import { Best, Chart, ChatterShort, Composition, RevenueChart, SentMessages } from '../generated/graphql';

interface ChartItem {
    date: string;
    count: number;
}

interface ExtractedCharts {
    totalRevenue: ChartItem[];
    newSubsRevenue: ChartItem[];
    tipsRevenue: ChartItem[];
    messagesRevenue: ChartItem[];
}

interface ExtractedTotalCharts {
    totalRevenue: number;
    newSubsRevenue: number;
    tipsRevenue: number;
    messagesRevenue: number;
}

export const getTurnover = (data: any) => {
    const chart = data.total.chartAmount;
    const total = data.total.total;

    return {
        chart,
        total
    };
};

export const getSubscription = (data: any) => {
    const chart = data.earnings;
    const total = data.total;

    return {
        chart,
        total
    };
};

export const extractTopFans = (data: any) => {
    if (!data || !data.users) {
        return [];
    }

    return data.users.map((user: any) => ({
        name: user.name,
        userName: user.username,
        avatarUrl: user.avatar || '',
        total: user.subscribedOnData.totalSumm
    }));
};

export const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);

    return date.getDay() as WeekDay ;
};

export const calculateWeekDaysStats = (data: ChartItem[]) => {
    const sums = Array(7).fill(0);
    const counts = Array(7).fill(0);

    data.forEach(item => {
        const dayOfWeek = getDayOfWeek(item.date);
        sums[dayOfWeek] += item.count;
        counts[dayOfWeek]++;
    });

    return sums.map((sum, i) => ({
        name: WeekDay[i],
        average: counts[i] ? (sum / counts[i]).toFixed(2) : '0.00'
    }));
};

export const calculateBestHour = (transactions: any, daysFromDateFilter: number): Best[] => {
    const segmentLength = 4;
    const segmentsPerDay = 24 / segmentLength;
    const sums = new Array(segmentsPerDay).fill(0);

    transactions.forEach((transaction: any) => {
        const createdAt = new Date(transaction.createdAt);
        const hour = createdAt.getUTCHours();
        const segmentIndex = Math.floor(hour / segmentLength);
        sums[segmentIndex] += transaction.amount;
    });

    const averages = sums.map((sum, i) => ({
        name: `${i * segmentLength}-${(i + 1) * segmentLength} h`,
        average: (sum / daysFromDateFilter).toFixed(2)
    })) as any;

    return averages as Best[];
};

export const getCompositionFromTransactions = (transactions: any): Composition[] => {
    const composition: any = {};

    transactions.forEach((transaction: any) => {
        const type = getTransactionType(transaction.description) as any;
        if (!composition[type]) {
            composition[type] = [];
        }

        if (!composition['tip']){
            composition['tip'] = [];
        }

        if (!composition['subscription']){
            composition['subscription'] = [];
        }

        if (!composition['message']){
            composition['message'] = [];
        }

        composition[type].push({
            date: new Date(transaction.createdAt),
            amount: transaction.amount || 0
        });
    });

    return Object.keys(composition).map(type => ({
        type: type,
        amountStats: composition[type]
    }));
};

const getTransactionType = (description: string): string => {
    switch (true) {
        case description.toLowerCase().includes(TransactionType.MESSAGE as string):
            return TransactionType.MESSAGE;
        case description.toLowerCase().includes(TransactionType.TIP as string):
            return TransactionType.TIP;
        case description.toLowerCase().includes(TransactionType.SUBSCRIPTION as string):
            return TransactionType.SUBSCRIPTION;
        default:
            return TransactionType.OTHER;
    }
};

export const updateAmountStats = (baseAmountStats: any, transactionAmountStats: any, keyToUpdate: string) => {
    const updatedStats = baseAmountStats.map((stat: any) => ({ ...stat }));
    if (transactionAmountStats !== undefined) {
        transactionAmountStats.forEach((transaction: any) => {
            const transactionDate = new Date(transaction.date).toISOString().split('T')[0];

            const matchingStat = updatedStats.find((stat: any) =>
                stat.date === transactionDate);

            if (matchingStat && transaction[keyToUpdate] !== undefined) {
                matchingStat[keyToUpdate] += transaction[keyToUpdate];
            }
        });} else{
        baseAmountStats.forEach((transaction: any) => {
            const transactionDate = new Date(transaction.date).toISOString().split('T')[0];

            const matchingStat = updatedStats.find((stat: any) =>
                stat.date === transactionDate);

            if (matchingStat && transaction[keyToUpdate] !== undefined) {
                matchingStat[keyToUpdate] += transaction[keyToUpdate];
            }
        })
    } 
    return updatedStats;
};

export const countPaymentsPerDay = (transactions: any) => {
    const paymentCounts: Record<string, number> = {};

    transactions.forEach((transaction: any) => {
        const date = transaction.createdAt.split('T')[0];

        if (paymentCounts[date]) {
            paymentCounts[date] += 1;
        } else {
            paymentCounts[date] = 1;
        }
    });

    return Object.entries(paymentCounts).map(([date, count]) => ({ date, count }));
};

export const aggregateChartData = (chartDataArrays: any): { total: number; chart: ChartItem[] } => {
    const combinedChart: Record<string, ChartItem> = {};
    let totalSum = 0;

    chartDataArrays.forEach((chart: any[]) => {
        chart.forEach((chartItem : ChartItem) => {
            const isoDate = formatDate(chartItem.date);
            if (combinedChart[isoDate]) {
                combinedChart[isoDate].count += chartItem.count;
            } else {
                combinedChart[isoDate] = { date: isoDate, count: chartItem.count };
            }
            console.log(chartItem.count);
            totalSum += chartItem.count;
        });
    });

    console.log(totalSum);

    return {
        chart: Object.values(combinedChart),
        total: totalSum
    };
};

export const extractTopUsers = (data: any) => {
    if (!data) {
        return [];
    }

    return data.map((user: any) => ({
        name: user.name,
        received: user.subscribedOnData ? user.subscribedOnData.totalSumm : 0
    }));
};

export const extractTopUsersTransactions = (transactions: any[], topUsers: ChatterShort[]): RevenueChart[] => {
    if (!transactions || !topUsers) {
        return [];
    }

    const filteredTransactions = transactions.filter(transaction =>
        topUsers.some(user => user.name === transaction.user.name)
    );

    const usersRevenue: { [key: string]: RevenueChart } = filteredTransactions.reduce((acc, transaction) => {
        const userName = transaction.user.name;
        if (!acc[userName]) {
            acc[userName] = { name: userName, receivedHistory: [] };
        }
        acc[userName].receivedHistory.push({
            date: new Date(transaction.createdAt),
            received: transaction.amount
        });
        return acc;
    }, {});

    return Object.values(usersRevenue);
};

export const extractLatestUsers = (data: any ) => {
    if (!data) {
        return [];
    }

    return data.map((user: any) => ({
        id: user.id,
        name: user.name,
        totalRevenue: user.subscribedOnData ? user.subscribedOnData.totalSumm : 0
    }));
};

export const extractSentMessages = (messages: any[]): SentMessages => {
    const messageCountByDate: { [date: string]: number } = {};

    messages.forEach(message => {

        const date = new Date(message.createdAt).toISOString().split('T')[0];
        if (!messageCountByDate[date]) {
            messageCountByDate[date] = 0;
        }
        messageCountByDate[date]++;
    });

    const chart = Object.entries(messageCountByDate).map(([date, count]) => ({
        date: new Date(date),
        count
    }));

    const totalCount = messages.length;

    return {
        chart,
        count: totalCount
    };
};

export const extractVisitors = (data: any) => {
    if (!data) {
        return [];
    }

    const visitors = data.chart.visitors as ChartItem[];

    return visitors.map(item => ({ ...item, date: formatDate(item.date) }));
};


export const subscriptionsFromLatestUsers = (users: any[]): { newSubs: Chart[], newSubsRevenue: Chart[] } => {
    const subscriptionsByDate: { [key: string]: { count: number, revenue: number } } = {};

    users.forEach(user => {
        user.subscribedOnData.subscribes.forEach((subscription: any) => {
            const date = new Date(subscription.date).toISOString().split('T')[0];
            if (!subscriptionsByDate[date]) {
                subscriptionsByDate[date] = { count: 0, revenue: 0 };
            }
            subscriptionsByDate[date].count += 1;
            subscriptionsByDate[date].revenue += subscription.price;
        });
    });

    const newSubs: Chart[] = [];
    const newSubsRevenue: Chart[] = [];

    Object.keys(subscriptionsByDate).forEach(date => {
        newSubs.push({ date, count: subscriptionsByDate[date].count });
        newSubsRevenue.push({ date, count: subscriptionsByDate[date].revenue });
    });

    return {
        newSubs,
        newSubsRevenue
    };
};

export const getCountSubscriptionsFromLatestUsers = (users: any[]) => {
    let totalSubscriptions: number = 0;

    users.forEach(user => {
        user.subscribedOnData.subscribes.forEach((subscription: any) => {
            totalSubscriptions += 1;
        });
    });

    return totalSubscriptions;
};

export const getCounts = (chats: {[key: string]: number}) => {
    let totalCount: number = 0;

    for (const count of Object.values(chats)) {
        totalCount += count;
    }

    return totalCount;
};

export const extractUserIds = (chats: any[]): number[] => {
    return chats.map(chat => chat.withUser.id);
};

export const extractCharts = (data: any): ExtractedCharts => {
    if (!data) {
        return { totalRevenue: [], newSubsRevenue: [], tipsRevenue: [], messagesRevenue: [] };
    }

    const totalRevenue = data.total.chartAmount as ChartItem[];
    const newSubsRevenue = data.subscribes.chartAmount as ChartItem[];
    const tipsRevenue = data.tips.chartAmount as ChartItem[];
    const messagesRevenue = data.chat_messages.chartAmount as ChartItem[];

    return {
        totalRevenue: totalRevenue.map(item => ({ ...item, date: formatDate(item.date) })),
        newSubsRevenue: newSubsRevenue.map(item => ({ ...item, date: formatDate(item.date) })),
        tipsRevenue: tipsRevenue.map(item => ({ ...item, date: formatDate(item.date) })),
        messagesRevenue: messagesRevenue.map(item => ({ ...item, date: formatDate(item.date) }))
    };
};

export const extractTotalCharts = (data: any): ExtractedTotalCharts => {
    if (!data) {
        return { totalRevenue: 0, newSubsRevenue: 0, tipsRevenue: 0, messagesRevenue: 0 };
    }

    const totalRevenue = data.total.total as number;
    const newSubsRevenue = data.subscribes.total as number;
    const tipsRevenue = data.tips.total as number;
    const messagesRevenue = data.chat_messages.total as number;

    return {
        totalRevenue,
        newSubsRevenue,
        tipsRevenue,
        messagesRevenue
    };
};

export const extractVaultCategories = (data: any) => {
    if (!data) {
        return [];
    }
    const all = data.all;
    const custom = data.list.filter((item: { type: string; }) => item.type === 'custom').map((item: any) => ({
        dataId: item.id,
        medias: item.medias,
        name: item.name
    }));

    const infoUrls = custom.flatMap((item: { medias: any[]; }) => item.medias.map(media => media.id));

    all.medias = all.medias.filter((media: { id: any; }) => !infoUrls.includes(media.id));

    return {all, custom};
};

export const extractIdsChats = (data: any) => {

    return data.list.map((item: any) => (
        item.withUser.id
    ));
};

export const extracTrackingInfo = (data: any) => {
    const ppv = data.list.filter((item: any ) => item.isFree === false).map((item: any) => (
        item
    ));
    return ppv;
};

export const getChatIdUsingMessageId = (data: any, ppvId: string, chatId: string) => {
    const ppv = data.list.filter((item: any ) => item.id == ppvId).map((item: any) => (
        chatId
    ));

    return ppv.toString();
};

export const addPPVToCategory = (custom: any, data: any) => {
    custom = custom.map((item: any) => {
        return { ...item, ppv: [] };
    });
    const info = data.forEach((ppv: { media: any[]; }) => {
        ppv.media.forEach(mediOone => {
            custom.forEach((customItem: { medias: any[]; ppv: any[] }) => {
                if (customItem.medias.some(customMedia => customMedia.id == mediOone.id)) {
                    customItem.ppv.push(ppv);
                }
            });
        });
    });
    return custom;
};

export const addPPVToOneCategory = (custom: any, data: any) => {
    custom = { ...custom, ppv: [] };
    data.forEach((ppv: { media: any[]; }) => {
        ppv.media.forEach(mediOone => {
            if (custom.medias.some((customMedia: { id: any; }) => customMedia.id == mediOone.id)) {
                custom.ppv.push(ppv);
            }
        });
    });
    return custom;
};


export const extractNeccessaryInto = (data: any) => {
    for (const object of data) {
        const revenue = object.ppv.reduce((sum: any, item: { isOpened: boolean; price: any; }) => {
            return item.isOpened === true ? sum + item.price : sum;
        }, 0);
        const purchases = object.ppv.filter((object: { isOpened: boolean; }) => object.isOpened === true).length;
        const noPurchases = object.ppv.filter((object: { isOpened: boolean; }) => object.isOpened === false).length;
        object.purchaseRate = 100/(purchases+noPurchases)*purchases || 0;
        object.purchases = purchases;
        object.revenue = revenue;
    }

    return data;
};

export const extractNeccessaryOnePPVInfo = (data: any, name: string) => {
    data.ppvFolders = data.ppv.map((obj: any) => ({
        createdAt: obj.createdAt,
        text: obj.text,
        sent: 1,
        bought: obj.isOpened,
        purchaseRate: obj.isOpened ? 100 : 0,
        netRevenue: obj.isOpened ? obj.price : 0,
        avgNetPrice: obj.isOpened ? obj.price : 0,
        ppvId: obj.id
    }));

        const revenue = data.ppv.reduce((sum: any, item: { isOpened: boolean; price: any; }) => {
            return item.isOpened === true ? sum + item.price : sum;
        }, 0);
        const purchases = data.ppv.filter((data: { isOpened: boolean; }) => data.isOpened === true).length;
        const noPurchases = data.ppv.filter((data: { isOpened: boolean; }) => data.isOpened === false).length;
        data.purchaseRate = 100/(purchases+noPurchases)*purchases || 0;
        data.purchases = purchases;
        data.revenue = revenue;
        data.name = name
        console.log(data)

    return data;
};

export const extractCertainPPVMessage = (data: any, messageId: string, chatId: string) => {
    const messages = data.ppv.filter((item: any) => item.id == messageId).map((obj: any) => ({
        text: obj.text,
        sentAt: obj.createdAt,
        purchased: obj.isOpened,
        sender: 'Creator',
        price: obj.price,
        messageId: `${process.env.CHAT_URL}/${chatId}`
    }));
    const info = data.ppv.filter((item: any) => item.id == messageId).map((obj: any) => ({
        sent: 1,
        bought: obj.isOpened ? 1 : 0,
        avgNetPrice: obj.isOpened ? obj.price : 0,
        netRevenue: obj.isOpened ? obj.price : 0,
        purchaseRate: obj.isOpened ? 100 : 0,
        // sender: obj.isOpened,
        price: obj.price,
        messages: messages
    }))
    return info
};






export const formatDateForURL = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate =
        dateObj.toISOString()
            .replace(/T/, ' ')
            .replace(/\.\d+/, '')
            .replace(/Z/, '');
    return encodeURIComponent(formattedDate);
};

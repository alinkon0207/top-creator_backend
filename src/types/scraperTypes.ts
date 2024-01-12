interface ScraperPrivateInput {
    cookie: OnlyFansCookie;
    user_id: string;
    url: string;
}

interface OnlyFansCookie {
    csrf: string;
    auth_id: string;
    auth_uid_379807379: string;
    sess: string;
    st: string;
}

export type { ScraperPrivateInput };

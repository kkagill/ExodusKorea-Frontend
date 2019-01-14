export interface IApplicationUser {
    userName: string;
    firstName: string;
    lastName: string;
    lockoutEnd: Date;
    nickName: string;
}

export interface ICareer {
    careerId: number;
    name: string;
    nameEN: string;
}

export interface IJobSite {
    category: string;
    name: string;
    link: string;
}

export interface ICategory {
    categoryId: number;
    name: string;
}

export interface ICountry {
    countryId: number;
    nameKR: string;
    isChecked: boolean;
    isNotDisabled: boolean;
}

export interface IUploader {
    uploaderId: number;
    name: string;
}

export interface INews {
    newsId: number;
    topic: string;
    newsDetails: INewsDetail[];
}

export interface INewsDetail {
    newsDetailId: number;
    subject: string;
    country: string;
    department: string;
    creator: string;
    body: string;
    dateCreated: Date;
    views: number;
    thumbnail: string;
    newsId: number;

    index: number;
    createdDate: string;
}

export interface IVideoPost {
    videoPostId: number;
    uploader: string;
    uploadedDate: Date;
    title: string;
    likes: number;
    youTubeVideoId: string;
    isGoogleDriveVideo: number;
    categoryId: number;
    countryEN: string;
    countryKR: string;
    category: string;
}

export interface ICountryInfo {
    countryKR: string;
    countryEN: string;
    capitalCity: Date;
    majorCities: string;
    population: string;
    perCapitaGDP: number;
    currency: number;
    countryLink: string;
}

export interface ICountryInfoKOTRA {
    promosingField: string;
    settlementGuide: string;
    livingCondition: string;
    immigrationVisa: string;
    countryId: number;
}

export interface IPriceInfo {
    countryKR: string;
    countryEN: string;
    costOfLiving: Date;
    costOfLivingIcon: string;
    rent: string;
    rentIcon: string;
    groceries: string;
    groceriesIcon: string;
    restaurantPrice: string;
    restaurantPriceIcon: string;
}

export interface IMinimumCoLInfo {
    countryKR: string;
    countryEN: string;
    baseCurrency: string;
    cityMinimums: ICityMinimum[];
}

export interface ICityMinimum {
    city: string;
    avgCostOfLiving: number;
}

export interface IPriceInfoDetail {
    city: string;
    currency: string;
    rent: IPI_Rent;
    restaurant: IPI_Restaurant;
    groceries: IPI_Groceries;
    etc: IPI_Etc;
}

export interface ICity {
    cityId: number;
    country: string;
    name: string;
}

export interface IMinimumCOL {
    country: string;
    cityId: number;
    city: string;
    rent: number;
    transportation: number;
    food: number;
    cell: number;
    internet: number;
    etc: number;
    nickName: string;
    total: number;
    dateCreated: Date;
    authorCountryEN: string;

    currency: string;
}

export interface IPI_Rent {
    oneBedRoomCenter: any;
    oneBedRoomOutside: any;
    twoBedRoomCenter: any;
    twoBedRoomOutside: any;
}

export interface IPI_Restaurant {
    bigMacMeal: any;
    cappuccino: any;
    mealPerOne: any;
}

export interface IPI_Groceries {
    apple: any;
    chickenBreasts: any;
    cigarettes: any;
    eggs: any;
    milk: any;
    potatoes: any;
    water: any;
}

export interface IPI_Etc {
    bus: any;
    gas: any;
    internet: any;
    subway: any;
}

export interface ICurrencyInfo {
    usd: number;
    cad: number;
    aud: number;
    nzd: number;
    today: Date;
}

export interface IVideoPostInfo {
    likes: number;
    owner: string;
    title: string;
}

export interface IUploaderRanking {
    name: string;
    uploaderId: number;
    specificInfo: ISpecificInfo;
}

export interface ISpecificInfo {
    totalScore: number;
    videoCount: number;
    likesSum: number;
}

export interface IVideoComment {
    videoCommentId: number;
    authorDisplayName: string;
    comment: string;
    dateCreated: Date;
    dateUpdated: Date;
    likes: number;
    userId: string;
    countryEN: string;
    isYouTubeComment: boolean;
    totalReplyCount: number;
    //parentId: string;
    videoPostId: number;
    videoCommentReplies: IVideoCommentReply[];
    youTubeCommentReplies: IYouTubeCommentReply[];
    isSharer: boolean;
}

export interface IVideoCommentReply {
    videoCommentReplyId: number;
    videoCommentId: number;
    authorDisplayName: string;
    comment: string;
    dateCreated: Date;
    dateUpdated: Date;
    likes: number;
    userId: string;
    countryEN: string;
    repliedTo: string;
    isSharer: boolean;
}

export interface IYouTubeCommentReply {
    AuthorDisplayName: string;
    TextDisplay: string;
    UpdatedAt: Date;
    Likes: string;
}

export interface ISalaryInfo {
    salaryInfoId: number;
    country: string;
    occupation: string;
    currency: string;
    low: number;
    median: number;
    high: number;
    isDisplayable: boolean;
}

export interface INotification {
    notificationId: number;
    videoCommentId: number;
    videoCommentReplyId: number;
    videoPostId: number;
    youTubeVideoId: string;
    isGoogleDriveVideo: number;
    userId: string;
    nickName: string;
    comment: string;
    dateCreated: Date;
    hasRead: boolean;
}

export interface IProfile {
    email: string;
    nickName: string;
    dateCreated: Date;
    dateVisitedRecent: Date;
    visitCount: number;
    hasCanceledSubscription: boolean;
}

export interface IPromisingField {
    content: string;
    country: string;
}

export interface ISettlementGuide {
    content: string;
    country: string;
}

export interface ILivingCondition {
    content: string;
    country: string;
}

export interface IImmigrationVisa {
    content: string;
    country: string;
}

export interface ICategoryCountryUploader {
    categories: ICategory[];
    countries: ICountry[];
    uploaders: IUploader[];
}

export interface Pagination {
    CurrentPage: number;
    ItemsPerPage: number;
    TotalItems: number;
    TotalPages: number;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}

export interface Predicate<T> {
    (item: T): boolean
}
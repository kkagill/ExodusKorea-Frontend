export interface IApplicationUser {
    userName: string;
    firstName: string;
    lastName: string;   
    lockoutEnd: Date;
}

export interface ICountry {
    countryId: number;
    nameKR: string;
}

export interface ICareer {
    name;
}

export interface IMainCurrencies {
    usd: number;
    cad: number;
    aud: number;
    nzd: number;
    today: Date;
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

export interface IAllVideos {
    countryKR: string;
    videoPosts: IVideoPost[];
}

export interface IVideoPost {
    videoPostId: number;
    uploader: string;
    uploadedDate: Date;
    title: string;
    likes: number;
    youTubeVideoId: string;
    countryEN: string;
    countryKR: string;  
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
    country: string;
    baseCurrency: Date;
    krwRate: string;
    now: string;
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
    videoPostId: number;
    videoCommentReplies: IVideoCommentReply[];
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
}

export interface ISalaryInfo {
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
    userId: string;
    nickName: string;
    comment: string;  
    dateCreated: Date;  
    hasRead: boolean;
}

export interface Pagination {
    CurrentPage : number;
    ItemsPerPage : number;
    TotalItems : number;
    TotalPages: number;
}

export class PaginatedResult<T> {
    result :  T;
    pagination : Pagination;
}

export interface Predicate<T> {
    (item: T): boolean
}
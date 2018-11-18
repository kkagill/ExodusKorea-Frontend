export interface IApplicationUser {
    userName: string;
    firstName: string;
    lastName: string;   
    lockoutEnd: Date;
}

export interface IVideoPost {
    videoPostId: number;
    uploader: string;
    uploadedDate: Date;
    title: string;
    likes: number;
    youTubeVideoId: string;
    country: string;
    countryInEng: string;  
}

export interface ICountryInfo {
    country: string;
    capitalCity: Date;
    majorCities: string;
    population: string;
    perCapitaGDP: number;
    currency: number;
    countryInEng: string;
    countryLink: string;
}

export interface IPriceInfo {
    country: string;
    countryInEng: string;
    costOfLiving: Date;
    costOfLivingIcon: string;
    rent: string;
    rentIcon: string;
    groceries: string;
    groceriesIcon: string;
    restaurantPrice: string;
    restaurantPriceIcon: string;
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
    city: string;
    rent: number;
    transportation: number;
    rice: number;
    ramyun: number;
    kimchi: number;
    cell: number;
    internet: number;
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
    country: string;
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
    country: string;
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
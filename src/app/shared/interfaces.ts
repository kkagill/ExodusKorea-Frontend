export interface IApplicationUser {
    userName: string;
    firstName: string;
    lastName: string;   
    lockoutEnd: Date;
}

export interface INewVideo {
    UploaderName: string;
    UploadedDate: Date;
    YouTubeVideoId: string;
    Country: string;
    Title: string;
    Likes: number;
    Comments: number;
    CountryInEnglish: string;
}

export interface ICountryInfo {
    CountryName: string;
    CapitalCity: Date;
    MajorCities: string;
    Population: string;
    TitLanguagesle: string;
    PerCapitaGDP: number;
    Currency: number;
    CountryInEnglish: string;
}

export interface IPriceInfo {
    Country: string;
    CostOfLiving: Date;
    CostOfLivingIcon: string;
    Rent: string;
    RentIcon: string;
    Groceries: string;
    GroceriesIcon: string;
    RestaurantPrice: string;
    RestaurantPriceIcon: string;
}

export interface ICurrencyInfo {
    Country: string;
    BaseCurrency: Date;
    KrwRate: string;
    Now: string;
}

export interface IYouTubeComment {
    AuthorDisplayName: string;
    TextDisplay: string;
    UpdatedAt: Date;
    Likes: string;
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
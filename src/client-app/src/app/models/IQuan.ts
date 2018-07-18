export interface IQuan {
    _id: string,
    slugUrl: string,
    TenQuan: string,
    // MinPrices: string,
    // MaxPrices: string,
    TimeStart: string,
    TimeEnd: string,
    Address: string,
    Lat: number,
    Lng: number,
    Detail: string,
    Image: string,
    Party: [
        {
            Leader: String,
            Title: String
        }
    ]
}
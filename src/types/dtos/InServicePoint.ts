export interface InServicePoints {
    PointName:string,
    Boolist:{
        Airports:Boolean,
        Railroads:Boolean,
        SeaPorts:Boolean
    },
    Geo:{
        Province:string,
        Description:string | null
    }
}
export enum Area {
    north = "צפון",
    Jerusalem = "ירושלים והסביבה",
    center = "מרכז",
    south = "דרום",
    YehudaAndShomron = "יהודה ושומרון",
    allEarth = "כל הארץ"
}
export interface location {
    id: number;
    name: string;
    address: string;
    image: string;
    imageUrl: string;
    description: string;
    area: string;
    likes: number;
    date: Date;
    imagesList: Array<string>;
    information: string;
}

export interface search {
    freeSearch: string;
    select: string;
}

export interface del {
    id: number;
    isTemp: boolean;
}


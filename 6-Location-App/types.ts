import {RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {Place} from "./components/places/type";

export type PickedLocation = {
    latitude: number;
    longitude: number;
};

export type RootStackParamList = {
    allPlaces: Place | undefined;
    addPlace: PickedLocation | undefined;
    placeDetails: { placeId: number };
    map: {
        initialLocation?: PickedLocation;
        readonly?: boolean;
    } | undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
    NativeStackNavigationProp<RootStackParamList, T>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export interface Root {
    results: Result[]
    status: string
}

export interface Result {
    address_components: AddressComponent[]
    formatted_address: string
    geometry: Geometry
    place_id: string
    plus_code: PlusCode
    types: string[]
}

export interface AddressComponent {
    long_name: string
    short_name: string
    types: string[]
}

export interface Geometry {
    location: Location
    location_type: string
    viewport: Viewport
}

export interface Location {
    lat: number
    lng: number
}

export interface Viewport {
    northeast: Northeast
    southwest: Southwest
}

export interface Northeast {
    lat: number
    lng: number
}

export interface Southwest {
    lat: number
    lng: number
}

export interface PlusCode {
    compound_code: string
    global_code: string
}

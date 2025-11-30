export interface Place {
    id: number;//new Date().toString() + Math.random().ToString();
    title: string;
    imageUri: string;
    address: string;
    location: { lat: number, lng: number };


}

export interface PlacesProps {
    items: Place[];
    onSelect?: () => void;
}
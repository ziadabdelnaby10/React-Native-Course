import {Root} from "../types";

const GOOGLE_MAP_API_KEY = process.env.GOOGLE_API_KEY || "PROVIDE_GOOGLE_API_KEY";
const GOOGLE_GEO_API_KEY = process.env.GOOGLE_GEO_API_KEY || "PROVIDE_GOOGLE_API_KEY";


//Need Payment
export function getMapPreview(lat: number | undefined, lng: number | undefined) {
    return `https://maps.googleapis.com/maps/api/staticmap?
    center=${lat},${lng}&
    zoom=14&
    size=400x200&
    maptype=roadmap&
    markers=color:red%7Clabel:S%7C${lat},${lng}&
    key=${GOOGLE_MAP_API_KEY}`;
}

export async function getLocation(lat: number | undefined, lng: number | undefined) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_GEO_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json() as Root;
    return data.results[0].formatted_address;
}

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
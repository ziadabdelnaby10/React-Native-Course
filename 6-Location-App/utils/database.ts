import * as SQLite from "expo-sqlite";
import {Place} from "../components/places/type";

const DATABASE_NAME = "places.db";
const TABLE_NAME = "place";

const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

export async function initDatabase() {
    // database.withTransactionAsync((tx) => {})
    return db.runAsync(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
         (
             id
             INTEGER
             PRIMARY
             KEY
             NOT
             NULL,
             title
             TEXT
             NOT
             NULL,
             imageUri
             TEXT
             NOT
             NULL,
             address
             TEXT
             NOT
             NULL,
             lat
             REAL
             NOT
             NULL,
             lng
             REAL
             NOT
             NULL,
         )`
    );
}

export async function insertPlace(place: Place) {
    return db.runAsync(`INSERT INTO ${TABLE_NAME} (title, imageUri, address, lat, lng)
                        VALUES (?, ?, ?, ?, ?)`
        , [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]);
}

export async function fetchPlaces() {
    const placesArray: Place[] = []
    const places = await db.getAllAsync(`SELECT *
                                         FROM ${TABLE_NAME}`);
    console.log('places', places)
    places.forEach((place) => placesArray.push(
            {
                // @ts-ignore
                id: place.id,title: place.title, imageUri: place.imageUri,address: place.address,location: {lat: place.lat, lng: place.lng}
            } as Place
        )
    )
    return placesArray
}

export async function fetchPlaceDetails(id: number) {
    const stmt = await db.prepareAsync(`SELECT *
                                        FROM ${TABLE_NAME}
                                        WHERE id = $id`);
    const result = await stmt.executeAsync({$id: id});
    const firstRow = await result.getFirstAsync() as Place;
    await result.resetAsync();
    return firstRow;
}

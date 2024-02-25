import axios from "axios";

export async function getFeltQuake() {
    const response = await axios("https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json");
    return response.data;
}
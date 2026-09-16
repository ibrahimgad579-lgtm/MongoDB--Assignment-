import { MongoClient } from 'mongodb';


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
 export const db = client.db("c48");


export const connectionDb = async()=>{
    await client.connect()
    .then(()=>{
        console.log('Connected successfully to server');
    })
    .catch((err)=>{
        console.log(`error connecting to Mongodb:`,err)
    })
}

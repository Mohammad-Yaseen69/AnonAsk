import mongoose from "mongoose"

type Connection = {
    isConnected: number
}


const connectionObj: Connection = {
    isConnected: 0
}
export async function dbConnect() {
    if (connectionObj.isConnected) {
        console.log("Mongodb is already connected!")
        return
    }
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL || "")
        connectionObj.isConnected = connection.connections[0].readyState
    } catch (error) {
        console.log("Error while connecting mongodb", error)
    }
}

export default dbConnect
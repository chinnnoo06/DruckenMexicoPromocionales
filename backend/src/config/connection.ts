import mongoose from "mongoose";
import colors from "colors";
import { MONGO_URI } from "./env";

export const connection = async () => {
    try {
        const mongoUri = MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI no está definida en el .env");
        }

        await mongoose.connect(mongoUri);
        console.log(colors.magenta.bold("Conectado correctamente a la base de datos drucken_mexico_promocionales_db"));
    } catch (error) {
        console.log(colors.red.bold("No se ha podido conectar a la base de datos"));
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

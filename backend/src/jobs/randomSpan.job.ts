import { ProductRepository } from "../repositories/Product.repository";
import { randomSpanOption } from "../utils/spanOptions";

const randomSpan = async () => {
    try {
        const products = await ProductRepository.findAll({});

        for (let product of products) {
            await ProductRepository.updateSpan(product._id, randomSpanOption());
        }

        console.log("Span actualizado");

    } catch (error) {
        console.error("Error al obtener productos para colocar span:", error);
    }
}

export const startRandomSpanJob = () => {
    setInterval(randomSpan, 24 * 60 * 60 * 1000);
}

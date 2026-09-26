import { productRepository } from "../repositories/product.repository";
import { randomSpanOption } from "../utils/spanOptions";

const randomSpan = async () => {
    try {
        const products = await productRepository.findAll({});

        for (let product of products) {
            await productRepository.updateSpan(product._id, randomSpanOption());
        }

        console.log("Span actualizado");

    } catch (error) {
        console.error("Error al obtener productos para colocar span:", error);
    }
}

export const startRandomSpanJob = () => {
    setInterval(randomSpan, 24 * 60 * 60 * 1000);
}

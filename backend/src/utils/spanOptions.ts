export const spanOptions = ["Destacado", "Para ti", "Novedad", "Recomendado", "Favorito"];

export const randomSpanOption = () => {
    return spanOptions[Math.floor(Math.random() * spanOptions.length)];
}

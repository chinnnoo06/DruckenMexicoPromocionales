import { TProductForm } from "@/schemas/product/product.form.schemas"

export const buildProductFormData = (data: TProductForm) => {
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("key", data.key)
    formData.append("description", data.description)
    formData.append("printingTechnique", data.printingTechnique)
    formData.append("category", data.category)
    formData.append("material", data.material)
    formData.append("measures", data.measures)
    formData.append("printingMeasures", data.printingMeasures)
    formData.append("minQuantity", String(data.minQuantity))

    data.colors.forEach((color, index) => {
        formData.append(`colors[${index}][color]`, color.color)
        formData.append(`colors[${index}][hex]`, color.hex)
        formData.append("colorImages", color.image)
    })

    if (data.generalImage) {
        formData.append("generalImage", data.generalImage)
    }

    return formData
}

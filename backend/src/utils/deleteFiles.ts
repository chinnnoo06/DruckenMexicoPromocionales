import fs from "fs";
import path from "path";
import { TMulterFiles } from "../types/multer/multer.types";
import { TProductDocument } from "../types/product/product.types";

export const ASSETS_PATH = path.join(__dirname, "../../assets");

// Borra un archivo del disco por su nombre dentro de /assets
const deleteAssetFile = (fileName: string) => {
  try {
    const filePath = path.join(ASSETS_PATH, fileName);
    fs.unlinkSync(filePath);
    console.log("Eliminada basura:", fileName);
  } catch (err) {
    console.error(`Error eliminando ${fileName}:`, (err as Error).message);
  }
};

// Recorre cada campo (generalImage, colorImages, etc.)
export const deleteUploadedFiles = (files?: TMulterFiles) => {
  if (!files) return;

  Object.values(files).forEach(fileArray => {
    if (!Array.isArray(fileArray)) return;

    fileArray.forEach(file => deleteAssetFile(file.filename));
  });
};

// Misma limpieza, pero sobre una lista plana de archivos
export const deleteFileList = (files: Express.Multer.File[]) => {
  files.forEach(file => deleteAssetFile(file.filename));
};

// Borra del disco la imagen general y las de cada color de un producto
export const deleteProductImages = (product: TProductDocument) => {
  if (product.colors && product.colors.length > 0) {
    product.colors.forEach(c => {
      if (c.image) deleteAssetFile(c.image);
    });
  }

  if (product.generalImage) {
    deleteAssetFile(product.generalImage);
  }
};

import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { deleteFileList } from "../utils/deleteFiles";
import { TMulterFiles } from "../types/multer/multer.types";

export const convertNewImagesToWebP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as TMulterFiles | undefined;

    const filesToConvert: Express.Multer.File[] = [];

    if (files?.generalImage) filesToConvert.push(...files.generalImage);
    if (files?.colorImages) filesToConvert.push(...files.colorImages);

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    for (const file of filesToConvert) {
      const ext = path.extname(file.path).toLowerCase();

      // Validación de formato
      if (!allowedExtensions.includes(ext)) {
        deleteFileList(filesToConvert);
        return res.status(400).json({
          status: "error",
          message: `Formato no permitido: ${file.filename}. Solo se permiten JPG, JPEG, PNG y WEBP.`
        });
      }

      if (ext === ".webp") {
        console.log(`Saltando conversión porque ya es WebP: ${file.filename}`);
        continue;
      }

      const outputPath = file.path.replace(path.extname(file.path), ".webp");

      let converted = false;
      let attempts = 0;
      const maxAttempts = 3;

      while (!converted && attempts < maxAttempts) {
        try {
          attempts++;
          await sharp(file.path)
            .webp({ quality: 80 })
            .toFile(outputPath);

          // Eliminación segura del archivo original
          try {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          } catch (unlinkErr) {
            console.warn(`No se pudo eliminar el archivo original ${file.filename}:`, unlinkErr);
          }

          file.path = outputPath;
          file.filename = path.basename(outputPath);
          console.log(`Convertido a WebP: ${file.filename} (Intento ${attempts})`);
          converted = true;
        } catch (err) {
          console.warn(`Error convirtiendo ${file.filename} a WebP (Intento ${attempts}):`, err);
          if (attempts >= maxAttempts) {
            deleteFileList(filesToConvert);
            return res.status(500).json({
              status: "error",
              message: `Error al convertir la imagen ${file.filename}. Intenta nuevamente.`
            });
          }
        }
      }
    }

    // Si todo salió bien, continuar al controlador
    next();
  } catch (err) {
    console.error("Error inesperado en la conversión a WebP:", err);
    return res.status(500).json({
      status: "error",
      message: "Error inesperado al procesar las imágenes. Intenta nuevamente."
    });
  }
};

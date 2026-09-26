import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { ASSETS_PATH } from "../utils/deleteFiles";
import { TAddProductDto } from "../types/product/product.dtos";

// Índice del color que se está renombrando. multer llama a filename() una vez
// por archivo, así que se reinicia al inicio de cada petición.
let colorIndex = 0;

export const resetUploadCounter = (req: Request, res: Response, next: NextFunction) => {
  colorIndex = 0;
  next();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ASSETS_PATH);
  },
  filename: function (req, file, cb) {
    try {
      const body = req.body as TAddProductDto;

      const productKey = body.key.replace(/\s+/g, '-');
      const timestamp = Date.now();
      let fileName: string;

      if (file.fieldname === 'generalImage') {
        fileName = `${productKey}-General-${timestamp}${path.extname(file.originalname)}`;
      } else {
        // colorImages: el único otro campo que acepta upload.fields()
        const index = colorIndex++;

        let colorName = "color";
        if (body.colors && body.colors[index]) {
          colorName = body.colors[index].color.replace(/\s+/g, '-');
        }

        fileName = `${productKey}-${colorName}-${timestamp}${path.extname(file.originalname)}`;
      }

      cb(null, fileName);
    } catch (err) {
      cb(err as Error, "");
    }
  }
});

export const upload = multer({ storage });

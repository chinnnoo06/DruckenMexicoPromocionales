import { Router } from "express";
import { param, query } from "express-validator";
import { ProductController } from "../controllers/product.controller";
import { auth } from "../middlewares/auth";
import { convertNewImagesToWebP } from "../middlewares/convertNewImagesToWebP";
import { handleInputErrors } from "../middlewares/handleInputErrors";
import { validateProductExists, validateProductInput } from "../middlewares/product";
import { resetUploadCounter, upload } from "../middlewares/uploads";

const router: Router = Router();

// Definir rutas
router.get("/carousel",
  ProductController.getCarouselProducts
);

router.get("/count",
  ProductController.getTotalCountProducts
);

router.get("/",
  query('category').optional().trim().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Formato de categoría inválido (usa minúsculas y guiones)'),
  query('page').optional().isInt({ min: 1 }).withMessage('La página debe ser un número mayor a 0'),
  query('search').optional().trim(),
  handleInputErrors,
  ProductController.getProducts
);

router.get("/:id",
  param('id').isMongoId().withMessage('Id invalido'),
  handleInputErrors,
  validateProductExists,
  ProductController.getOneProduct
);

router.delete("/:id",
  auth(),
  param('id').isMongoId().withMessage('Id invalido'),
  handleInputErrors,
  validateProductExists,
  ProductController.deleteProduct
);

router.post("/",
  auth(),

  resetUploadCounter,

  upload.fields([
    { name: 'generalImage', maxCount: 1 },
    { name: 'colorImages', maxCount: 20 }
  ]),

  validateProductInput,

  handleInputErrors,

  convertNewImagesToWebP,
  ProductController.addProduct
);

router.put("/:id",
  auth(),

  resetUploadCounter,

  upload.fields([
    { name: 'generalImage', maxCount: 1 },
    { name: 'colorImages', maxCount: 20 }
  ]),

  param('id').isMongoId().withMessage('Id invalido'),
  validateProductInput,

  handleInputErrors,

  validateProductExists,

  convertNewImagesToWebP,
  ProductController.updateProduct
);

export default router;

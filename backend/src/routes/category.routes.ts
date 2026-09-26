import { Router } from "express";
import { param } from "express-validator";
import { CategoryController } from "../controllers/category.controller";
import { auth } from "../middlewares/auth";
import { validateCategoryExists, validateCategoryInput } from "../middlewares/category";
import { handleInputErrors } from "../middlewares/handleInputErrors";

const router: Router = Router();

// Definir rutas
router.get("/",
    CategoryController.getCategories
);

router.post("/",
    auth(),
    validateCategoryInput,
    handleInputErrors,
    CategoryController.addCategory
)

router.put("/:id",
    auth(),
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    validateCategoryInput,
    handleInputErrors,
    validateCategoryExists,
    CategoryController.updateCategory
)

router.delete("/:id",
    auth(),
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    handleInputErrors,
    validateCategoryExists,
    CategoryController.remove
)

export default router;

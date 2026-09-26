import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";
import { handleInputErrors } from "../middlewares/handleInputErrors";

const router: Router = Router();

// Definir rutas
router.post("/register",
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').notEmpty().withMessage('La constraseña es obligatoria'),
    handleInputErrors,
    AuthController.register
)

router.post("/login",
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').notEmpty().withMessage('La constraseña es obligatoria'),
    handleInputErrors,
    AuthController.login
)

router.get("/session", auth(), AuthController.checkAuth);

export default router;

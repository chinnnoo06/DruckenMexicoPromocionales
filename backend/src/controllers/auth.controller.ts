import type { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { TLoginDto, TRegisterDto } from "../types/auth/auth.dtos";

export class AuthController {

    static register = async (req: Request<{}, unknown, TRegisterDto>, res: Response, next: NextFunction) => {
        if (process.env.NODE_ENV === "production") {
            return res.status(404).end()
        }

        const params = req.body;

        try {
            await authService.register(params)

            return res.status(200).json({
                status: "success",
                message: "Usuario Registrado con exito"
            });
        } catch (error) {
            console.log("Error al crear cuenta");
            next(error)
        }
    }

    static login = async (req: Request<{}, unknown, TLoginDto>, res: Response, next: NextFunction) => {
        const params = req.body;

        try {
            const sessionInfo = await authService.login(params)

            return res.status(200).json({
                status: "success",
                message: "Login con exito",
                token: sessionInfo.token
            });
        } catch (error) {
            console.log("Error al iniciar sesión", error);
            next(error)
        }
    }

    // Si el middleware auth() dejó pasar la petición, la sesión es válida.
    static checkAuth = (req: Request, res: Response) => {
        return res.status(200).json({
            status: "success"
        });
    }
}

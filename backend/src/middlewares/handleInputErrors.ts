import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { deleteUploadedFiles } from "../utils/deleteFiles";
import { TMulterFiles } from "../types/multer/multer.types";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req)

    if (!errors.isEmpty()) {

        const files = req.files as TMulterFiles | undefined;

        if (files) {
            deleteUploadedFiles(files);
        }

        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

import { Types } from "mongoose";

export type TUser = {
    username: string,
    password: string
};

// Lo que el middleware auth() deja colgado en req.user
export type TUserPayload = {
    id: Types.ObjectId
}

// Lo que devuelve jwt.verify: el JWT serializa a JSON, así que el
// ObjectId que se firmó vuelve como string.
export type TTokenPayload = {
    id: string
}

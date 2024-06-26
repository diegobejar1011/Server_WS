import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Socket } from "socket.io";

config();

export const JWTMiddlware = (socket: Socket, token: string, next: Function) => {
  if (!token) {
    return next(new Error("Missing authentication token"));
  }
  try {
    const decoded: any = jwt.verify(
      token,
      process.env.SECRET_KEY_JWT || "Authentication"
    );
    const id_user = decoded.userId;
    socket.data.id_user = id_user;
    console.log('Verificado');
    next();
  } catch (error: any) {
    console.log('No verificado');
    console.log(error);
    return next(new Error(error.message));
  }
};

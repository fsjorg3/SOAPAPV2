import { Request, Response, NextFunction } from 'express';

export const validateContactForm = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Añadir lógica de validación para los campos del formulario de contacto
  next();
};

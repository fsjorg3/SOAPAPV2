import { Request, Response, NextFunction } from 'express';

// Middleware para el endpoint que genera el JSON de archivos de transparencia
export const validateTransparencyList = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Añadir lógica de validación o autorización si es necesario
  next();
};

// Middleware para el endpoint que sirve el PDF solicitado
export const validatePdfRequest = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Añadir lógica para validar que el parámetro del archivo solicitado sea seguro (ej. prevenir Path Traversal)
  next();
};

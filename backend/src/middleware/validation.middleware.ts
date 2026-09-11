import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400);
        const issues = (error as any).issues || (error as any).errors || [];
        const messages = issues.map((e: any) => `${e.path?.join('.') || 'field'} - ${e.message}`).join(', ');
        next(new Error(`Validation Error: ${messages}`));
      } else {
        next(error);
      }
    }
  };
};


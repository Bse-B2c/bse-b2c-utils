import { HttpError } from "./httpException";
import { HttpStatusCode } from "./enums/httpStatus";

export interface Response {
  status(statusCode: number): this;

  send(body: any): any;
}

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  const errorName = err.name ?? "HttpException";
  const statusCode = err.statusCode ?? HttpStatusCode.INTERNAL_SERVER;
  const message = err.message ?? "Something went wrong";

  return res.status(statusCode).send({
    statusCode,
    error: { statusCode, error: errorName, message },
    data: null,
  });
};

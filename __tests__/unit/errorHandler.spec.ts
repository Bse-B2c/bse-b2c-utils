import { errorHandler } from "../../src";
import { HttpStatusCode } from "../../src/libs/enums/httpStatus";
import { request, mockResponse } from "../utils/httpMock";
import { HttpException } from "../../src/libs/httpException";

describe("errorHandler", () => {
  const res = mockResponse();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return default response body if error has no status code, message and error name", async () => {
    errorHandler({}, request, res, () => {});

    expect(res.status).toBeDefined();
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER);
    expect(res.send).toBeDefined();
    expect(res.send).toBeCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      statusCode: HttpStatusCode.INTERNAL_SERVER,
      error: {
        statusCode: HttpStatusCode.INTERNAL_SERVER,
        error: "HttpException",
        message: "Something went wrong",
      },
      data: null,
    });
  });

  it("should return the error if error is defined", async () => {
    errorHandler(
      new HttpException({
        message: "name must be string",
        statusCode: HttpStatusCode.BAD_REQUEST,
      }),
      request,
      res,
      () => {}
    );

    expect(res.status).toBeDefined();
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
    expect(res.send).toBeDefined();
    expect(res.send).toBeCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      statusCode: HttpStatusCode.BAD_REQUEST,
      error: {
        statusCode: HttpStatusCode.BAD_REQUEST,
        error: "HttpException",
        message: "name must be string",
      },
      data: null,
    });
  });
});

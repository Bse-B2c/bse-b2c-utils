import { Response, Request } from "express";

export const mockResponse = () => {
  let res = {} as unknown as Response;

  res.status = jest.fn(() => res);
  res.send = jest.fn(() => res);

  return res;
};

export const request = {} as Request;

import express, { Express, Request, Response } from "express";

const apiMiddleware = async (
  request: Request,
  response: Response,
  next: any
) => {
  const headers = request.headers;
 
  // if (request.res?.locals) {
  //   request.res.locals.workspace_id = workspace_id;
  //   request.res.locals.geta_host = geta_host;
  //   request.res.locals.botid = botid;
  // } else {
  //   logging.error("locals id not found");
  // }
  
  console.log(`🚀 ~ file: middleware.ts:49 ~ apiMiddleware:`);
  next();
};

export default apiMiddleware;

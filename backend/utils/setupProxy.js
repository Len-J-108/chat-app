// needed fpr development so that cookies can get send to the frontend...

import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
    })
  );
};

export default proxy;
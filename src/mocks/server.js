import { setupServer } from "msw/node";
import { http } from "msw";

export const server = setupServer(
  http.post("/api/login", (req, res, ctx) => {
    return res(
      ctx.json({ token: "fake-token" })
    );
  }),

 // http.get("/api/products", (req, res, ctx) => {
 //   return res(
   //   ctx.json([
        //{ id: 1, name: "Libro" },
       // { id: 2, name: "Cuaderno" },
     // ])
  //  );
 // })
);

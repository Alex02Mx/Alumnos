import { z } from "zod";

export const alumnoSchema = z.object({
  name: z.string()
          .min(3, "Nombre muy corto")
          .max(50, "Nombre muy largo"),

  course: z.string()
           .min(1, "Nombre de curso muy corto")
           .max(50, "Nombre de curso muy largo"),
}).strict();


export const idParamsSchema = z.object({
  id: z.coerce.number({
        invalid_type_error: "El id debe ser un número"
      })
      .int("El id debe ser entero")
      .positive("El id debe ser mayor a 0")
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number()
    .int("La pagina debe ser un numero entero")
    .positive("La pagina debe se mayor a 0")
    .default(1),
  
  limit: z.coerce.number()
    .int("El limite debe ser un numero entero")
    .positive("El limite debe ser mayor a 0")
    .max(100, "El limite no puede ser mayor a 100")
    .default(5),

   search: z.string().optional().default(""),

   sort: z.enum(["id","name","course"])
    .default("id"),

   order: z.enum(["asc","des"])
    .default("asc")
})

import { pool } from "../../database/pool.js";
// === GET ===

export const getAllAlumnosService = async ({
  page,
  limit,
  search,
  sort,
  order
}) => {

  const offset = (page - 1) * limit;
  const validSortFields = ["id", "name", "course"];
  const sortField = validSortFields.includes(sort) ? sort : "id";
  const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

  const[rows, totalResult]  = await Promise.all([

    pool.query(
      `SELECT * FROM alumnos
      WHERE deleted = 0
      AND name LIKE ?
      ORDER BY ${sortField} ${sortOrder}
      LIMIT ? OFFSET ?`,
      [`%${search}%`, limit, offset]
    ),

    pool.query(
      `SELECT COUNT(*) as total
      FROM alumnos
      WHERE deleted = 0
      AND name LIKE ?`,
      [`%${search}%`]
    )

  ])

  const total = Number(totalResult[0].total);

  return {
    data: rows,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

// === GET / ID ===

export const getAlumnoByIdService = async (id) => {
  const rows = await pool.query(
    "SELECT id, name, course FROM alumnos WHERE id=? AND deleted=0",
    [id]
  );
  return rows[0];
};

// === POST ===
export const createAlumno = async ({ name, course }) => {
  const result = await pool.query(
    "INSERT INTO alumnos(name,course) VALUES(?,?)",
    [name, course]
  );
  
  return {
    id: result.insertId,
    name,
    course
  };
};

// === PUT toda la fila ===
export const updateAlumnoService = async (id, data) => {
  const { name, course } = data;

  const result = await pool.query(
    "UPDATE alumnos SET name=?, course=? WHERE id=?",
    [name, course, id]
  );

  return {
    id: id,
    name: name,
    course: course,
    affectedRows: result.affectedRows
  }
};

// === PATCH cambio parcial === 
export const patchAlumnoService = async (id, fields) => {
  const keys = Object.keys(fields);
  if(keys.length === 0) return null;

  const setString = keys.map(k => `${k}=?`).join(", ");
  const values = [...Object.values(fields), id];

  const result = await pool.query(
    `UPDATE alumnos SET ${setString} WHERE id=?`,
    values
  );

if(keys.length === 0) return null;
};

// === DELETE ===
export const deleteAlumnoService = async (id) => {
  const result = await pool.query(
    "UPDATE alumnos SET deleted = 1 WHERE id=? AND deleted = 0",
    [id]
  );

  return {
    affectedRows: result.affectedRows
  }
};

// === RESTORE ===
export const restoreAlumnoService = async (id) =>{
  const result = await pool.query(
    "UPDATE alumnos SET deleted = 0 WHERE id = ? AND deleted = 1",
    [id]
  )
  return {
    affectedRows: result.affectedRows
  }
}
// === DELETED ===
export const getDeletedService = async () => {
  const result = await pool.query(
    "SELECT id, name, course FROM alumnos WHERE deleted = 1"
  );
  return {
    data: result
  }
}





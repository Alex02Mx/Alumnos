export const serializer = (data) =>
  JSON.parse(
    JSON.stringify(data, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    )
  );
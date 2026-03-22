import { hashPassword, comparePassword } from "./utils/hash.js"

const run = async () => {
  const password = "123456";

  const hash = await hashPassword(password);
  console.log("HASH:", hash);

  const match = await comparePassword("123456", hash);
  console.log("MATCH:", match);
};

run();

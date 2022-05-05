const fs = require("fs/promises");

//functionนี้เป็นasynchronus และ reutrn ออกมาเป็นpromise obj
exports.readFile = async (path) => {
  const data = await fs.readFile(path, "utf8");

  return JSON.parse(data); //แปลงsr กลับเป้น array หรือ obj กรณีนี้ข้อมูลเราเป็น(array)
};

//functionนี้เป็นasynchronus และ reutrn ออกมาเป็นpromise obj
exports.writeFile = (path, data) => fs.writeFile(path, JSON.stringify(data));

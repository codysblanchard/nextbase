import { PrismaClient } from "@prisma/client";
declare global {
  var prisma: PrismaClient;
}
//console.log("prisma lib 1", globalThis.prisma, global.prisma);
const myprisma: PrismaClient = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") globalThis.prisma = myprisma;
//console.log("prisma lib 2", myprisma, globalThis.prisma, global.prisma);
export default myprisma;

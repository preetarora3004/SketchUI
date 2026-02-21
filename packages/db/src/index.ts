import { PrismaClient } from '../generated/prisma/client'
import {PrismaPg} from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const client =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({connectionString : "postgresql://neondb_owner:npg_UZXaTju78MPe@ep-empty-cloud-a80clr2o.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"}),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
import { PUBLIC_SUPABASE_DB_URL } from '$env/static/public';
import postgres from 'postgres';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';

const client = postgres(PUBLIC_SUPABASE_DB_URL);
export const db = drizzle(client, { schema });
export const adapter = new DrizzlePostgreSQLAdapter(db, schema.sessionTable, schema.userTable);

/**
 * SERVER-SIDE ONLY
 *
 * CRITICAL SAFETY WARNING:
 * This file uses SUPABASE_SERVICE_ROLE_KEY which has administrative access to the database.
 * This file MUST ONLY EVER be imported in server-side contexts (such as Next.js API routes or
 * Server Actions). NEVER import or expose this file in client components or browser contexts.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    '[supabaseAdmin] Missing env var: NEXT_PUBLIC_SUPABASE_URL — ' +
    'ensure it is set in .env.local and restart the dev server.'
  );
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    '[supabaseAdmin] Missing env var: SUPABASE_SERVICE_ROLE_KEY — ' +
    'ensure it is set in .env.local and restart the dev server.'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

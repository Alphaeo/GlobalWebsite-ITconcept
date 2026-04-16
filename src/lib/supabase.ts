import { createClient } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Client-side / server-side simple client (read-only public data)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SSR client with cookie-based auth (for admin routes)
export function createSupabaseServerClient(cookies: AstroCookies) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(cookies.toString() ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, options);
        });
      }
    }
  });
}

export type Article = {
  id: string;
  slug: string;
  title_fr: string; title_en: string; title_ko: string;
  excerpt_fr: string; excerpt_en: string; excerpt_ko: string;
  content_fr: string; content_en: string; content_ko: string;
  author: string;
  tags: string[];
  cover_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type Event = {
  id: string;
  title_fr: string; title_en: string; title_ko: string;
  description_fr: string; description_en: string; description_ko: string;
  event_date: string;
  location: string;
  registration_url: string | null;
  published: boolean;
  created_at: string;
};

export type JobOffer = {
  id: string;
  title_fr: string; title_en: string; title_ko: string;
  description_fr: string; description_en: string; description_ko: string;
  contract_type: string;
  location: string;
  deadline: string | null;
  published: boolean;
  created_at: string;
};

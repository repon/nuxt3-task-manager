export default defineEventHandler((event) => {
  console.log('ENV API called'); // ← ここでログを出す
  console.log('Event context:', event.context); // ← `authMiddleware` が適用されてないかチェック

  // ✅ `authMiddleware` が適用されていたらスキップ
  if (event.context.auth) {
    console.log('authMiddleware applied, skipping authorization check');
  }

  const config = useRuntimeConfig()
  return {
    SUPABASE_URL: config.public.SUPABASE_URL,
    SUPABASE_ANON_KEY: config.public.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: config.private.SUPABASE_SERVICE_ROLE_KEY ? 'LOADED' : 'MISSING'
  }
})

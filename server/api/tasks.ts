import { H3Event } from 'h3'
import { supabase } from '~/server/utils/supabase'
import authMiddleware from '~/server/middleware/auth'

export default defineEventHandler(async (event: H3Event) => {
  // 🔥 ミドルウェアを実行して認証情報を取得
  await authMiddleware(event)

  // 認証ユーザーを取得
  const user = event.context.auth
  if (!user) {
    return { error: 'Unauthorized', statusCode: 401 }
  }

  // Supabase からログインユーザーのタスクを取得
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message, statusCode: 500 }
  }

  return data
})

import { H3Event } from 'h3'
import { supabase } from '~/server/utils/supabase'

export default async function authMiddleware(event: H3Event) {
  const authHeader = getRequestHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  event.context.auth = data.user
}

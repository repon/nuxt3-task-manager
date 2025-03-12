export default defineEventHandler(async (event) => {
  console.log("AuthMiddleware applied:", event.node.req.url);

  const authHeader = getRequestHeader(event, "authorization");
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    console.log("No Authorization Header. Rejecting.");
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("Extracted Token:", token);

  const { data, error } = await supabase.auth.getUser(token);
  console.log("Supabase Auth Result:", { data, error });

  if (error || !data?.user) {
    console.log("Invalid Token. Rejecting.");
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  event.context.auth = data.user;
  console.log("AuthMiddleware passed!");
});

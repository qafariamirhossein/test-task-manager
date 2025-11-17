export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const body = await readBody(event);
    return await $fetch(`${config.public.backendUrl}/tasks`, {
      method: 'POST',
      body,
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create task',
    });
  }
});

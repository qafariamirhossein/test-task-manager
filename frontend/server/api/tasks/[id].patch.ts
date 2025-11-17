export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, 'id');
  try {
    const body = await readBody(event);
    return await $fetch(`${config.public.backendUrl}/tasks/${id}`, {
      method: 'PATCH',
      body,
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to update task',
    });
  }
});


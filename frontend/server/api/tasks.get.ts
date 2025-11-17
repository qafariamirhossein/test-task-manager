export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    return await $fetch(`${config.public.backendUrl}/tasks`);
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch tasks',
    });
  }
});

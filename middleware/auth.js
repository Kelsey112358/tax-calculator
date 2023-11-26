
export default defineNuxtRouteMiddleware((to, from) => {
    // skip middleware on server
    if (process.server) return
    // skip middleware on client side entirely
    if (process.client) {
      if (to.fullPath === '/login' && authenticated()) {
        const data = readFromStorage();
        return navigateTo(`/users/${data.activeUserId}`);
      }
      return;
    }
    // or only skip middleware on initial client load
    const nuxtApp = useNuxtApp()
    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
  })
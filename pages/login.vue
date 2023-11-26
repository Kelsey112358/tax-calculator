<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
            Sign in to your account
          </h1>
          <Form class="space-y-4 md:space-y-6" @submit="signInAsUser">
            <div>
              <Field name="userId" :rules="isRequired" placeholder="Your account id"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
              <p>
                <ErrorMessage name="userId" class="text-red-500 text-xs italic" />
              </p>
            </div>

            <button type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Sign
              in</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'login'
});

const state = useMainStore();

// Redirect to user profile page if already logged in
if (authenticated()) {
  const activeUserId = state.getActiveUserId;
  await navigateTo({ path: `/users/${activeUserId}` });
}

const isRequired = (value) => value?.length >= 1;

const signInAsUser = async ({ userId }) => {
  // Sign in the user
  const user = state.getUserById(userId);
  if (!user) {
    console.log('User can\'t be found.');
    return;
  }
  state.setActiveUser(userId);
  await navigateTo({ path: `/users/${userId}` });
};
</script>

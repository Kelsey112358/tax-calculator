<template>
  <header class="w-full h-16 bg-gray-800 px-6">
    <nav class="flex items-center justify-between w-full h-full text-center text-black">
      <h2 class="text-2xl font-bold text-white">
        <span>Tax Calculator</span>
      </h2>
      <NuxtLink @click="handleLogout" to="/login" class="text-white">Sign Out</NuxtLink>
    </nav>
  </header>
</template>

<script setup>
const state = useMainStore();

const handleLogout = () => state.clearActiveUser();
</script>

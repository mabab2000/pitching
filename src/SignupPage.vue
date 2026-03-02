<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div class="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    
    <SignupForm :leaders="leaders" @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import SignupForm from './components/SignupForm.vue'
const leaders = [
  { id: 1, name: 'Ava Thompson' },
  { id: 2, name: 'Liam Garcia' },
  { id: 3, name: 'Priya Singh' },
]

function onSubmit(payload: { full_name: string; email: string; password: string; role?: string; team_leader_id?: number }) {
  // design-only: log and then navigate to home or show a success message
  // eslint-disable-next-line no-console
  console.log('Design: signup submitted (page)', payload)
  // for now, redirect back to home
  window.location.href = '/'
}
</script>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>

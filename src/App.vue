<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import LoginForm from './components/LoginForm.vue'
import localBanner1 from '../images/banner1.jpeg'
import localBanner2 from "../images/banner2.png";
import localBanner3 from "../images/banner3.png";

const bannerSlides = [
  { image: localBanner1, eyebrow: '', titleTop: '', titleAccent: '', subtitle: '', ctaPrimary: '', ctaSecondary: '' },
  { image: localBanner3, eyebrow: '', titleTop: '', titleAccent: '', subtitle: '', ctaPrimary: '', ctaSecondary: '' },
  { image: localBanner2, eyebrow: '', titleTop: '', titleAccent: '', subtitle: '', ctaPrimary: '', ctaSecondary: '' },
]
const currentIndex = ref(0)
const emptySlide = { image: '', eyebrow: '', titleTop: '', titleAccent: '', subtitle: '', ctaPrimary: '', ctaSecondary: '' }
const currentImage = computed(() => bannerSlides[currentIndex.value]?.image ?? emptySlide.image)
const currentSlide = computed(() => bannerSlides[currentIndex.value] ?? emptySlide)
let intervalId: number | undefined
const paused = ref(false)

function startInterval() {
  stopInterval()
  intervalId = window.setInterval(() => {
    if (!paused.value) currentIndex.value = (currentIndex.value + 1) % bannerSlides.length
  }, 5000)
}

function stopInterval() {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
    intervalId = undefined
  }
}

onMounted(() => startInterval())
onUnmounted(() => stopInterval())

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    name: 'DevPortal',
    description: 'A modern developer portal built with Vue 3 and Vite, providing comprehensive API documentation and interactive playgrounds for seamless developer experience.',
    link: 'https://github.com',
    tags: ['Vue 3', 'TypeScript', 'Vite'],
    ownerName: 'Ava Thompson',
    ownerImage: 'https://i.pravatar.cc/150?img=12',
    ownerRole: 'Frontend Engineer',
    ownerLink: 'https://github.com/ava',
    group: {
      name: 'Portal Team',
      members: [
        { name: 'Ava Thompson', image: 'https://i.pravatar.cc/150?img=12', role: 'Frontend Engineer', phone: '+1 (555) 123-4567', email: 'ava@example.com' },
        { name: 'Marcus Reed', image: 'https://i.pravatar.cc/150?img=8', role: 'Backend Engineer', phone: '+1 (555) 234-5678', email: 'marcus@example.com' },
        { name: 'Priya Singh', image: 'https://i.pravatar.cc/150?img=44', role: 'UX Designer', phone: '+1 (555) 345-6789', email: 'priya@example.com' },
      ],
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
    name: 'ShopFlow',
    description: 'A full-stack e-commerce platform featuring real-time inventory management, payment processing, and a sleek mobile-responsive storefront.',
    link: 'https://github.com',
    tags: ['Node.js', 'React', 'MongoDB'],
    ownerName: 'Liam Garcia',
    ownerImage: 'https://i.pravatar.cc/150?img=32',
    ownerRole: 'Full-stack Developer',
    ownerLink: 'https://github.com/liam',
    group: {
      name: 'Commerce Squad',
      members: [
        { name: 'Liam Garcia', image: 'https://i.pravatar.cc/150?img=32', role: 'Full-stack Developer', phone: '+1 (555) 456-7890', email: 'liam@example.com' },
        { name: 'Chen Wu', image: 'https://i.pravatar.cc/150?img=19', role: 'DevOps', phone: '+1 (555) 567-8901', email: 'chen@example.com' },
      ],
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
    name: 'DataLens',
    description: 'An analytics dashboard that visualizes complex datasets with interactive charts, allowing teams to make data-driven decisions faster.',
    link: 'https://github.com',
    tags: ['Python', 'D3.js', 'FastAPI'],
    ownerName: 'Noah Patel',
    ownerImage: 'https://i.pravatar.cc/150?img=18',
    ownerRole: 'Data Engineer',
    ownerLink: 'https://github.com/noah',
  },
  {
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80',
    name: 'TaskHive',
    description: 'A collaborative project management tool with drag-and-drop Kanban boards, time tracking, and real-time team notifications.',
    link: 'https://github.com',
    tags: ['Nuxt', 'Tailwind', 'PostgreSQL'],
    ownerName: 'Sophia Lee',
    ownerImage: 'https://i.pravatar.cc/150?img=45',
    ownerRole: 'Product Manager',
    ownerLink: 'https://github.com/sophia',
  },
  {
    image: 'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=600&q=80',
    name: 'AuthGuard',
    description: 'A plug-and-play authentication library supporting OAuth 2.0, passkeys, and multi-factor authentication with zero-config setup.',
    link: 'https://github.com',
    tags: ['Security', 'OAuth', 'TypeScript'],
    ownerName: 'Ethan Zhang',
    ownerImage: 'https://i.pravatar.cc/150?img=5',
    ownerRole: 'Security Engineer',
    ownerLink: 'https://github.com/ethan',
  },
  {
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    name: 'CloudDeploy',
    description: 'CLI and dashboard for one-command deployments to major cloud providers with automatic scaling, rollback, and infrastructure monitoring.',
    link: 'https://github.com',
    tags: ['DevOps', 'Kubernetes', 'Go'],
    ownerName: 'Olivia Nguyen',
    ownerImage: 'https://i.pravatar.cc/150?img=9',
    ownerRole: 'DevOps Engineer',
    ownerLink: 'https://github.com/olivia',
  },
]

// UI state for auth modal (design-only)
const showLogin = ref(false)

function handleLogin(payload: { username: string; password: string }) {
  // design-only: just log the values and close modal
  // eslint-disable-next-line no-console
  console.log('Design: login submitted', payload)
  showLogin.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <!-- ===== BANNER ===== -->
    <header
      class="relative w-full h-[300px] md:h-[360px] lg:h-[420px] overflow-hidden"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <transition name="fade-slide" mode="out-in">
        <img
          :src="currentImage"
          :key="currentImage"
          alt="banner"
          class="absolute inset-0 w-full h-full object-cover object-center scale-90"
        />
      </transition>

      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-black/60 to-transparent"></div>

      <div class="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-6 md:px-8">
        <transition name="fade-slide-content" mode="out-in">
          <div :key="currentIndex" class="text-center text-white px-4">
            <div class="text-indigo-200 font-semibold uppercase tracking-widest mb-4">{{ currentSlide.eyebrow }}</div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
              <span class="block">{{ currentSlide.titleTop }}</span>
              <span class="block text-indigo-400">{{ currentSlide.titleAccent }}</span>
            </h1>
            <p class="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">{{ currentSlide.subtitle }}</p>
            <div class="flex justify-center">
              <button @click="showLogin = true" class="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg md:text-xl font-extrabold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 hover:scale-105">
                <span class="flex items-center gap-2">
                  Get Started
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </span>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Auth buttons removed: Sign in only via Get Started button -->

      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </header>

    <!-- ===== PROJECTS GRID ===== -->
    <main id="projects" class="w-full px-4 py-12 lg:py-16">
      <div class="flex items-center gap-4 mb-10">
        <div class="flex-1 h-px bg-gray-200"></div>
        <h2 class="text-3xl font-bold text-gray-800 whitespace-nowrap">Featured Projects</h2>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in projects"
          :key="project.name"
          v-bind="project"
          imageHeight="h-26"
        />
      </div>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Pitching Platform</h3>
            <p class="text-sm text-gray-400">Showcase your innovative projects and connect with talented teams.</p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="/" class="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="/dashboard" class="hover:text-indigo-400 transition-colors">Dashboard</a></li>
              <li><a href="/signup" class="hover:text-indigo-400 transition-colors">Sign Up</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Connect</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-indigo-400 transition-colors">GitHub</a></li>
              <li><a href="#" class="hover:text-indigo-400 transition-colors">LinkedIn</a></li>
              <li><a href="#" class="hover:text-indigo-400 transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; 2026 Pitching Platform. All rights reserved.
        </div>
      </div>
    </footer>

    <!-- Auth modals (design-only) -->
    <LoginForm v-if="showLogin" @close="showLogin = false" @submit="handleLogin" />

  </div>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-slide-content-enter-active, .fade-slide-content-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-slide-content-enter-from, .fade-slide-content-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
.fade-slide-content-enter-to, .fade-slide-content-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
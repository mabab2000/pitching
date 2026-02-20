<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import localBanner1 from '../images/banner1.jpeg'
import localBanner2 from "../images/banner2.jpeg";
import localBanner3 from "../images/banner3.png";

// Banner slides (each slide has image + its own content)
const bannerSlides = [
  // Local image slide with no content (image-only)
  {
    image: localBanner1,
    eyebrow: '',
    titleTop: '',
    titleAccent: '',
    subtitle: '',
    ctaPrimary: '',
    ctaSecondary: '',
  },
   {
    image: localBanner3,
    eyebrow: '',
    titleTop: '',
    titleAccent: '',
    subtitle: '',
    ctaPrimary: '',
    ctaSecondary: '',
  },
    {
    image: localBanner2,
    eyebrow: '',
    titleTop: '',
    titleAccent: '',
    subtitle: '',
    ctaPrimary: '',
    ctaSecondary: '',
  },
]
const currentIndex = ref(0)
const currentImage = computed(() => bannerSlides[currentIndex.value].image)
const currentSlide = computed(() => bannerSlides[currentIndex.value])
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
    description:
      'A modern developer portal built with Vue 3 and Vite, providing comprehensive API documentation and interactive playgrounds for seamless developer experience.',
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
    description:
      'A full-stack e-commerce platform featuring real-time inventory management, payment processing, and a sleek mobile-responsive storefront.',
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
    description:
      'An analytics dashboard that visualizes complex datasets with interactive charts, allowing teams to make data-driven decisions faster.',
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
    description:
      'A collaborative project management tool with drag-and-drop Kanban boards, time tracking, and real-time team notifications.',
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
    description:
      'A plug-and-play authentication library supporting OAuth 2.0, passkeys, and multi-factor authentication with zero-config setup.',
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
    description:
      'CLI and dashboard for one-command deployments to major cloud providers with automatic scaling, rollback, and infrastructure monitoring.',
    link: 'https://github.com',
    tags: ['DevOps', 'Kubernetes', 'Go'],
    ownerName: 'Olivia Nguyen',
    ownerImage: 'https://i.pravatar.cc/150?img=9',
    ownerRole: 'DevOps Engineer',
    ownerLink: 'https://github.com/olivia',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <!-- ===== BANNER ===== -->
    <header class="relative w-full h-[520px] md:h-[620px] lg:h-[720px] overflow-hidden" @mouseenter="paused = true" @mouseleave="paused = false">
      <!-- Sliding background image (Vue transitions handle sweet slide/fade) -->
      <transition name="fade-slide" mode="out-in">
        <img
          :src="currentImage"
          :key="currentImage"
          alt="banner"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </transition>
      <!-- Dark gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-black/60 to-transparent"></div>

      <!-- Banner text content (per-slide) -->
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
              <a
                href="#projects"
                class="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg md:text-xl font-extrabold rounded-2xl transition-colors duration-200 shadow-xl"
              >
                Browse Projects
              </a>
            </div>
          </div>
        </transition>
      </div>

      <!-- Decorative wave bottom -->
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

      <!-- 3-cards-per-row grid on large screens -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in projects"
          :key="project.name"
          v-bind="project"
        />
      </div>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="text-center py-8 text-gray-400 text-sm border-t border-gray-200">
      &copy; 2026 My Portfolio. All rights reserved.
    </footer>

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

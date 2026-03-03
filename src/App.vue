<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import LoginForm from './components/LoginForm.vue'
import Toast from './components/Toast.vue'
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

onMounted(() => {
  startInterval()
  fetchProjects()
})
onUnmounted(() => stopInterval())

// Featured projects state
const projects = ref<any[]>([])
const loadingProjects = ref(true)
const projectsError = ref('')

// Fetch projects from API
async function fetchProjects() {
  loadingProjects.value = true
  projectsError.value = ''
  try {
    const res = await fetch('https://pitching-backend.onrender.com/projects', {
      method: 'GET',
      headers: { accept: 'application/json' }
    })

    if (res.ok) {
      const data = await res.json()
      // Transform API data to match ProjectCard props
      projects.value = data.map((project: any) => ({
        image: project.project_profile_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
        name: project.project_name || 'Untitled Project',
        description: project.description || 'No description available.',
        link: project.project_link || '',
        tags: [],
        ownerName: project.project_leader?.full_name || 'Unknown',
        ownerImage: project.project_leader?.profile_image || '',
        ownerRole: 'Project Leader',
        ownerLink: '#',
        group: project.project_leader?.members?.length > 0 ? {
          name: 'Team',
          members: project.project_leader.members.map((member: any) => ({
            name: member.name || 'Unknown',
            image: member.image || '',
            role: 'Member',
            email: member.email || ''
          }))
        } : undefined
      }))
    } else {
      projectsError.value = 'Failed to load projects'
      console.error('Failed to fetch projects:', res.status)
    }
  } catch (err) {
    projectsError.value = 'Network error loading projects'
    console.error('Error fetching projects:', err)
  } finally {
    loadingProjects.value = false
  }
}

// UI state for auth modal and auth actions
const showLogin = ref(false)
const authSubmitting = ref(false)

const toast = reactive({ show: false, title: '', message: '', type: 'success' as 'success' | 'error' })

async function handleLogin(payload: { username: string; password: string }) {
  if (authSubmitting.value) return
  authSubmitting.value = true
  try {
    // map username -> email for backend
    const body = { email: payload.username.trim(), password: payload.password }
    // eslint-disable-next-line no-console
    console.log('Logging in:', body)
    const res = await fetch('https://pitching-backend.onrender.com/login', {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (res.ok) {
      const data = await res.json()
      // eslint-disable-next-line no-console
      console.log('Login success:', data)
      
      // persist basic user info and token
      try { 
        localStorage.setItem('user', JSON.stringify(data))
        if (data.access_token) {
          localStorage.setItem('token', data.access_token)
        }
      } catch (e) { /* ignore */ }

      // Determine role and redirect accordingly
      const role = (data.role || 'member').toLowerCase()
      let redirectPath = '/dashboard'
      
      // Role-based dashboard routing
      if (role === 'admin') {
        toast.title = 'Admin Access Granted'
        toast.message = 'Welcome to admin dashboard'
      } else if (role === 'leader') {
        toast.title = 'Leader Access Granted'
        toast.message = 'Welcome to your project dashboard'
      } else if (role === 'individual') {
        toast.title = 'Individual Access Granted'
        toast.message = 'Welcome to your personal project dashboard'
      } else {
        toast.title = 'Signed in'
        toast.message = 'Welcome to your dashboard'
      }

      toast.show = true
      toast.type = 'success'

      // close modal and redirect to dashboard after a short delay
      showLogin.value = false
      setTimeout(() => (window.location.href = redirectPath), 1200)
    } else {
      const err = await res.json().catch(() => ({ message: 'Login failed' }))
      // eslint-disable-next-line no-console
      console.warn('Login failed:', res.status, err)
      toast.show = true
      toast.title = res.status === 401 ? 'Invalid credentials' : 'Login error'
      toast.message = err.detail || err.message || 'Please check your credentials.'
      toast.type = 'error'
      authSubmitting.value = false
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Login network error:', err)
    toast.show = true
    toast.title = 'Network error'
    toast.message = 'Please check your connection and try again.'
    toast.type = 'error'
    authSubmitting.value = false
  }
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

      <!-- Loading state -->
      <div v-if="loadingProjects" class="flex justify-center items-center py-20">
        <div class="flex flex-col items-center gap-4">
          <div class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p class="text-gray-600 font-medium">Loading projects...</p>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="projectsError" class="flex justify-center items-center py-20">
        <div class="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-red-800 mb-2">Failed to load projects</h3>
          <p class="text-red-600 mb-4">{{ projectsError }}</p>
          <button @click="fetchProjects" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      </div>

      <!-- Projects grid -->
      <div v-else-if="projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in projects"
          :key="project.name"
          v-bind="project"
          imageHeight="h-40 md:h-44 lg:h-48"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="flex justify-center items-center py-20">
        <div class="text-center">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No projects yet</h3>
          <p class="text-gray-500">Check back soon for featured projects!</p>
        </div>
      </div>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="text-white font-bold text-xl mb-4">Tech Forward Live</h3>
            <p class="text-base text-gray-400 leading-relaxed">The flagship innovation event where founders, engineers, and product teams pitch solutions that move technology forward.</p>
          </div>
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Event Information</h4>
            <ul class="space-y-2 text-base">
              <li><span class="text-gray-400">Theme: Building impactful digital solutions</span></li>
              <li><span class="text-gray-400">Tracks: AI, HealthTech, FinTech, GreenTech</span></li>
              <li><span class="text-gray-400">Audience: Innovators, mentors, investors</span></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold text-lg mb-4">Contact & Support</h4>
            <ul class="space-y-2 text-base">
              <li><a href="mailto:info@techforwardlive.com" class="hover:text-indigo-400 transition-colors">info@santechinnovate.com</a></li>
              <li><a href="mailto:projects@techforwardlive.com" class="hover:text-indigo-400 transition-colors">+250780309833 / +22371005873</a></li>
              <li><span class="text-gray-400">March 6, 1:30 AM - 5:30 PM</span></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-3 text-base text-gray-500">
          <p>&copy; 2026 Tech Forward Live. All rights reserved.</p>
          <p>Powered for leaders, members, and individual innovators.</p>
        </div>
      </div>
    </footer>

    <!-- Auth modals (design-only) -->
    <LoginForm v-if="showLogin" @close="showLogin = false" @submit="handleLogin" :submitting="authSubmitting" />
    <Toast :show="toast.show" :title="toast.title" :message="toast.message" :type="toast.type" :duration="3000" @close="toast.show = false" />

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
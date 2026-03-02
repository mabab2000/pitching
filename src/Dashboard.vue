<template>
  <div class="min-h-screen flex bg-gray-50">
    <aside class="w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-6 shadow-xl">
      <div class="mb-8">
        <h1 class="text-2xl font-extrabold tracking-tight">Pitching Event</h1>
        <p class="text-indigo-200 text-sm mt-1">Dashboard</p>
      </div>
      <nav class="space-y-1">
        <button @click="active = 'overview'" :class="btnClass('overview')" class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span class="font-medium">Overview</span>
        </button>
        <button @click="active = 'project'" :class="btnClass('project')" class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <span class="font-medium">Projects</span>
        </button>
        <button @click="active = 'team'" :class="btnClass('team')" class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span class="font-medium">Team</span>
        </button>
      </nav>
      <div class="mt-auto pt-8 border-t border-indigo-700">
        <button @click="logout" class="w-full text-left px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-700 transition-all duration-200 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span class="font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8">
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 capitalize">{{ active }}</h2>
            <p class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
          </div>
          <div class="flex gap-3">
            <button v-if="active === 'project'" @click="createProject" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              New Project
            </button>
          </div>
        </div>
      </header>
      <Overview v-if="active === 'overview'" :stats="stats" :projects="projects" :team="teamMembers" :upcoming="upcoming" :winners="winners" />
      <ProjectsList v-if="active === 'project'" :projects="projects" />
      <TeamList v-if="active === 'team'" :team="teamMembers" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Overview from './components/Overview.vue'
import ProjectsList from './components/ProjectsList.vue'
import TeamList from './components/TeamList.vue'

type DashboardSection = 'overview' | 'project' | 'team'

const subtitle = 'Project pitching event - manage projects, schedule and teams.'

function sectionFromPath(pathname: string): DashboardSection {
  if (pathname === '/dashboard/project') return 'project'
  if (pathname === '/dashboard/team') return 'team'
  return 'overview'
}

const active = ref<DashboardSection>(sectionFromPath(window.location.pathname))

function btnClass(name: string) {
  return active.value === name 
    ? 'bg-white bg-opacity-20 text-white shadow-lg'
    : 'text-indigo-100 hover:bg-white hover:bg-opacity-10'
}

function navigate(section: DashboardSection) {
  const target = `/dashboard/${section}`
  if (window.location.pathname !== target) {
    window.history.pushState({}, '', target)
  }
  active.value = section
}

function logout() {
  window.location.href = '/'
}

function createProject() {
  // design-only: add a sample project to the list
  const id = Date.now()
  projects.value.unshift({
    id,
    title: 'New Project ' + id,
    description: 'Quick pitch placeholder.',
    team: 'TBD',
    stage: 'Idea',
    requested: 5000,
    votes: 0,
  })
  navigate('project')
}

function handlePopState() {
  active.value = sectionFromPath(window.location.pathname)
}

onMounted(() => window.addEventListener('popstate', handlePopState))
onUnmounted(() => window.removeEventListener('popstate', handlePopState))

// sample data for pitching event
const stats = { events: 3, registrations: 186 }

const projects = ref<Array<any>>([
  { id: 1, title: 'GreenGrid', description: 'Microgrid management for rural communities.', team: 'Green Team', stage: 'Prototype', requested: 25000, votes: 124, image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&q=80' },
])

const upcoming = ref([
  { id: 's1', project: 'GreenGrid', time: 'Mar 5, 10:00 AM', panel: 'Energy', room: 'A' },
])

const winners = ref([
  { id: 1, project: 'GreenGrid', prize: '$25,000', year: 2025 },
])

const teamMembers = ref([
  { id: 1, name: 'Ava Thompson', role: 'Founder, GreenGrid', email: 'ava@example.com', image: 'https://i.pravatar.cc/150?img=12', bio: 'Engineer focused on sustainable energy solutions.' },
  { id: 2, name: 'Liam Garcia', role: 'Product Lead, HealLink', email: 'liam@example.com', image: 'https://i.pravatar.cc/150?img=32', bio: 'Full-stack developer with healthcare experience.' },
  { id: 3, name: 'Priya Singh', role: 'UX, EduSpark', email: 'priya@example.com', image: 'https://i.pravatar.cc/150?img=44', bio: 'Designer building inclusive education products.' },
])
</script>

<style scoped>
/* layout uses Tailwind; keep scoped styles minimal */
</style>

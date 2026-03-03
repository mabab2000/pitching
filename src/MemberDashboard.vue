<template>
  <div class="min-h-screen flex bg-gray-50">
    <aside class="w-64 bg-gradient-to-b from-green-900 to-green-800 text-white p-6 shadow-xl">
      <div class="mb-8">
        <h1 class="text-2xl font-extrabold tracking-tight">Member Panel</h1>
        <p class="text-green-200 text-sm mt-1">View Profile, Projects & Team</p>
      </div>

      <!-- Profile Section -->
      <div class="mb-6 pb-6 border-b border-green-700">
        <div class="flex items-center gap-3">
          <img 
            v-if="currentUser?.profile_image" 
            :src="currentUser.profile_image" 
            :alt="currentUser.full_name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div v-else class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm truncate">{{ currentUser?.full_name || 'Member' }}</p>
            <p class="text-xs text-green-200 truncate">{{ currentUser?.email || 'member@example.com' }}</p>
          </div>
        </div>
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
        <button @click="active = 'profile'" :class="btnClass('profile')" class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span class="font-medium">My Profile</span>
        </button>
        <button @click="active = 'team'" :class="btnClass('team')" class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span class="font-medium">My Team</span>
        </button>
      </nav>
      <div class="mt-auto pt-8 border-t border-green-700">
        <button @click="logout" class="w-full text-left px-4 py-3 rounded-lg text-green-100 hover:bg-green-700 transition-all duration-200 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span class="font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8">
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-3xl font-bold text-gray-800">Welcome, {{ currentUser?.full_name || 'Member' }}</h2>
            <p class="text-gray-500 mt-1">View your profile and projects</p>
          </div>
        </div>
      </header>
      
      <!-- Overview Section -->
      <div v-if="active === 'overview'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-medium">Total Projects</p>
                <p class="text-3xl font-bold text-gray-800 mt-2">{{ projects.length }}</p>
              </div>
              <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-medium">Team Members</p>
                <p class="text-3xl font-bold text-gray-800 mt-2">{{ teamMembers.length }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-medium">Your Status</p>
                <p class="text-3xl font-bold text-gray-800 mt-2">{{ currentUser?.status || 'Pending' }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-medium">Your Role</p>
                <p class="text-3xl font-bold text-gray-800 mt-2">Member</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Projects -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Recent Projects</h3>
          <div v-if="projects.length > 0" class="space-y-3">
            <div v-for="project in projects.slice(0, 3)" :key="project.id" class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <img v-if="project.image" :src="project.image" :alt="project.title" class="w-16 h-16 rounded-lg object-cover" />
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800">{{ project.title }}</h4>
                <p class="text-sm text-gray-500">{{ project.description?.substring(0, 80) }}...</p>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500 text-center py-4">No projects available</p>
        </div>
      </div>

      <!-- Projects List -->
      <div v-if="active === 'project'" class="space-y-6">
        <div class="flex items-center gap-4 mb-8">
          <div class="flex-1 h-px bg-gray-200"></div>
          <h2 class="text-2xl font-bold text-gray-800 whitespace-nowrap">All Projects</h2>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <!-- Loading State -->
        <div v-if="loadingProjects" class="flex justify-center items-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div class="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <p class="text-gray-600 font-medium">Loading projects...</p>
          </div>
        </div>

        <!-- Projects Grid -->
        <div v-else-if="projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="project in projects" :key="project.id" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <!-- Project Image -->
            <div class="relative h-48 overflow-hidden bg-gray-100">
              <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>

            <!-- Project Content -->
            <div class="p-6 flex flex-col h-full">
              <!-- Project Title -->
              <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{{ project.title }}</h3>

              <!-- Project Description -->
              <p class="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{{ project.description || 'No description available.' }}</p>

              <!-- Project Stats -->
              <div class="space-y-3 pt-4 border-t border-gray-100">
                <!-- Votes -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                    <span>{{ project.votes || 0 }} votes</span>
                  </div>
                </div>

                <!-- Leader Info -->
                <div v-if="project.leaderName || project.leaderImage" class="flex items-center gap-3 pt-2">
                  <img v-if="project.leaderImage" :src="project.leaderImage" :alt="project.leaderName" class="w-8 h-8 rounded-full object-cover" />
                  <div v-else class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-700 truncate">{{ project.leaderName || 'Unknown' }}</p>
                    <p class="text-xs text-gray-500">Project Leader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex justify-center items-center py-20">
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">No projects available</h3>
            <p class="text-gray-500">Check back soon for new projects</p>
          </div>
        </div>
      </div>

      <!-- Profile Section -->
      <div v-if="active === 'profile'" class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Profile Header Background -->
          <div class="h-32 bg-gradient-to-r from-green-500 to-green-600"></div>
          
          <!-- Profile Content -->
          <div class="px-8 pb-8">
            <div class="flex flex-col sm:flex-row sm:items-end sm:gap-6 -mt-16 mb-8">
              <!-- Profile Image -->
              <div class="relative mb-4 sm:mb-0">
                <img 
                  v-if="currentUser?.profile_image" 
                  :src="currentUser.profile_image" 
                  :alt="currentUser.full_name"
                  class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div v-else class="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center border-4 border-white shadow-lg">
                  <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
              </div>
              
              <!-- Profile Info -->
              <div>
                <h1 class="text-3xl font-bold text-gray-800">{{ currentUser?.full_name || 'Member' }}</h1>
                <p class="text-gray-600 mt-1">{{ currentUser?.role || 'Member' }}</p>
              </div>
            </div>
            
            <!-- Profile Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Email</p>
                <p class="text-lg text-gray-800 break-words">{{ currentUser?.email || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Role</p>
                <p class="text-lg text-gray-800 capitalize">{{ currentUser?.role || 'Member' }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Status</p>
                <div class="flex items-center gap-2 mt-1">
                  <span v-if="currentUser?.status === 'approved'" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    Approved
                  </span>
                  <span v-else-if="currentUser?.status === 'rejected'" class="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                    Rejected
                  </span>
                  <span v-else class="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    Pending
                  </span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">Member Since</p>
                <p class="text-lg text-gray-800">{{ new Date().toLocaleDateString() }}</p>
              </div>
            </div>
            
            <!-- Profile Stats -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div class="text-center">
                <p class="text-2xl font-bold text-green-600">{{ projects.length }}</p>
                <p class="text-sm text-gray-600 mt-1">Projects</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-indigo-600">Member</p>
                <p class="text-sm text-gray-600 mt-1">Role Status</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-purple-600">Active</p>
                <p class="text-sm text-gray-600 mt-1">Account Status</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- My Team Section -->
      <TeamList v-if="active === 'team'" :team="teamMembers" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TeamList from './components/TeamList.vue'


type DashboardSection = 'overview' | 'project' | 'profile' | 'team'

const currentUser = ref<any>(null)
let authToken: string | null = null
try {
  const raw = localStorage.getItem('user')
  if (raw) currentUser.value = JSON.parse(raw)
  authToken = localStorage.getItem('token')
} catch (e) { /* ignore */ }

const active = ref<DashboardSection>('overview')

function btnClass(name: string) {
  return active.value === name 
    ? 'bg-white bg-opacity-20 text-white shadow-lg'
    : 'text-green-100 hover:bg-white hover:bg-opacity-10'
}

function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  window.location.href = '/'
}

const projects = ref<Array<any>>([])
const teamMembers = ref<Array<any>>([])
const loadingProjects = ref(false)

async function loadAllProjects() {
  if (!currentUser.value || !currentUser.value.id) return
  const memberId = currentUser.value.id
  loadingProjects.value = true
  try {
    const headers: any = { accept: 'application/json' }
    if (authToken) headers.Authorization = `Bearer ${authToken}`
    const res = await fetch(`https://pitching-backend.onrender.com/projects/by-member/${memberId}`, { headers })
    if (res.ok) {
      const data = await res.json()
      projects.value = (data || []).map((p: any) => ({
        id: p.id,
        title: p.project_name || p.title || '',
        description: p.description || '',
        votes: p.votes || 0,
        image: p.project_image_url || p.project_profile_image || p.image || '',
        leaderImage: p.leader_image_url || p.project_leader?.profile_image || '',
        leaderName: p.project_leader?.full_name || 'Project Leader',
        membersCount: p.project_leader?.members?.length || 0
      }))
    } else {
      console.warn('Failed to load member projects', res.status)
    }
  } catch (err) {
    console.error('Error loading projects', err)
  } finally {
    loadingProjects.value = false
  }
}

async function loadTeamMembers() {
  if (!currentUser.value || !currentUser.value.id) return
  const memberId = currentUser.value.id
  try {
    const headers: any = { accept: 'application/json' }
    if (authToken) headers.Authorization = `Bearer ${authToken}`
    
    const res = await fetch(`https://pitching-backend.onrender.com/projects/member/${memberId}`, { headers })
    if (res.ok) {
      const data = await res.json()
      teamMembers.value = (data || []).map((m: any, idx: number) => ({
        id: m.member_id || (`member-${idx}`),
        name: m.name || '',
        email: m.email || '',
        role: 'Team Member',
        image: m.profile_image || '',
        status: m.status || 'pending'
      }))
    } else {
      console.warn('Failed to load team members', res.status)
    }
  } catch (err) {
    console.error('Error loading team members', err)
  }
}

onMounted(() => {
  loadAllProjects()
  loadTeamMembers()
})
</script>

<style scoped>
/* layout uses Tailwind; keep scoped styles minimal */
</style>

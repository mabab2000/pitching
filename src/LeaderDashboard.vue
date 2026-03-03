<template>
  <div class="min-h-screen flex bg-gray-50">
    <aside class="w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-6 shadow-xl">
      <div class="mb-8">
        <h1 class="text-2xl font-extrabold tracking-tight">Leader Panel</h1>
        <p class="text-indigo-200 text-sm mt-1">Project Management</p>
      </div>

      <!-- Profile Section -->
      <div class="mb-6 pb-6 border-b border-indigo-700">
        <div class="flex items-center gap-3">
          <img 
            v-if="currentUser?.profile_image" 
            :src="currentUser.profile_image" 
            :alt="currentUser.full_name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div v-else class="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm truncate">{{ currentUser?.full_name || 'Leader' }}</p>
            <p class="text-xs text-indigo-200 truncate">{{ currentUser?.email || 'leader@example.com' }}</p>
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
          <span class="font-medium">My Projects</span>
        </button>
        <button @click="active = 'team'" :class="btnClass('team')" class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span class="font-medium">My Team</span>
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
            <h2 class="text-3xl font-bold text-gray-800">Welcome, {{ currentUser?.full_name || 'Leader' }}</h2>
            <p class="text-gray-500 mt-1">Manage your projects and team</p>
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
      <ProjectsList v-if="active === 'project'" :projects="projects" @delete="deleteProject" />
      <TeamManagement 
        v-if="active === 'team'" 
        :team="teamMembers"
        @approve="approveTeamMember"
        @reject="rejectTeamMember"
        ref="teamManagementRef"
      />

      <ProjectFormModal v-if="showProjectModal" @close="showProjectModal = false" @submit="addProject" />
      <Toast :show="toast.show" :title="toast.title" :message="toast.message" :type="toast.type" :duration="3000" @close="toast.show = false" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import Overview from './components/Overview.vue'
import ProjectsList from './components/ProjectsList.vue'
import TeamManagement from './components/TeamManagement.vue'
import ProjectFormModal from './components/ProjectFormModal.vue'
import Toast from './components/Toast.vue'

type DashboardSection = 'overview' | 'project' | 'team'

const currentUser = ref<any>(null)
let authToken: string | null = null
try {
  const raw = localStorage.getItem('user')
  if (raw) currentUser.value = JSON.parse(raw)
  authToken = localStorage.getItem('token')
} catch (e) { /* ignore */ }

const active = ref<DashboardSection>('overview')
const teamManagementRef = ref<any>(null)

function btnClass(name: string) {
  return active.value === name 
    ? 'bg-white bg-opacity-20 text-white shadow-lg'
    : 'text-indigo-100 hover:bg-white hover:bg-opacity-10'
}

function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  window.location.href = '/'
}

const showProjectModal = ref(false)

function createProject() {
  showProjectModal.value = true
}

const toast = reactive({ show: false, title: '', message: '', type: 'success' as 'success' | 'error' })

function addProject(payload: any) {
  const p = {
    id: payload.id,
    title: payload.project_name || payload.title || '',
    description: payload.description || '',
    team: '',
    stage: '',
    requested: 0,
    votes: payload.votes || 0,
    image: payload.project_image_url || payload.image || payload.project_image || '',
    leaderImage: payload.leader_image_url || payload.leader_image || '',
  }
  projects.value.unshift(p)
  toast.show = true
  toast.title = 'Project created'
  toast.message = payload.title + ' has been added.'
  toast.type = 'success'
  active.value = 'project'
  showProjectModal.value = false
}

const stats = ref({ events: 3, registrations: 186 })
const projects = ref<Array<any>>([])
const teamMembers = ref<Array<any>>([])
const upcoming = ref([])
const winners = ref([])

onMounted(() => {
  loadLeaderProjects()
  loadTeamMembers()
})

async function loadLeaderProjects() {
  if (!currentUser.value || !currentUser.value.id) return
  const id = currentUser.value.id
  try {
    const headers: any = { accept: 'application/json' }
    if (authToken) headers.Authorization = `Bearer ${authToken}`
    const res = await fetch(`https://pitching-backend.onrender.com/projects/leader/${id}`, { headers })
    if (res.ok) {
      const data = await res.json()
      projects.value = (data || []).map((p: any) => ({
        id: p.id,
        title: p.project_name || p.title || '',
        description: p.description || '',
        team: '',
        stage: '',
        requested: 0,
        votes: p.votes || 0,
        image: p.project_image_url || p.image || '',
        leaderImage: p.leader_image_url || '',
      }))
    } else {
      console.warn('Failed to load leader projects', res.status)
    }
  } catch (err) {
    console.error('Error loading leader projects', err)
  }
}

async function loadTeamMembers() {
  if (!currentUser.value || !currentUser.value.id) {
    console.warn('No current user ID available')
    return
  }
  const id = currentUser.value.id
  try {
    const headers: any = { accept: 'application/json' }
    if (authToken) headers.Authorization = `Bearer ${authToken}`
    
    const url = `https://pitching-backend.onrender.com/members/leader/${id}`
    console.log('Fetching team members from:', url)
    
    const res = await fetch(url, { headers })
    
    if (res.ok) {
      const data = await res.json()
      console.log('Team members response:', data)
      
      // Map the API response to component props
      teamMembers.value = (data || []).map((m: any, idx: number) => ({
        id: m.member_id || m.email || (`member-${idx}`),
        name: m.full_name || '',
        email: m.email || '',
        role: m.role || 'Team Member',
        image: m.profile_image || '',
        status: m.status || 'pending'
      }))
      
      console.log('Mapped team members:', teamMembers.value)
    } else {
      const errText = await res.text().catch(() => 'Unknown error')
      console.error('Failed to load team members:', res.status, errText)
      toast.show = true
      toast.title = 'Failed to load team'
      toast.message = `Error ${res.status}: Could not fetch team members`
      toast.type = 'error'
    }
  } catch (err) {
    console.error('Error loading team members:', err)
    toast.show = true
    toast.title = 'Network error'
    toast.message = 'Failed to fetch team members. Please try again.'
    toast.type = 'error'
  }
}

async function deleteProject(id: string | number) {
  if (!id) return
  if (!confirm('Delete this project? This action cannot be undone.')) return
  try {
    const headers: any = { accept: 'application/json' }
    if (authToken) headers.Authorization = `Bearer ${authToken}`
    const res = await fetch(`https://pitching-backend.onrender.com/projects/${id}`, { method: 'DELETE', headers })
    if (res.ok) {
      projects.value = projects.value.filter(p => String(p.id) !== String(id))
      toast.show = true
      toast.title = 'Deleted'
      toast.message = 'Project removed successfully.'
      toast.type = 'success'
    } else {
      const err = await res.json().catch(() => ({ message: 'Delete failed' }))
      toast.show = true
      toast.title = 'Delete failed'
      toast.message = err.detail || err.message || 'Could not delete project.'
      toast.type = 'error'
    }
  } catch (err) {
    console.error('Delete error', err)
    toast.show = true
    toast.title = 'Network error'
    toast.message = 'Failed to delete project.'
    toast.type = 'error'
  }
}

async function approveTeamMember(member: any, index: number) {
  const result = await Swal.fire({
    title: 'Approve Team Member?',
    text: `Are you sure you want to approve ${member.name}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Approve',
    confirmButtonColor: '#10b981',
    cancelButtonText: 'Cancel'
  })
  if (!result.isConfirmed) return

  teamManagementRef.value?.setApproving(index, true)

  try {
    const headers: any = { accept: 'application/json', 'Content-Type': 'application/json' }
    if (authToken) headers.Authorization = `Bearer ${authToken}`
    const body = JSON.stringify({ status: 'approved' })
    const res = await fetch(`https://pitching-backend.onrender.com/users/${member.id}/status`, { method: 'PATCH', headers, body })
    if (res.ok) {
      // Update the team member in the list
      teamMembers.value = teamMembers.value.map(m => 
        (String(m.id) === String(member.id) ? { ...m, status: 'approved' } : m)
      )
      Swal.fire('Approved!', `${member.name} has been approved`, 'success')
    } else {
      const err = await res.json().catch(() => ({ message: 'Approve failed' }))
      Swal.fire('Error', err.detail || err.message || 'Could not approve team member.', 'error')
    }
  } catch (err) {
    console.error('Approve error', err)
    Swal.fire('Network Error', 'Failed to approve team member.', 'error')
  } finally {
    teamManagementRef.value?.setApproving(index, false)
  }
}

async function rejectTeamMember(member: any, index: number) {
  const result = await Swal.fire({
    title: 'Reject Team Member?',
    text: `Are you sure you want to reject ${member.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Reject',
    confirmButtonColor: '#ef4444',
    cancelButtonText: 'Cancel'
  })
  if (!result.isConfirmed) return

  teamManagementRef.value?.setApproving(index, true)

  try {
    const headers: any = { accept: 'application/json', 'Content-Type': 'application/json' }
    if (authToken) headers.Authorization = `Bearer ${authToken}`
    const body = JSON.stringify({ status: 'rejected' })
    const res = await fetch(`https://pitching-backend.onrender.com/users/${member.id}/status`, { method: 'PATCH', headers, body })
    if (res.ok) {
      // Update the team member in the list
      teamMembers.value = teamMembers.value.map(m => 
        (String(m.id) === String(member.id) ? { ...m, status: 'rejected' } : m)
      )
      Swal.fire('Rejected!', `${member.name} has been rejected`, 'success')
    } else {
      const err = await res.json().catch(() => ({ message: 'Reject failed' }))
      Swal.fire('Error', err.detail || err.message || 'Could not reject team member.', 'error')
    }
  } catch (err) {
    console.error('Reject error', err)
    Swal.fire('Network Error', 'Failed to reject team member.', 'error')
  } finally {
    teamManagementRef.value?.setApproving(index, false)
  }
}
</script>

<style scoped>
/* layout uses Tailwind; keep scoped styles minimal */
</style>

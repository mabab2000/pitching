<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="absolute inset-0" @click="$emit('close')"></div>

    <div class="bg-white rounded-2xl p-6 w-full max-w-2xl z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">Create New Project</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">Close</button>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input v-model="title" type="text" class="w-full px-4 py-2 border rounded-lg" placeholder="Project name" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea v-model="description" rows="4" class="w-full px-4 py-2 border rounded-lg" placeholder="Short description" required></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Team Leader Profile Image</label>
            <input @change="onLeaderImage($event)" type="file" accept="image/*" class="w-full" />
            <p v-if="!leaderImageData && tried" class="text-sm text-red-600 mt-1">Leader image is required.</p>
            <img v-if="leaderImageData" :src="leaderImageData" class="mt-3 w-28 h-28 rounded-full object-cover border" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project Dashboard Image</label>
            <input @change="onProjectImage($event)" type="file" accept="image/*" class="w-full" />
            <p v-if="!projectImageData && tried" class="text-sm text-red-600 mt-1">Project image is required.</p>
            <img v-if="projectImageData" :src="projectImageData" class="mt-3 w-full h-28 rounded-lg object-cover border" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Team Leader</label>
          <div v-if="currentUser">
            <div class="flex items-center gap-3">
              <img :src="currentUser.image || 'https://i.pravatar.cc/40'" alt="leader" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <div class="font-medium">{{ currentUser.full_name || currentUser.name || currentUser.email }}</div>
                <div class="text-sm text-gray-500">You (project leader)</div>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-sm text-red-600">You must be signed in to create a project.</p>
          </div>
        </div>

        <div v-if="errorMsg" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mt-2">{{ errorMsg }}</div>

        <div class="flex items-center justify-end gap-3 mt-4">
          <button type="button" @click="$emit('close')" :disabled="submitting" class="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50">Cancel</button>
          <button type="submit" :disabled="submitting || !isValid" class="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2">
            <svg v-if="submitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>{{ submitting ? 'Creating...' : 'Create Project' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{ leaders?: { id: string | number; name: string }[] }>()
const emit = defineEmits(['close', 'submit'])

// current logged-in user (reads from localStorage 'user')
const currentUser = ref<any>(null)
try {
  const raw = localStorage.getItem('user')
  if (raw) currentUser.value = JSON.parse(raw)
} catch (e) {
  /* ignore parse errors */
}

const title = ref('')
const description = ref('')
const leaderImageFile = ref<File | null>(null)
const projectImageFile = ref<File | null>(null)
const leaderImageData = ref<string | null>(null)
const projectImageData = ref<string | null>(null)
const submitting = ref(false)
const errorMsg = ref<string | null>(null)
const tried = ref(false)
// leaderId removed; leader is taken from logged-in user

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function onLeaderImage(e: Event) {
  const input = e.target as HTMLInputElement
  const f = input.files && input.files[0]
  if (!f) return
  leaderImageFile.value = f
  readFileAsDataUrl(f).then(s => (leaderImageData.value = s)).catch(() => { leaderImageData.value = null })
}

function onProjectImage(e: Event) {
  const input = e.target as HTMLInputElement
  const f = input.files && input.files[0]
  if (!f) return
  projectImageFile.value = f
  readFileAsDataUrl(f).then(s => (projectImageData.value = s)).catch(() => { projectImageData.value = null })
}

// require title, description and both images; leader comes from logged-in user
const isValid = computed(() => {
  return (
    title.value.trim().length > 0 &&
    description.value.trim().length > 0 &&
    !!leaderImageData.value &&
    !!projectImageData.value
  )
})

async function submit() {
  tried.value = true
  errorMsg.value = null
  if (!isValid.value) return
  if (!leaderImageFile.value || !projectImageFile.value) return
  submitting.value = true

    try {
    const form = new FormData()
    const userId = currentUser?.value?.id || currentUser?.value?.userId || currentUser?.value?.email
    if (!userId) {
      errorMsg.value = 'You must be signed in to create a project.'
      submitting.value = false
      return
    }
    form.append('leader_id', String(userId))
    form.append('project_name', title.value.trim())
    form.append('description', description.value.trim())
    form.append('project_image', projectImageFile.value)
    form.append('leader_image', leaderImageFile.value)

    const res = await fetch('https://pitching-backend.onrender.com/projects', {
      method: 'POST',
      body: form,
    })

    if (res.ok) {
      const data = await res.json()
      // emit the created project to parent
      emit('submit', data)
      emit('close')
    } else {
      const err = await res.json().catch(() => ({ message: 'Upload failed' }))
      errorMsg.value = err.detail || err.message || 'Failed to create project'
      submitting.value = false
    }
  } catch (err) {
    // network or unexpected error
    errorMsg.value = 'Network error. Please try again.'
    submitting.value = false
  }
}
</script>

<style scoped>
/* keep styling via Tailwind */
</style>

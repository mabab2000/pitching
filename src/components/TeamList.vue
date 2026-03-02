<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="(m, idx) in team" :key="m.id || idx" class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div class="px-6 py-8 flex flex-col items-center text-center">
        <div class="relative w-28 h-28 mb-4">
          <div class="w-full h-full overflow-hidden rounded-[50%] border-2 border-gray-100 shadow-md">
            <template v-if="m.image">
              <img :src="m.image" :alt="m.name" class="w-full h-full object-cover" />
            </template>
            <template v-else>
              <div class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2a5 5 0 0110 0h2c0-3.866-3.134-7-7-7z"/></svg>
              </div>
            </template>
          </div>

          <!-- update control: show + overlay for logged-in user's own card -->
          <input type="file" :id="`file-${idx}`" class="hidden" accept="image/*" @change="(e) => onProfileUpload(m, e)" />
          <button v-if="isCurrentUser(m)" @click.prevent="triggerFileInput(idx)" class="absolute -right-2 -bottom-2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white">
            <template v-if="uploading === m.email">
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
            </template>
            <template v-else>
              <span class="text-lg font-bold">+</span>
            </template>
          </button>
        </div>

          <h3 class="font-bold text-lg text-gray-900">{{ m.name }}</h3>
        <a :href="'mailto:' + m.email" class="text-sm text-gray-600 mt-1">{{ m.email }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ team: any[] }>()

const uploading = ref<string | null>(null)

// current logged-in user
// read current user dynamically from localStorage to ensure latest value
function getCurrentUser() {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) { return null }
}

function isCurrentUser(member: any) {
  const user = getCurrentUser()
  if (!user) return false
  // match by id (if available) or fallback to email
  if (user.id && member.id && String(user.id) === String(member.id)) return true
  if (user.email && member.email && String(user.email).toLowerCase() === String(member.email).toLowerCase()) return true
  return false
}

async function onProfileUpload(member: any, e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files && input.files[0]
  if (!file) return
  // only allow updating your own profile
  if (!isCurrentUser(member)) return alert('You can only update your own profile image.')

  uploading.value = member.email
  try {
    const form = new FormData()
    form.append('file', file)
    const user = getCurrentUser()
    const memberId = user?.id
    if (!memberId) throw new Error('Not signed in')

    const headers: any = { accept: 'application/json' }
    const token = localStorage.getItem('token')
    if (token) headers.Authorization = `Bearer ${token}`

    const res = await fetch(`https://pitching-backend.onrender.com/members/${memberId}/profile-image`, {
      method: 'POST',
      headers,
      body: form,
    })

    if (res.ok) {
      const data = await res.json()
      // update member image in-place
      member.image = data.profile_image || member.image
    } else {
      const err = await res.json().catch(() => ({ message: 'Upload failed' }))
      alert(err.detail || err.message || 'Failed to upload image')
    }
  } catch (err: any) {
    console.error('Upload error', err)
    alert(err?.message || 'Upload failed')
  } finally {
    uploading.value = null
    // reset input value so same file can be chosen again
    if (input) input.value = ''
  }
}

function triggerFileInput(idx: number) {
  const el = document.getElementById(`file-${idx}`) as HTMLInputElement | null
  el?.click()
}
</script>

<style scoped>
/* Tailwind handles most styling; keep scoped small helpers if needed */
</style>

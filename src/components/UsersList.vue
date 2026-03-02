
<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-lg font-bold">User Management</h3>
        <div class="text-sm text-gray-500">Search, page and manage users</div>
      </div>
      <div class="flex items-center gap-3">
        <input v-model="searchQuery" placeholder="Search by name or email" class="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        <select v-model.number="pageSize" class="px-3 py-2 rounded-lg border border-gray-200">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">S/N</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(u, idx) in paginated" :key="u.id">
            <td class="px-4 py-3 text-sm text-gray-700">{{ (currentPage-1)*pageSize + idx + 1 }}</td>
            <td class="px-4 py-3 text-sm text-gray-800">{{ u.full_name || u.name || '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ u.email }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ u.role || 'user' }}</td>
            <td class="px-4 py-3 text-sm">
              <span :class="statusClass(u.status)">{{ u.status || 'pending' }}</span>
            </td>
            <td class="px-4 py-3 text-sm text-right relative">
              <div class="relative inline-block text-left">
                <button @click.prevent="toggleMenu(u.id)" aria-label="Open actions" class="inline-flex items-center justify-center rounded-md border border-gray-200 w-9 h-9 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <!-- three vertical dots icon -->
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 7a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4z"/></svg>
                </button>

                <div v-if="openId === u.id" class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div class="py-1">
                    <button v-if="u.status !== 'approved'" @click.prevent="approve(u.id); closeMenu()" class="block px-4 py-2 text-sm text-green-700 hover:bg-gray-50">Approve</button>
                    <button v-if="u.status !== 'rejected'" @click.prevent="reject(u.id); closeMenu()" class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-50">Reject</button>
                    <button @click.prevent="$emit('edit', u.id); closeMenu()" class="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-50">Edit</button>
                    <button @click.prevent="confirmDelete(u.id); closeMenu()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Delete</button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="6" class="px-4 py-6 text-center text-gray-500">No users found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <div class="text-sm text-gray-600">Showing {{ startIndex }} - {{ endIndex }} of {{ filtered.length }}</div>
      <div class="flex items-center gap-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 rounded border border-gray-200" >Prev</button>
        <div class="px-3 py-1 bg-gray-100 rounded">{{ currentPage }} / {{ totalPages }}</div>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 rounded border border-gray-200">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{ users: any[] }>()
const emit = defineEmits(['approve', 'reject', 'edit', 'delete'])

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

watch([searchQuery, pageSize], () => { currentPage.value = 1 })

const filtered = computed(() => {
  const q = (searchQuery.value || '').toLowerCase().trim()
  if (!q) return props.users || []
  return (props.users || []).filter((u: any) => {
    return (u.full_name || u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q)
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil((filtered.value.length || 0) / pageSize.value)))

const paginated = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const startIndex = computed(() => filtered.value.length === 0 ? 0 : (currentPage.value -1) * pageSize.value + 1)
const endIndex = computed(() => Math.min(filtered.value.length, currentPage.value * pageSize.value))

function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }

function statusClass(s: string) {
  if (!s) s = 'pending'
  return s === 'approved' ? 'px-2 py-1 rounded bg-green-100 text-green-800 text-sm' : (s === 'rejected' ? 'px-2 py-1 rounded bg-red-100 text-red-800 text-sm' : 'px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-sm')
}

function approve(id: string | number) { emit('approve', id) }
function reject(id: string | number) { emit('reject', id) }

function confirmDelete(id: string | number) {
  if (!confirm('Delete this user? This action cannot be undone.')) return
  emit('delete', id)
}

// dropdown menu state
const openId = ref<string | number | null>(null)
function toggleMenu(id: string | number) {
  openId.value = openId.value === id ? null : id
}
function closeMenu() { openId.value = null }
</script>

<style scoped>
/* minimal custom styles; Tailwind covers UI */
</style>

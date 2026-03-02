<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Events</div>
            <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats.events }}</div>
          </div>
          <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Projects</div>
            <div class="text-3xl font-bold text-gray-900 mt-2">{{ projects.length }}</div>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Teams</div>
            <div class="text-3xl font-bold text-gray-900 mt-2">{{ team.length }}</div>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Registrations</div>
            <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats.registrations }}</div>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Upcoming Pitch Schedule</h3>
            <div class="text-sm text-gray-500">Top 6 priority presenters shown</div>
          </div>
          <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{{ topUpcoming.length }} of {{ props.upcoming?.length || 0 }} prioritized</span>
        </div>
        <ul class="space-y-4">
          <li v-for="slot in topUpcoming" :key="slot.id" class="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100 hover:shadow-md transition-all duration-200">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="font-bold text-xl text-gray-900 mb-2">{{ slot.project }}</div>
                <div class="flex flex-wrap gap-3 text-sm">
                  <span class="text-gray-600 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {{ slot.time }}
                  </span>
                  <span class="text-indigo-600 font-medium flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Panel: {{ slot.panel }}
                  </span>
                  <span class="text-gray-500 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Room {{ slot.room }}
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <template v-if="leadersForProject(slot.project).length">
                  <div v-for="leader in leadersForProject(slot.project)" :key="leader.id" class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <img :src="leader.image || 'https://i.pravatar.cc/40'" alt="leader" class="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100" />
                    <div class="text-sm font-medium text-gray-900">{{ leader.name }}</div>
                  </div>
                </template>
                <div v-else class="text-gray-400 text-sm">No leader listed</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Recent Winners</h3>
          <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        </div>
        <ul class="space-y-4">
          <li v-for="w in winners" :key="w.id" class="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-100 hover:shadow-md transition-all duration-200">
            <div class="w-16 h-16 flex-shrink-0">
              <img :src="(projectForName(w.project)?.image) || 'https://via.placeholder.com/80'" alt="project" class="w-16 h-16 rounded-lg object-cover shadow-md ring-2 ring-yellow-200" />
            </div>
            <div class="flex-1">
              <div class="font-bold text-lg text-gray-900">{{ w.project }}</div>
              <div class="text-sm text-gray-600 mt-1">Team: <span class="font-medium">{{ projectForName(w.project)?.team || '—' }}</span></div>
              <div class="text-sm text-green-700 font-semibold mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Prize: {{ w.prize }}
              </div>
            </div>
            <div class="text-indigo-600 font-bold text-lg px-4 py-2 bg-white rounded-lg shadow-sm">{{ w.year }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// defineProps is auto-imported in <script setup>

const props = defineProps<{
  stats: { events: number; registrations: number }
  projects: any[]
  team: any[]
  upcoming: any[]
  winners: any[]
}>()

function projectVotesFor(name: string) {
  const p = props.projects?.find((x: any) => (x.title || x.project || '').toLowerCase() === (name || '').toLowerCase())
  return (p && (p.votes || 0)) || 0
}

const topUpcoming = computed(() => {
  if (!props.upcoming || props.upcoming.length === 0) return []
  // copy
  const arr = props.upcoming.slice()
  // sort by explicit priority (desc), then by project votes (desc), then keep original order
  arr.sort((a: any, b: any) => {
    const pa = (a.priority ?? null)
    const pb = (b.priority ?? null)
    if (pa !== null && pb !== null) return pb - pa
    if (pa !== null && pb === null) return -1
    if (pa === null && pb !== null) return 1
    const va = projectVotesFor(a.project)
    const vb = projectVotesFor(b.project)
    if (vb !== va) return vb - va
    return 0
  })
  return arr.slice(0, 6)
})

function leadersForProject(name: string) {
  if (!props.team) return []
  const lower = name.toLowerCase()
  return props.team.filter((m: any) => {
    const role = (m.role || '').toLowerCase()
    const team = (m.team || '').toLowerCase()
    const nameMatch = (m.name || '').toLowerCase().includes(lower)
    return role.includes(lower) || team.includes(lower) || nameMatch
  })
}

function projectForName(name: string) {
  if (!props.projects) return null
  return props.projects.find((p: any) => (p.title || p.project || '').toLowerCase() === name.toLowerCase()) || null
}
</script>

<style scoped>
/* rely on Tailwind */
</style>

<template>
  <div>
    <!-- Summary: All projects, Total teams (unique), Team participants -->
    <div class="mb-6">
      <div class="flex flex-col md:flex-row items-stretch gap-4">
        <div class="flex-1 bg-white rounded-xl p-5 shadow-lg border border-gray-100">
          <div class="text-sm text-gray-500 uppercase">All Projects</div>
          <div class="text-2xl font-bold text-gray-900 mt-2">{{ totalProjects }}</div>
        </div>
        <div class="flex-1 bg-white rounded-xl p-5 shadow-lg border border-gray-100">
          <div class="text-sm text-gray-500 uppercase">Total Teams</div>
          <div class="text-2xl font-bold text-gray-900 mt-2">{{ totalTeams }}</div>
        </div>
        <div class="flex-1 bg-white rounded-xl p-5 shadow-lg border border-gray-100">
          <div class="text-sm text-gray-500 uppercase">Team Participants</div>
          <div class="text-2xl font-bold text-gray-900 mt-2">{{ teamParticipants }}</div>
        </div>
      </div>
    </div>

    <!-- Priority Projects -->
    <section class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold text-gray-900">Priority Projects</h3>
        <div class="text-sm text-gray-500">Top 4 priority projects</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="p in topProjects" :key="p.id" class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
        <div class="h-36 overflow-hidden rounded-lg bg-gray-50 mb-3">
          <img :src="p.image || p.project_image_url || 'https://via.placeholder.com/400'" alt="project" class="w-full h-full object-cover" />
        </div>
        <div class="font-semibold text-gray-900 truncate">{{ p.title || p.project_name }}</div>
        <div class="text-sm text-gray-500 mt-1 truncate">{{ p.description }}</div>
        <div class="mt-3 flex items-center justify-between text-sm">
          <div class="text-indigo-600 font-bold">{{ p.votes || 0 }} votes</div>
          <div class="text-gray-600">${{ (p.requested||0).toLocaleString() }}</div>
        </div>
      </div>
    </div>
    </section>
    
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



const totalProjects = computed(() => (props.projects || []).length)

const totalTeams = computed(() => {
  const list = props.team || []
  const uniques = new Set(list.map((m: any) => (m.team || '').toString()).filter(Boolean))
  return uniques.size || 0
})

const teamParticipants = computed(() => (props.team || []).length)

const topProjects = computed(() => {
  const list = (props.projects || []).slice()
  // try to sort by votes, then requested amount
  list.sort((a: any, b: any) => {
    const va = (a.votes || 0)
    const vb = (b.votes || 0)
    if (vb !== va) return vb - va
    const ra = (a.requested || 0)
    const rb = (b.requested || 0)
    return rb - ra
  })
  return list.slice(0, 4)
})


</script>

<style scoped>
/* rely on Tailwind */
</style>

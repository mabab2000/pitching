<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  image: string
  name: string
  description: string
  link: string
  ownerName?: string
  ownerImage?: string
  ownerRole?: string
  ownerLink?: string
  tags?: string[]
  group?: {
    name?: string
    members?: Array<{
      name: string
      image?: string
      role?: string
      contact?: string
    }>
  }
}>()

const showMembers = ref(false)
function openMembers() { showMembers.value = true }
function closeMembers() { showMembers.value = false }

const showImagePreview = ref(false)
const imagePreviewSrc = ref<string | null>(null)
function openImage(src: string | undefined) {
  if (!src) return
  imagePreviewSrc.value = src
  showImagePreview.value = true
}
function closeImage() {
  showImagePreview.value = false
  imagePreviewSrc.value = null
}
</script>

<template>
  <div
    class="w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
    style="font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans';"
  >
    <!-- Project image -->
    <div class="relative h-64 md:h-72 lg:h-80 overflow-hidden">
      <img
        @click="openImage(image)"
        role="button"
        :src="image"
        :alt="name"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </div>

    <!-- Card body -->
    <div class="flex flex-col flex-1 p-6 gap-3">
      <!-- Tags -->
      <div v-if="tags?.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="text-sm font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Project name -->
      <h3 class="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">{{ name }}</h3>

      <!-- Description -->
      <p class="text-gray-500 text-base md:text-lg leading-relaxed flex-1">{{ description }}</p>

      <!-- Owner info -->
      <div v-if="ownerName || ownerImage" class="mt-4 flex items-center gap-3">
        <!-- avatar — stops click from bubbling into any parent <a> -->
        <img
          v-if="ownerImage"
          :src="ownerImage"
          :alt="ownerName"
          @click.stop.prevent="openImage(ownerImage)"
          @keydown.enter.stop.prevent="openImage(ownerImage)"
          role="button"
          tabindex="0"
          class="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0 cursor-pointer hover:ring-4 hover:ring-indigo-300 transition"
        />
        <div class="text-sm">
          <div class="font-semibold text-gray-800 text-base md:text-lg">{{ ownerName }}</div>
          <div class="text-sm text-gray-500">{{ ownerRole }}</div>
        </div>
      </div>

      <!-- Link + Team button -->
      <div class="mt-3 flex items-center justify-between gap-4">
        <a
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-base md:text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group"
        >
          View Project
          <svg
            class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <button
          v-if="group && group.name"
          @click="openMembers"
          class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700"
        >
          Team: {{ group.name }}
          <span class="text-xs text-gray-500">({{ group.members?.length ?? 0 }})</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ===== MEMBERS MODAL — teleported to <body> so it's never clipped ===== -->
  <Teleport to="body">
    <div
      v-if="showMembers"
      class="fixed inset-0 flex items-center justify-center"
      style="z-index: 9000;"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60" @click="closeMembers"></div>
      <!-- Panel -->
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 p-8 overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-800">{{ group?.name }} — Team Members</h3>
          <button
            @click="closeMembers"
            class="text-gray-400 hover:text-gray-700 text-2xl leading-none"
          >✕</button>
        </div>

        <div class="divide-y">
          <div
            v-for="member in group?.members || []"
            :key="member.name"
            class="flex items-center justify-between gap-4 py-4"
          >
            <div class="flex items-center gap-4">
              <img
                v-if="member.image"
                :src="member.image"
                :alt="member.name"
                @click.stop="openImage(member.image)"
                @keydown.enter.stop="openImage(member.image)"
                role="button"
                tabindex="0"
                class="w-20 h-20 rounded-full object-cover cursor-pointer hover:ring-4 hover:ring-indigo-300 transition flex-shrink-0"
              />
              <div>
                <div class="font-semibold text-gray-800 text-base md:text-lg">{{ member.name }}</div>
                <div class="text-sm text-gray-500">{{ member.role }}</div>
              </div>
            </div>

            <div class="text-sm text-gray-600 text-right">
              <div>{{ (member as any).phone ?? '—' }}</div>
              <div class="mt-1">{{ (member as any).email ?? '—' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- ===== IMAGE PREVIEW — teleported to <body>, always on top ===== -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showImagePreview"
        class="fixed inset-0 flex items-center justify-center"
        style="z-index: 9999;"
        @keydown.esc="closeImage"
        tabindex="-1"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/90" @click="closeImage"></div>
        <!-- Full-viewport image -->
        <img
          :src="imagePreviewSrc ?? undefined"
          alt="Preview"
          class="relative w-screen h-screen object-contain"
        />
        <!-- Close button -->
        <button
          @click.stop="closeImage"
          class="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold transition"
        >✕</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

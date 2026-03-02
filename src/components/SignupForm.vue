<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="absolute inset-0" @click="$emit('close')"></div>
    <div class="bg-white rounded-2xl p-8 w-full max-w-2xl md:max-w-xl z-10 shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-gray-900">Create Account</h3>
        <p class="text-sm text-gray-600 mt-1">Join us to start your pitching journey</p>
      </div>
      
      <form @submit.prevent="onSubmit" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <input v-model="fullName" class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Enter your full name" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <input v-model="email" type="email" class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="you@example.com" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <input v-model="password" type="password" class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Create a strong password" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <input v-model="confirmPassword" type="password" class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Confirm your password" />
            </div>
          </div>
        </div>

        <!-- Role selector -->
        <div>
          <div class="text-sm font-semibold text-gray-700 mb-2">Role</div>
          <div class="flex gap-3">
            <label class="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer">
              <input type="radio" class="form-radio" value="individual" v-model="role" />
              <span class="text-sm">Individual</span>
            </label>
            <label class="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer">
              <input type="radio" class="form-radio" value="team_leader" v-model="role" />
              <span class="text-sm">Team Leader</span>
            </label>
            <label class="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer">
              <input type="radio" class="form-radio" value="team_member" v-model="role" />
              <span class="text-sm">Team Member</span>
            </label>
          </div>
        </div>

        <div v-if="role === 'team_member'">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Select Team Leader</label>
          <select v-model="leaderId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" :disabled="props.loadingLeaders">
            <option value="" disabled>{{ props.loadingLeaders ? 'Loading leaders...' : 'Select a team leader' }}</option>
            <option v-for="l in props.leaders || []" :key="l.id" :value="l.id">{{ l.name }}</option>
          </select>
          <p v-if="!props.loadingLeaders && props.leaders?.length === 0" class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mt-2">No team leaders available. Please contact administrator.</p>
          <p v-else-if="props.loadingLeaders" class="text-sm text-indigo-600 mt-2 flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading team leaders...
          </p>
        </div>

        <p v-if="error" class="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{{ error }}</p>

        <div class="flex gap-3 mt-6">
          <button type="button" @click="$emit('close')" :disabled="props.submitting" class="flex-1 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
          <button type="submit" :disabled="!canSubmit || props.submitting" class="flex-1 px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <svg v-if="props.submitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ props.submitting ? 'Creating Account...' : 'Sign Up' }}</span>
          </button>
        </div>
      </form>
      
      <div class="mt-6 text-center text-sm text-gray-600">
        Already have an account? <a href="/" class="text-indigo-600 hover:text-indigo-700 font-semibold">Sign in</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ leaders?: { id: string | number; name: string }[]; loadingLeaders?: boolean; submitting?: boolean }>()
const emit = defineEmits(['close', 'submit'])

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const role = ref<'individual' | 'team_leader' | 'team_member'>('individual')
const leaderId = ref<string>('')

const emailValid = computed(() => /\S+@\S+\.\S+/.test(email.value))
const passwordsMatch = computed(() => password.value === confirmPassword.value && password.value.length > 0)
const canSubmit = computed(() => {
  if (fullName.value.trim() === '') return false
  if (!emailValid.value) return false
  if (!passwordsMatch.value) return false
  if (role.value === 'team_member' && (!leaderId.value || leaderId.value === '')) return false
  return true
})

function onSubmit() {
  error.value = ''
  if (!emailValid.value) {
    error.value = 'Please enter a valid email.'
    return
  }
  if (!passwordsMatch.value) {
    error.value = 'Passwords do not match.'
    return
  }
  if (role.value === 'team_member' && (!leaderId.value || leaderId.value === '')) {
    error.value = 'Please select a team leader.'
    return
  }

  const payload: any = {
    full_name: fullName.value.trim(),
    email: email.value.trim(),
    password: password.value,
    role: role.value,
  }
  if (role.value === 'team_member') payload.team_leader_id = leaderId.value

  emit('submit', payload)
}
</script>

<style scoped>
/* styling handled via Tailwind */
</style>

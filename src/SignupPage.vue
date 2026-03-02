<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div class="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    
    <SignupForm :leaders="leaders" :loading-leaders="loadingLeaders" :submitting="submitting" @submit="onSubmit" />
    
    <Toast 
      :show="toast.show" 
      :title="toast.title" 
      :message="toast.message" 
      :type="toast.type" 
      :duration="4000"
      @close="toast.show = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import SignupForm from './components/SignupForm.vue'
import Toast from './components/Toast.vue'

const leaders = ref<Array<{ id: string; name: string }>>([])
const loadingLeaders = ref(true)
const submitting = ref(false)

const toast = reactive({
  show: false,
  title: '',
  message: '',
  type: 'success' as 'success' | 'error'
})

onMounted(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('Fetching leaders from API...')
    const res = await fetch('https://pitching-backend.onrender.com/leaders', { headers: { accept: 'application/json' } })
    if (res.ok) {
      const data = await res.json()
      // eslint-disable-next-line no-console
      console.log('Leaders fetched:', data)
      // map to { id, name }
      leaders.value = (data || []).map((l: any) => ({ id: l.id, name: l.full_name || l.name }))
    } else {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch leaders:', res.status)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching leaders:', err)
  } finally {
    loadingLeaders.value = false
  }
})

async function onSubmit(payload: { full_name: string; email: string; password: string; role?: string; team_leader_id?: string }) {
  if (submitting.value) return
  
  submitting.value = true
  try {
    // Map our role values to API role values
    let apiRole = 'individual'
    if (payload.role === 'team_leader') apiRole = 'leader'
    else if (payload.role === 'team_member') apiRole = 'member'
    else if (payload.role === 'individual') apiRole = 'individual'

    // Build API payload
    const apiPayload: any = {
      full_name: payload.full_name,
      email: payload.email,
      password: payload.password,
      role: apiRole,
      status: 'pending'
    }

    // Add leader_id only if team member
    if (payload.role === 'team_member' && payload.team_leader_id) {
      apiPayload.leader_id = payload.team_leader_id
    }

    // eslint-disable-next-line no-console
    console.log('Submitting signup to API:', apiPayload)

    const res = await fetch('https://pitching-backend.onrender.com/users', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiPayload)
    })

    if (res.ok) {
      const data = await res.json()
      // eslint-disable-next-line no-console
      console.log('Signup successful:', data)
      
      // Show success toast
      toast.show = true
      toast.title = 'Account created successfully!'
      toast.message = 'Please log in.'
      toast.type = 'success'
      
      // Redirect after a delay to show the toast
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } else {
      const errorData = await res.json().catch(() => ({ message: 'Signup failed' }))
      // eslint-disable-next-line no-console
      console.error('Signup failed:', res.status, errorData)
      
      // Show error toast
      toast.show = true
      toast.title = 'Signup failed'
      toast.message = errorData.message || errorData.detail || 'Please try again.'
      toast.type = 'error'
      submitting.value = false
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error during signup:', err)
    
    // Show error toast
    toast.show = true
    toast.title = 'Network error'
    toast.message = 'Please check your connection and try again.'
    toast.type = 'error'
    submitting.value = false
  }
}
</script>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Simple pathname-based mount: support /signup and /dashboard pages without vue-router
const path = window.location.pathname

// Determine which dashboard to load based on user role
function getDashboardForUser() {
	try {
		const userStr = localStorage.getItem('user')
		if (userStr) {
			const user = JSON.parse(userStr)
			const role = (user.role || '').toLowerCase()
			
			if (role === 'admin') {
				return import('./AdminDashboard.vue')
			} else if (role === 'leader') {
				return import('./LeaderDashboard.vue')
			} else if (role === 'individual') {
				return import('./IndividualDashboard.vue')
			} else {
				// Default to member dashboard
				return import('./MemberDashboard.vue')
			}
		}
	} catch (e) {
		console.error('Error parsing user data:', e)
	}
	// Fallback to member dashboard if no user found
	return import('./MemberDashboard.vue')
}

if (path === '/signup') {
	import('./SignupPage.vue').then(({ default: SignupPage }) => {
		createApp(SignupPage).mount('#app')
	})
} else if (
	path === '/dashboard' ||
	path === '/dashboard/overview' ||
	path === '/dashboard/project' ||
	path === '/dashboard/team' ||
	path === '/dashboard/users'
) {
	getDashboardForUser().then((module) => {
		createApp(module.default).mount('#app')
	})
} else {
	createApp(App).mount('#app')
}


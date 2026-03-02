import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Simple pathname-based mount: support /signup and /dashboard pages without vue-router
const path = window.location.pathname
if (path === '/signup') {
	import('./SignupPage.vue').then(({ default: SignupPage }) => {
		createApp(SignupPage).mount('#app')
	})
} else if (
	path === '/dashboard' ||
	path === '/dashboard/overview' ||
	path === '/dashboard/project' ||
	path === '/dashboard/team'
) {
	import('./Dashboard.vue').then(({ default: Dashboard }) => {
		createApp(Dashboard).mount('#app')
	})
} else {
	createApp(App).mount('#app')
}

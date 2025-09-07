import { LoadDatabase } from "$lib/wailsjs/go/main/App"

export const prerender = true
export const ssr = false

export async function load() {
	return {
		database: await LoadDatabase()
	}
}

<script lang="ts">
	import { setDatabaseState } from "$lib/db.svelte"
	import "../app.css"
	let { children } = $props()

	const _ = setDatabaseState()
</script>

{@render children?.()}

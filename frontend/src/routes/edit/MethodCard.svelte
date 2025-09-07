<script lang="ts">
	import { crossfade } from "svelte/transition"
	import { SquarePen } from "@lucide/svelte"

	let props = $props()

	const method = $state(props.method)

	const [send, receive] = crossfade({ duration: 200 })

	const toggleMethodActive = async () => {
		console.log("toggle method active")
	}
</script>

<div
	class="flex w-full flex-col rounded border p-4 shadow {method.active
		? 'border-stone-900 text-stone-900'
		: 'border-stone-300 text-stone-500'}"
	in:receive={{ key: method.slug }}
	out:send={{ key: method.slug }}
>
	<h3 class="text-xl">{method.name}</h3>
	<div>{method.description}</div>

	<hr class="pt-4" />

	<div class="flex gap-2 text-sm">
		<button
			class:w-full={!method.active}
			class="rounded border border-dotted border-stone-400 px-2 py-1 text-stone-400"
			onclick={toggleMethodActive}
		>
			{method.active ? "Inactivate" : "Activate"}
		</button>

		{#if method.active}
			<a
				href="/edit/methods/{method.slug}"
				class="flex flex-grow items-center justify-center gap-2 rounded border border-stone-500 bg-stone-50 py-1 text-center no-underline hover:bg-stone-200"
				><SquarePen class="h-4 w-4" />
				Edit</a
			>
		{/if}
	</div>
</div>

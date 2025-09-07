<script lang="ts">
	import Menu from "./Menu.svelte"

	import AddMethodForm from "./AddMethodForm.svelte"
	import MethodCard from "./MethodCard.svelte"
	import { flip } from "svelte/animate"
	import { quintOut } from "svelte/easing"
	import { crossfade } from "svelte/transition"

	import { ListPlus } from "@lucide/svelte"
	import { getDatabaseState } from "$lib/db.svelte"

	const database = getDatabaseState().data

	const [send, receive] = crossfade({
		duration: 250,
		easing: quintOut
	})

	let showAddMethodForm = $state(false)

	function toggleAddMethodForm() {
		showAddMethodForm = !showAddMethodForm
	}
</script>

<div class="flex w-full gap-12 px-4" data-sveltekit-preload-data="off">
	<Menu />
	<div class="w-full">
		<div class="my-2 flex max-w-screen-lg items-end justify-between">
			<h1>Select method to edit</h1>
		</div>

		<div class="grid max-w-screen-lg grid-cols-3 gap-4">
			{#each (database?.methods ?? []).filter((method) => method.active) as method (method.slug)}
				<div
					animate:flip={{ duration: 250 }}
					in:send={{ key: method.slug }}
					out:receive={{ key: method.slug }}
				>
					<MethodCard {method} />
				</div>
			{/each}
			{#each (database?.methods ?? []).filter((method) => !method.active) as method (method.slug)}
				<div
					animate:flip={{ duration: 250 }}
					in:send={{ key: method.slug }}
					out:receive={{ key: method.slug }}
				>
					<MethodCard {method} />
				</div>
			{/each}

			<button
				onclick={() => (showAddMethodForm = !showAddMethodForm)}
				class="flex w-full items-center justify-center gap-2 rounded border border-gray-500 p-4 font-bold shadow-lg"
			>
				<ListPlus class="h-8 w-8 stroke-[1.5]" />
				Add Method
			</button>
		</div>

		{#if showAddMethodForm}
			<AddMethodForm {toggleAddMethodForm} />
		{/if}
	</div>
</div>

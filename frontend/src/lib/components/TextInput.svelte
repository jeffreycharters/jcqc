<script lang="ts">
	export let value: string = ""
	export let label: string
	export let name: string
	export let placeholder = ""
</script>

<div class="my-2 flex flex-col text-sm">
	<label for={name}>{label}</label>
	<input type="text" class="text-input" bind:value {placeholder} />
</div>

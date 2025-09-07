<script lang="ts">
	import { page } from "$app/state"

	import { CircuitBoard, BatteryMedium, TestTubeDiagonal, Atom, Heart } from "@lucide/svelte"

	const menuLinks = [
		{ text: "JCQC Main", href: "/", icon: Heart, class: "stroke-red-600" },
		{ text: "Edit Elements", href: "/edit/elements", icon: Atom, class: "stroke-lime-600" },
		{ text: "Edit Methods", href: "/edit", icon: CircuitBoard, class: "stroke-yellow-500" },
		{
			text: "Edit Instruments",
			href: "/edit/instruments",
			icon: BatteryMedium,
			class: "stroke-cyan-600"
		},
		{
			text: "Generate Test Files",
			href: "/edit/testfiles",
			icon: TestTubeDiagonal,
			class: "stroke-emerald-600"
		}
	]
</script>

<ul class="relative top-12 flex w-64 flex-col gap-2">
	{#each menuLinks as link}
		<a
			class="basic-border px-2 py-[3px] no-underline"
			class:bg-teal-200={page.url.pathname === link.href}
			href={link.href}
		>
			<li class="flex items-center gap-2">
				<div class="shadow-inner-lg rounded-full bg-white p-[2px]">
					<svelte:component this={link.icon} class="h-6 w-6 {link.class}" stroke="1.25" />
				</div>
				{link.text}
			</li>
		</a>
	{/each}
</ul>

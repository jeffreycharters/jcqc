<script lang="ts">
	import { NumberInput, TextInput } from "$lib/components/"
	import slugify from "slugify"
	import { slide } from "svelte/transition"
	import { z } from "zod"
	import { SquareX } from "@lucide/svelte"
	import { page } from "$app/state"
	import type { db } from "$lib/wailsjs/go/models"
	import type { ComponentProps } from "svelte"

	const database: db.Database = page.data.database

	interface Props {
		toggleAddMethodForm: () => void
		showAddMethodForm: boolean
	}

	let { toggleAddMethodForm, showAddMethodForm = $bindable() }: Props = $props()

	const schema = z.object({
		name: z.string({ error: "Name is required" }).min(5, "Name must be at least 5 characters"),
		description: z
			.string({ error: "Description is required" })
			.min(5, "Description must be at least 5 characters"),
		checkStandardTolerance: z.coerce
			.number({
				error: "Check STD tolerance is required"
			})
			.min(1, "Check STD tolerance must be greater than 0")
			.max(100, "Check STD tolerance must be less than 100"),
		rpdLimit: z.coerce
			.number({
				error: "RPD limit is required"
			})
			.min(1, "RPD limit must be > 0")
			.max(100, "RPD limit must be < 100"),
		calibrationCount: z.coerce
			.number({
				error: "Calibration STD count is required"
			})
			.min(1, "Calibration STD count must be greater than 0")
			.max(100, "Calibration STD count must be less than 100"),
		reportSigFigs: z.coerce
			.number({
				error: "Report Sig Figs is required"
			})
			.min(1, "Report Sig Figs must be greater than 0")
			.max(5, "Report Sig Figs must 5 or less")
	})

	let formError = $state("")
	let name: string = $state("")
	let rpdLimit: number = $state(15)
	let calibrationCount: number = $state(5)
	let description: string = $state("")
	let checkStandardTolerance: number = $state(15)
	let reportSigFigs: number = $state(2)

	const methods = $state(database.Methods ?? [])

	const addMethod = async (e: Event) => {
		e.preventDefault()

		const fd = schema.safeParse({
			name,
			rpdLimit,
			calibrationCount,
			description,
			checkStandardTolerance,
			reportSigFigs
		})

		if (!fd.success) return (formError = fd.error.issues[0].message)

		formError = ""

		const newMethod = {
			...fd.data,
			slug: slugify(name, { lower: true }),
			active: true
		}

		console.log("adding new method to db", newMethod)
	}
</script>

{#if showAddMethodForm}
	<div
		class="my-4 mb-8 w-fit rounded border border-gray-900 bg-white p-4 shadow"
		transition:slide={{ duration: 200 }}
	>
		<div class="flex items-center justify-between">
			<h2>Add new</h2>
			<button onclick={toggleAddMethodForm}>
				<SquareX class="h-6 w-6 stroke-stone-500" />
			</button>
		</div>
		<form onsubmit={addMethod}>
			<TextInput name="name" label="Method Name" placeholder="e.g. TOXI-064" bind:value={name} />
			<TextInput
				name="name"
				label="Method Description"
				placeholder="e.g. Metals in sewage"
				bind:value={description}
			/>
			<div class="flex max-w-md items-end justify-between gap-8">
				<NumberInput
					name="check-standard-limit"
					label="Check Standard Tolerance (%)"
					bind:value={checkStandardTolerance}
					placeholder="e.g. 15"
				/>
				<NumberInput
					name="rpd-limit"
					label="Duplicate RPD limit (%)"
					bind:value={rpdLimit}
					placeholder="e.g. 20"
				/>
			</div>

			<div class="flex max-w-md items-end justify-between gap-8">
				<NumberInput
					name="cal-count"
					label="Non-blank calibration standards"
					placeholder="e.g. 6"
					bind:value={calibrationCount}
				/>
				<NumberInput
					name="sigfigs"
					label="Report sig figs"
					placeholder="e.g. 2"
					bind:value={reportSigFigs}
				/>
			</div>

			<div class="mb-1 w-full">
				<button type="submit" class="btn w-full">Add Method</button>
			</div>
			<div class="w-fit">
				{#if formError}
					<div transition:slide={{ duration: 200 }} class="ml-2 text-sm italic text-red-600">
						{formError}
					</div>
				{/if}
			</div>
		</form>
	</div>
{/if}

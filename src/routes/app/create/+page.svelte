<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	$effect(() => {
		if (form?.success) {
			goto('/app/success');
		}
		return () => {
			console.log('unmount');
		};
	});
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col sm:w-[350px]">
		<h1 class="mb-6 text-2xl font-bold">Create application request</h1>

		<form method="POST" action="?/createJobApplication" use:enhance class="max-w-md space-y-4">
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input type="email" id="email" name="email" required />
			</div>

			<div class="space-y-2">
				<Label for="firstName">First Name</Label>
				<Input type="text" id="firstName" name="firstName" required />
			</div>

			<div class="space-y-2">
				<Label for="lastName">Last Name</Label>
				<Input type="text" id="lastName" name="lastName" required />
			</div>

			<button type="submit" class="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90">
				Submit
			</button>
		</form>
	</div>
</div>

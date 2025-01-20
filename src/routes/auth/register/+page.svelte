<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import AuthNav from '../(components)/auth-nav.svelte';
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';

	let { form }: { form: ActionData } = $props();

	$effect(() => {
		if (form?.success) {
			goto('/auth/login');
		}
		return () => {
			console.log('unmount');
		};
	});
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Create Account</h1>
			<p class="text-sm text-muted-foreground">Enter your information to create an account</p>
		</div>

		<div class="grid gap-6">
			<form method="POST" use:enhance class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						name="email"
						value={form?.email ?? ''}
						placeholder="name@example.com"
						type="email"
						autocomplete="email"
						required
					/>
					{#if form?.errors?.email}
						<p class="text-sm text-red-500">{form.errors.email}</p>
					{/if}
				</div>

				<div class="grid gap-2">
					<Label for="password1">Password</Label>
					<Input
						id="password1"
						name="password1"
						type="password"
						autocomplete="new-password"
						required
					/>
					{#if form?.errors?.password1}
						<p class="text-sm text-red-500">{form.errors.password1}</p>
					{/if}
				</div>

				<div class="grid gap-2">
					<Label for="password2">Confirm Password</Label>
					<Input
						id="password2"
						name="password2"
						type="password"
						autocomplete="new-password"
						required
					/>
					{#if form?.errors?.password2}
						<p class="text-sm text-red-500">{form.errors.password2}</p>
					{/if}
				</div>

				{#if form?.error && !form?.errors}
					<p class="mt-2 text-sm text-red-500">{form.error}</p>
				{/if}

				<Button type="submit">Create Account</Button>
			</form>
		</div>


		<p>After register you need to to on login page</p>
		<AuthNav />
	</div>
</div>

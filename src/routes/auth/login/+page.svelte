<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import AuthNav from '../(components)/auth-nav.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Login</h1>
			<p class="text-sm text-muted-foreground">Enter your credentials to login</p>
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
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
					/>
					{#if form?.errors?.password}
						<p class="text-sm text-red-500">{form.errors.password}</p>
					{/if}
				</div>

				{#if form?.error && !form?.errors}
					<p class="mt-2 text-sm text-red-500">{form.error}</p>
				{/if}

				<Button type="submit">Sign In</Button>
			</form>
		</div>

		<AuthNav />
	</div>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import AuthNav from './(components)/auth-nav.svelte';
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 text-center sm:w-[350px]">
		<h1 class="text-2xl font-semibold tracking-tight">Authentication Error</h1>
		<p class="text-muted-foreground">
			{$page.error?.message || 'An error occurred during authentication'}
		</p>
		<AuthNav />
	</div>
</div>

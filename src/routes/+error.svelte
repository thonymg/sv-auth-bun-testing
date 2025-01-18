<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 text-center sm:w-[350px]">
		<h1 class="text-4xl font-bold tracking-tight">
			{$page.status}: {$page.error?.message || 'Something went wrong'}
		</h1>
		<p class="text-muted-foreground">
			{#if $page.status === 404}
				The page you're looking for doesn't exist.
			{:else if $page.status === 403}
				You don't have permission to access this page.
			{:else}
				An unexpected error occurred. Please try again later.
			{/if}
		</p>
		<div class="flex justify-center gap-2">
			<Button variant="outline" on:click={() => history.back()}>Go Back</Button>
			<a href="/" use:Button>Home</a>
		</div>
	</div>
</div>

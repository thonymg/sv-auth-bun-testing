<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { redirect } from '@sveltejs/kit';

	export let data;
	const { token } = data;
</script>

<div class="flex h-screen w-full items-center justify-center bg-background">
	<div class="flex flex-col items-center gap-4">
		{#if token}
			<p>Your are logged in, you can create an application</p>
			<Button variant="default" size="lg" onclick={() => goto('/app/create')}>
				Create Application
			</Button>
		{:else}
			<p>You are not logged in, you can login or register</p>
			<Button variant="default" size="lg" onclick={() => goto('/auth/login')}>Login</Button>

			<Button variant="outline" size="lg" onclick={() => goto('/auth/register')}>Register</Button>
		{/if}
	</div>
</div>

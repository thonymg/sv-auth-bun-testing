<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="flex justify-center space-x-2 text-sm">
	{#if $page.url.pathname !== '/auth/login'}
		<a
			href="/auth/login"
			class="text-muted-foreground underline underline-offset-4 hover:text-primary"
		>
			Sign In
		</a>
	{:else}
		<a
			href="/auth/register"
			class="text-muted-foreground underline underline-offset-4 hover:text-primary"
		>
			Create Account
		</a>
	{/if}
</nav>

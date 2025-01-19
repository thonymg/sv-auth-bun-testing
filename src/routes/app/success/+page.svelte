<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
	<h1 class="mb-6 text-2xl font-bold">Success</h1>

	<pre>{JSON.stringify(data.userData, null, 2)}</pre>
</div>

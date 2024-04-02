<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let activeLink = '';
	let isMenuOpen = false;

	function setActive(link: string) {
		activeLink = link;
		if (typeof window !== 'undefined') {
			window.location.hash = link;
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			activeLink = window.location.hash.replace('#', '') || '';

			const onHashChange = () => {
				activeLink = window.location.hash.replace('#', '') || '';
			};

			window.addEventListener('hashchange', onHashChange);

			return () => {
				window.removeEventListener('hashchange', onHashChange);
			};
		}
	});
</script>

<header>
	<div class="header">
		<a class="logo" href="#home"><h1>toni.</h1></a>
		{#if !isMenuOpen}
			<button class="menu-toggle" on:click={() => (isMenuOpen = !isMenuOpen)}>☰</button>
		{/if}
		{#if isMenuOpen}
			<button class="menu-toggle" on:click={() => (isMenuOpen = !isMenuOpen)}>✕</button>
		{/if}
		<div class="header-links" class:active={isMenuOpen} in:slide={{ duration: 400 }}>
			<a
				href="#home"
				on:click|preventDefault={() => {
					setActive('home');
					isMenuOpen = false;
				}}
				class:active={activeLink === 'home' || activeLink === ''}>home</a
			>
			<a
				href="#about"
				on:click|preventDefault={() => {
					setActive('about');
					isMenuOpen = false;
				}}
				class:active={activeLink === 'about'}>about</a
			>
			<a
				href="#projects"
				on:click|preventDefault={() => {
					setActive('projects');
					isMenuOpen = false;
				}}
				class:active={activeLink === 'projects'}>projects</a
			>
			<a
				href="#contacts"
				on:click|preventDefault={() => {
					setActive('contacts');
					isMenuOpen = false;
				}}
				class:active={activeLink === 'contacts'}>contact</a
			>
			<a
				href="#chat"
				on:click|preventDefault={() => {
					setActive('chat');
					isMenuOpen = false;
				}}
				class:active={activeLink === 'chat'}>chat</a
			>
		</div>
	</div>
</header>

<style>
	.header {
		padding: 2rem;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		z-index: 1;
	}

	.logo {
		text-decoration: none;
		color: white;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		position: absolute;
		right: 20px;
		top: 20px;
		z-index: 2;
		transition: opacity 0.4s ease;
	}

	.header-links {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		background-color: #f5f5f5;
		padding: 0 2rem;
		border-radius: 3rem;
		transition:
			transform 0.4s ease,
			opacity 0.4s ease;
		will-change: transform, opacity;
	}
	.header-links.active {
		transform: translateY(0);
		opacity: 1;
	}
	.header-links a {
		text-decoration: none;
		color: black;
		position: relative;
		padding: 10px 20px;
		border-radius: 40px;
		transition: background-color 0.3s;
	}

	.header-links a::after {
		content: '';
		position: absolute;
		height: 5px;
		width: 5px;
		background-color: red;
		border-radius: 50%;
		right: -10px;
		top: 50%;
		transform: translateY(-50%);
		visibility: hidden;
	}

	.header-links a:hover {
		background-color: #aaa;
		visibility: visible;
	}

	.header-links a:hover::after {
		visibility: visible;
	}

	.header-links a.active {
		background-color: #aaa;
	}

	.header-links a.active::after {
		visibility: visible;
	}

	/* Adjustments for mobile */
	@media (max-width: 768px) {
		.header {
			flex-direction: column;
			padding: 0.5rem;
		}

		.menu-toggle {
			display: block;
		}

		.header-links {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			flex-direction: column;
			justify-content: center;
			background-color: rgba(0, 0, 0, 0.99);
			padding: 0;
			gap: 1rem;
			z-index: 1;
			border-radius: 0;
			display: flex;
			transform: translateY(-100%);
			opacity: 0;
		}

		.header-links.active {
			transform: translateY(0);
			opacity: 1;
		}
		.header-links a {
			color: white;
			font-size: 1.5rem;
		}
	}
</style>

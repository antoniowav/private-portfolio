<script lang="ts">
	import { onMount } from 'svelte';
	import ChatWidget from './ChatWidget.svelte';
	import RollingList from './RollingList.svelte';
	import { slide } from 'svelte/transition';
	import Contact from './Contact.svelte';
	import Projects from './Projects.svelte';

	let currentSection = '';
	let showRollingList = false;

	let text =
		"Hello! I'm Toni, a web developer from Florence now in Gothenburg, Sweden. My journey has taken me from the beauty of Italy to the tech world of Sweden, where I've honed my skills in Next.js, TypeScript, and front-end development. Outside of coding, I have a passion for photography, music, and Formula 1. I'm always on the lookout for new challenges and opportunities to grow in the field of web/app development.";
	let displayText = '';
	let index = 0;
	const speed = 35;

	function typeWriter() {
		if (index < text.length) {
			displayText += text.charAt(index);
			index++;
			setTimeout(typeWriter, speed);
		} else {
			showRollingList = true;
		}
	}

	function updateSectionFromHash() {
		let hash = window.location.hash.replace('#', '');
		currentSection = hash === '' ? '' : hash;
	}

	onMount(() => {
		typeWriter();
		window.addEventListener('hashchange', updateSectionFromHash);
		updateSectionFromHash();

		if (window.location.hash) {
			history.pushState('', document.title, window.location.pathname + window.location.search);
		}
	});
</script>

<main class="main">
	<div class="sections-container">
		<section id="home" class="section">
			<h1>
				hi, i'm toni. <span class="wave">👋</span><br /><br />
				i make websites, api integrations, <br /> and love to explore new technologies.<br /><br />
				i'm currently learning
				<a class="link" target="_blank" href="https://svelte.dev/">svelte</a>.<br />
				but i also have experimented with some ai integration <br /> for my portfolio site.<br /><br
				/>
				try it by clicking <a class="link" href="#chat">here</a>.<br />
			</h1>
			<img class="picture" src="../src/icons/portfolio-picture.jpg" alt="toni." />
		</section>
		<section id="about" class="section">
			<div class="typewriter">
				{displayText}
				{#if showRollingList}
					<hr class="separator" in:slide={{ duration: 300 }} />
					<div in:slide={{ duration: 300 }}>
						<RollingList />
					</div>
				{/if}
			</div>
		</section>
		<section id="projects" class="section">
			<Projects />
		</section>
		<section id="contacts" class="section">
			<Contact />
			<a class="email-me" href="mailto:hello@antoniopiattelli.com"><h1>just email me.</h1></a>
		</section>
		<section id="chat" class="section">
			<ChatWidget />
		</section>
	</div>
</main>

<style>
	.main {
		overflow-x: hidden;
		display: flex;
		align-items: center;
		justify-content: start;
		scroll-behavior: smooth;
		position: relative;
		margin: auto;
		height: 70vh;
	}
	.sections-container {
		display: flex;
		min-width: 400%;
		transition: transform 0.5s ease-out;
		height: 100%;
		gap: 3rem;
	}
	.section {
		width: 25%;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		overflow: hidden;
	}
	#contacts {
		flex-direction: column;
		gap: 0;

		& h1 {
			margin-top: 0;
		}
	}

	.separator {
		margin: 2rem 0;
		border: 1px solid #ccc;
	}
	.section h1 {
		font-size: 3rem;
		line-height: 3rem;
	}
	.picture {
		width: 600px;
		height: 600px;
		border-radius: 50%;
		object-fit: cover;
		object-position: center;
	}
	.typewriter {
		font-family: monospace;
		white-space: pre-wrap;
		word-wrap: break-word;
		width: 100%;
	}
	.email-me {
		position: relative;
		text-decoration: none;
		color: white;
		overflow: hidden;
		display: inline-block;
		transition: all 0.3s ease;
		text-align: start;
	}

	.email-me::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: rgb(208, 173, 240);
		transform: translateX(-100%);
		transition: transform 0.3s ease;
	}

	.email-me:hover::after {
		transform: translateX(0%);
	}

	.email-me:hover {
		color: rgb(208, 173, 240);
		cursor: pointer;
	}
	@media (max-width: 1280px) {
		.section {
			flex-direction: column-reverse;
		}
		.section br {
			display: none;
		}

		.section h1 {
			font-size: 20px;
		}

		#contacts h1 {
			font-size: 40px;
		}
		.picture {
			width: 200px;
			height: 200px;
		}
		.email-me {
			left: -3rem;
		}
	}
</style>

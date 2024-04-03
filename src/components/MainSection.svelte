<script lang="ts">
	import { onMount } from 'svelte';
	import ChatWidget from './ChatWidget.svelte';
	import RollingList from './RollingList.svelte';
	import Contact from './Contact.svelte';
	import Projects from './Projects.svelte';

	let currentSection = '';

	let text =
		"hello! i'm toni, a web developer from florence now in gothenburg, sweden. My journey has taken me from the beauty of Italy to the tech world of Sweden, where I've honed my skills in Next.js, TypeScript, and front-end development. Outside of coding, I have a passion for photography, music, and Formula 1. I'm always on the lookout for new challenges and opportunities to grow in the field of web/app development.";
	let displayText = '';
	let index = 0;
	const speed = 15;

	function typeWriter() {
		if (index < text.length) {
			displayText += text.charAt(index);
			index++;
			setTimeout(typeWriter, speed);
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
			<div class="content">
				<h1>hi, i'm toni. <span class="wave">👋</span></h1>
				<p>
					i make websites, api integrations, <br /> and love to explore new technologies.<br /><br
					/>
					i'm currently learning
					<a class="link" target="_blank" href="https://svelte.dev/">svelte</a>.<br />
					but i also have experimented <br /> with some ai integration <br /> for my portfolio site.<br
					/><br />
					try it by clicking <a class="link" href="#chat">here</a>.<br />
				</p>
			</div>

			<img
				class="picture"
				src="https://res.cloudinary.com/dcps0uryp/image/upload/v1712094497/seb66m4yzat4zfims9hy.jpg"
				alt="toni."
			/>
		</section>
		<section id="about" class="section">
			<div class="typewriter">
				<h1>about me.</h1>
				<p>
					{displayText}
				</p>
			</div>
			<RollingList />
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
		gap: 10rem;
		overflow: hidden;
	}
	.content {
		height: 400px;
	}
	#about {
		flex-direction: column;
	}
	#contacts {
		flex-direction: column;
		gap: 0;

		& h1 {
			margin-top: 0;
		}
	}
	.section h1 {
		font-size: 3rem;
		line-height: 4rem;
		font-weight: 400;
		margin: 0;
	}
	.section p {
		font-size: 1.2rem;
		line-height: 1.5rem;
		font-weight: 400;
	}
	.picture {
		width: 50vw; /* Adjusted for responsiveness */
		height: auto; /* Maintain aspect ratio */
		max-width: 400px; /* Optional: to prevent the image from becoming too large on big screens */
		max-height: 400px;
		filter: grayscale(100%);
		transition: filter 0.5s ease-in-out;
		object-fit: cover;
		border-radius: 0.8rem;
	}
	.picture:hover {
		filter: grayscale(0%);
	}
	.typewriter {
		word-wrap: break-word;
		width: 50%;
		font-size: 1.2rem;
		line-height: 1.5rem;
		font-weight: 400;
		text-transform: lowercase;
	}
	.email-me {
		position: relative;
		text-decoration: none;
		color: #ff94bb;
		overflow: hidden;
		display: inline-block;
		transition: all 0.6s ease;
		text-align: start;
		border-bottom: rgba(255, 255, 255, 0.439) 2px solid;
	}

	.email-me::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: #cc6b8e;
		transform: translateX(-100%);
		transition: transform 0.3s ease;
	}

	.email-me:hover::after {
		transform: translateX(0%);
	}

	.email-me:hover {
		color: #cc6b8e;
		cursor: pointer;
		border-bottom: rgba(255, 255, 255, 0) 2px solid;
	}
	@media (max-width: 1280px) {
		.section {
			flex-direction: column-reverse;
		}
		.section br {
			display: none;
		}

		.section h1 {
			margin-top: 3rem;
		}

		.section a::after {
			display: none;
		}

		#contacts {
			align-items: unset;
		}

		#contacts h1 {
			font-size: 40px;
		}
		#home {
			gap: 0;
		}
		.typewriter {
			width: 100%;
		}
		.picture {
			width: 400px;
			height: 400px;
		}
	}

	@media (max-width: 768px) {
		.section h1 {
			font-size: 2.5rem;
		}
		.section p {
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.section h1 {
			font-size: 2rem;
		}
		.section p {
			font-size: 0.9rem;
		}
		.picture {
			width: 80vw;
			max-width: 300px;
		}
		.content h1 {
			margin-top: 1rem;
		}
		.main {
			height: 66vh;
		}
	}

	@media (max-width: 400px) {
		.content h1 {
			margin-top: 0;
		}
		.section h1 {
			font-size: 1.5rem;
		}
		.section p,
		.typewriter {
			font-size: 0.9rem;
		}
		.picture {
			width: 80vw;
			height: 25vh;
		}
	}
</style>

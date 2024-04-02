<script>
	let projects = [
		{
			name: 'arty',
			description: 'A comprehensive PHP project assignment for school.',
			url: 'https://github.com/antoniowav/arty-final'
		},
		{
			name: 'my portfolio',
			description:
				'A personal portfolio website showcasing Svelte, TypeScript, and OpenAI API integration.',
			url: 'https://github.com/antoniowav/private-portfolio'
		},
		{
			name: 'a newsApp',
			description: 'A JavaScript-based application for browsing news articles using an API.',
			url: 'https://github.com/antoniowav/newsApp'
		},
		{
			name: 'qwerty',
			description: 'Our final project for MedieInstitutet.',
			url: 'https://github.com/antoniowav/qwerty'
		},
		{
			name: 'the cat app',
			description: 'A TypeScript project focusing on API integration to display cat images.',
			url: 'https://github.com/antoniowav/the-cat-app'
		},
		{
			name: 'axel arigato',
			description: 'The development and maintenance of their e-commerce platform.',
			url: 'https://github.com/axelarigato'
		}
	];
</script>

<article class="projects">
	<h1>stuff i have made.</h1>

	{#each projects as project}
		<li class="project">
			<a class="link" href={project.url} target="_blank">{project.name} - {project.description}</a>
		</li>
	{/each}
</article>

<style>
	.projects h1 {
		font-size: 3rem;
		line-height: 4rem;
		font-weight: 400;
		margin: 0;
	}
	.project {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		font-size: 1.2rem;
		line-height: 1.5rem;
		font-weight: 400;
		text-transform: lowercase;
	}

	@media (max-width: 768px) {
		.projects h1 {
			font-size: 2rem;
		}
		.project {
			font-size: 1rem;
		}
	}

	@media (max-width: 400) {
		.project {
			margin: 0;
		}
	}
</style>

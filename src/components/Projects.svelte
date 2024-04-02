<script>
	let projects = [
		{
			name: 'Arty',
			description: 'A comprehensive PHP project demonstrating advanced backend capabilities.',
			url: 'https://github.com/antoniowav/arty-final'
		},
		{
			name: 'New Portfolio',
			description: 'A personal portfolio website showcasing CSS design skills.',
			url: 'https://github.com/antoniowav/new-portfolio'
		},
		{
			name: 'NewsApp',
			description: 'A JavaScript-based application for browsing news articles using an API.',
			url: 'https://github.com/antoniowav/newsApp'
		},
		{
			name: 'Qwerty',
			description: 'An exploratory JavaScript project with creative coding examples.',
			url: 'https://github.com/antoniowav/qwerty'
		},
		{
			name: 'The Cat App',
			description: 'A TypeScript project focusing on API integration to display cat images.',
			url: 'https://github.com/antoniowav/the-cat-app'
		}
	];
</script>

<article>
	<h1>stuff i have made.</h1>

	{#each projects as project}
		<li>
			<a href={project.url} target="_blank">{project.name}</a> - {project.description}
		</li>
	{/each}
</article>

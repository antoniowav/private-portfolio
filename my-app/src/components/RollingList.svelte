<div class="rolling-list">
	<div class="item">
		<p>JavaScript</p>
		<p>TypeScript</p>
		<p>Svelte</p>
		<p>React</p>
		<p>Next.js</p>
		<p>Tailwind CSS</p>
		<p>Web Development</p>
		<p>API Integration</p>
		<p>Responsive Design</p>
		<p>Agile Methodologies</p>
	</div>
	<div class="item">
		<p>JavaScript</p>
		<p>TypeScript</p>
		<p>Svelte</p>
		<p>React</p>
		<p>Next.js</p>
		<p>Tailwind CSS</p>
		<p>Web Development</p>
		<p>API Integration</p>
		<p>Responsive Design</p>
		<p>Agile Methodologies</p>
	</div>
	<div class="item">
		<p>JavaScript</p>
		<p>TypeScript</p>
		<p>Svelte</p>
		<p>React</p>
		<p>Next.js</p>
		<p>Tailwind CSS</p>
		<p>Web Development</p>
		<p>API Integration</p>
		<p>Responsive Design</p>
		<p>Agile Methodologies</p>
	</div>
	<div class="item">
		<p>JavaScript</p>
		<p>TypeScript</p>
		<p>Svelte</p>
		<p>React</p>
		<p>Next.js</p>
		<p>Tailwind CSS</p>
		<p>Web Development</p>
		<p>API Integration</p>
		<p>Responsive Design</p>
		<p>Agile Methodologies</p>
	</div>
	<div class="item">
		<p>JavaScript</p>
		<p>TypeScript</p>
		<p>Svelte</p>
		<p>React</p>
		<p>Next.js</p>
		<p>Tailwind CSS</p>
		<p>Web Development</p>
		<p>API Integration</p>
		<p>Responsive Design</p>
		<p>Agile Methodologies</p>
	</div>
	<div class="item">
		<p>JavaScript</p>
		<p>TypeScript</p>
		<p>Svelte</p>
		<p>React</p>
		<p>Next.js</p>
		<p>Tailwind CSS</p>
		<p>Web Development</p>
		<p>API Integration</p>
		<p>Responsive Design</p>
		<p>Agile Methodologies</p>
	</div>
</div>

<style>
	@keyframes slide {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}

	.rolling-list {
		overflow: hidden;
		white-space: nowrap;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		gap: 1rem;
		margin: 0 -2rem;
	}

	.rolling-list:before,
	.rolling-list:after {
		position: absolute;
		top: 0;
		width: 250px;
		height: 100%;
		content: '';
		z-index: 1;
		opacity: 0.5;
	}

	.rolling-list:before {
		left: 0;
		background: linear-gradient(to left, #24242400, #242424);
	}

	.rolling-list:after {
		right: 0;
		background: linear-gradient(to right, #24242400, #242424);
	}

	.rolling-list:hover .item {
		animation-play-state: paused;
		cursor: pointer;
	}

	.item {
		gap: 1rem;
		display: flex;
		color: white;
		animation: 50s slide infinite linear;
	}
</style>

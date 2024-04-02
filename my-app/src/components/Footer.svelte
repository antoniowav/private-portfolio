<footer>
	<div class="footer">
		<div class="copyright">
			<p>&copy; 2024 Antonio Piattelli</p>
		</div>
		<div class="social">
			<a
				href="https://github.com/antoniowav"
				target="_blank"
				rel="noopener noreferrer"
				class="social-link github"
			>
				Github
			</a>
			<a
				href="https://www.linkedin.com/in/antoniopiattelli"
				target="_blank"
				rel="noopener noreferrer"
				class="social-link linkedin"
			>
				Linkedin
			</a>
		</div>
	</div>
</footer>

<style>
	footer {
		padding: 2rem;
		color: white;
		display: flex;
		align-items: center;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.copyright p {
		font-size: 1.2rem;
		animation: pulse 2s infinite;
	}

	.social {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		text-decoration: none;
		color: white;
		font-size: 1.2rem;
		position: relative;
		transition: color 0.3s ease;
	}

	.social-link::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background: white;
		left: 0;
		bottom: -3px;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.3s ease-out;
	}

	.social-link:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.social-link:hover {
		color: rgb(208, 173, 240);
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
	@media (max-width: 768px) {
		.footer {
			flex-direction: column;
			text-align: center;
			gap: 1rem;
		}
	}
</style>

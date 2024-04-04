<script lang="ts">
	import { onMount, tick } from 'svelte';

	let userInput = '';
	let responseText = '';
	let conversation: { text: string; type: 'sent' | 'reply'; id: number }[] = [];
	let chatArea: HTMLDivElement;
	let smoothScroll = false;
	let isLoading = false;

	const suggestions = [
		'What technologies do you specialize in?',
		'Can you show me your portfolio?',
		'What projects have you worked on?',
		'How can I contact you?',
		'What inspired you to become a web developer?',
		'Do you prefer front-end or back-end development?',
		'What’s your favorite programming language and why?',
		'Can you explain your development process?',
		'What’s the most challenging project you’ve ever worked on?',
		'How do you stay updated with the latest web development trends?',
		'What tools do you use for project management?',
		'How do you approach debugging tough issues?',
		'Can you share a piece of code you are particularly proud of?',
		'What’s your experience with cloud services like AWS or Google Cloud?',
		'Do you contribute to any open-source projects?',
		'What design patterns do you commonly use in your projects?',
		'How do you ensure your websites are accessible and user-friendly?',
		'What strategies do you use for optimizing website performance?',
		'Can you talk about a time you had to work under a tight deadline?'
	];

	function fillInputWithRandomQuestion() {
		const randomIndex = Math.floor(Math.random() * suggestions.length);
		userInput = suggestions[randomIndex];
	}

	function scrollToBottom(smooth = true) {
		if (chatArea) {
			chatArea.style.scrollBehavior = smooth ? 'smooth' : 'auto';
			chatArea.scrollTop = chatArea.scrollHeight;
		}
	}

	onMount(async () => {
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			const stored = localStorage.getItem('conversation');
			if (stored) {
				conversation = JSON.parse(stored);
			}
		}
		scrollToBottom(true);
	});

	async function sendQuery() {
		if (!userInput.trim()) return;
		const currentInput = userInput;
		conversation = [...conversation, { text: currentInput, type: 'sent', id: Date.now() }];
		userInput = '';
		await tick();
		smoothScroll = true;
		setTimeout(async () => {
			await tick();
			scrollToBottom(true);
		}, 10);

		isLoading = true;

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ question: currentInput })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			isLoading = false;

			const data = await response.json();
			responseText = data.response[0].text.value;
			responseText = responseText.replace(
				/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
				'<a href="mailto:$1">$1</a>'
			);
			const pattern: RegExp = /【\d+(:\d+)?†source】/g;
			responseText = responseText.replace(pattern, '');
			conversation = [...conversation, { text: responseText, type: 'reply', id: Date.now() }];
			await tick();
			setTimeout(async () => {
				await tick();
				scrollToBottom(true);
			}, 10);
		} catch (error) {
			isLoading = false;
			console.error('Error fetching:', error);
			responseText = "Sorry, couldn't fetch the response.";
		}
		localStorage.setItem('conversation', JSON.stringify(conversation));
		setTimeout(async () => {
			await tick();
			smoothScroll = false;
		});
	}

	function pressEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			sendQuery();
		}
	}

	$: if (conversation.length > 0) {
		tick().then(() => {
			scrollToBottom(true);
		});
	}
</script>

<section id="chat" class="chat-interface">
	<div class="chat-area" bind:this={chatArea}>
		{#if conversation.length === 0}
			<div class="placeholder">
				Welcome to my personal chatbot. <br /> it is based on the open ai assistant api and trained
				with information about me. <br /> you can ask questions and it will always reply as if it
				was me.
				<br />Ask me anything.
			</div>
		{/if}
		{#each conversation as message (message.id)}
			<div class="message {message.type}">
				{@html message.text}
			</div>
		{/each}
	</div>
	{#if isLoading}
		<div class="loading-dots">
			<div></div>
			<div></div>
			<div></div>
		</div>
	{/if}
	<div class="input-and-suggestions">
		<div class="suggestions">
			<button on:click={fillInputWithRandomQuestion}>Random Question</button>
		</div>
		<div class="input-container">
			<input
				type="text"
				placeholder="Ask me anything..."
				bind:value={userInput}
				on:keydown={pressEnter}
			/>
			<button class="send-button" on:click={sendQuery}>Send</button>
		</div>
	</div>
</section>

<style>
	.chat-interface {
		width: 100%;
		max-width: 600px;
		height: 90%;
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 0.8rem;
		border: 2px solid #25302f68;
		padding: 1rem;

		& a {
			color: inherit;
			text-decoration: underline;
		}
	}

	.chat-area {
		overflow-y: auto;
		flex: 1;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.placeholder {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: lowercase;
		text-align: center;
	}

	.input-and-suggestions {
		padding: 10px;
	}

	.input-container,
	.suggestions {
		width: 100%;
	}

	.input-container {
		display: flex;
		margin-top: 10px;
	}

	.message {
		padding: 10px;
		border-radius: 0.8rem;
		margin: 5px;
		word-break: break-word;
		max-width: 80%;
		align-self: flex-end;
		background-color: white;
		color: black;
	}

	.message.reply {
		align-self: flex-start;
		background-color: rgba(255, 255, 255, 0.7);
	}
	input[type='text'] {
		flex-grow: 1;
		outline: none;
		padding: 1rem;
		border: 2px solid #ccc;
		border-radius: 0.8rem;
		margin-right: 10px;
	}

	input[type='text']:focus {
		border: #ff94bb solid 2px;
	}

	.send-button {
		padding: 10px 15px;
		border-radius: 0.8rem;
		background-color: #ff94bb;
		color: white;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.send-button:hover {
		background-color: #cc6b8e;
	}

	.suggestions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
	}

	.suggestions button {
		padding: 10px 10px;
		width: fit-content;
		border-radius: 0.8rem;
		cursor: pointer;
		background-color: #ff94bb;
		color: white;
		border: none;
		transition: all 0.2s ease-in-out;
	}

	.suggestions button:hover {
		background-color: #cc6b8e;
	}

	.loading-dots {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		height: 40px;
	}

	.loading-dots div {
		width: 8px;
		height: 8px;
		background-color: #ff94bb;
		border-radius: 50%;
		margin: 0 3px;
		animation: bounce 0.6s infinite alternate;
	}

	@keyframes bounce {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-15px);
		}
	}

	.loading-dots div:nth-child(2) {
		animation-delay: 0.2s;
	}

	.loading-dots div:nth-child(3) {
		animation-delay: 0.4s;
	}

	@media (max-width: 768px) {
		.chat-interface {
			width: unset;
			max-width: 340px;
			padding: 0;
		}
	}
</style>

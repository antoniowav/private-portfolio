<script lang="ts">
	let userInput = '';
	let responseText = '';

	const suggestions = [
		'What technologies do you specialize in?',
		'Can you show me your portfolio?',
		'What projects have you worked on?',
		'How can I contact you?'
	];

	function fillInput(suggestion: string) {
		userInput = suggestion;
	}

	async function sendQuery() {
		if (!userInput.trim()) return;
		console.log('Sending query:', userInput);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ question: userInput })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			let parsedData = data;

			// Access the response property
			responseText = parsedData;
			console.log(parsedData);
		} catch (error) {
			console.error('Error fetching:', error);
			responseText = "Sorry, couldn't fetch the response.";
		}

		userInput = '';
	}
</script>

<div class="chat-interface">
	<div class="input-container">
		<input type="text" placeholder="Ask me anything..." bind:value={userInput} />
		<button class="send-button" on:click={sendQuery}>Send</button>
	</div>
	<div class="suggestions">
		{#each suggestions as suggestion}
			<button on:click={() => fillInput(suggestion)}>{suggestion}</button>
		{/each}
	</div>
	<!-- Display the response -->
	<p>{responseText}</p>
</div>

<style>
	.chat-interface {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		margin-top: 50rem;
	}
	.input-container {
		position: relative;
		width: 80%;
	}
	input {
		width: 100%;
		padding: 10px;
		padding-right: 60px;
		font-size: 16px;
		box-sizing: border-box;
	}
	.send-button {
		position: absolute;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
		padding: 5px 15px;
		cursor: pointer;
	}
	.suggestions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
	}
	button {
		padding: 10px 15px;
		font-size: 14px;
	}
</style>

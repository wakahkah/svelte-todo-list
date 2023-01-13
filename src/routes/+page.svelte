<script>
	let todoList = [{ content: 'Workout', editing: false, checked: false }];
	let addInputText = '';

	function addTodo() {
		todoList = [...todoList, { content: addInputText, editing: false, checked: false }];
		addInputText = '';
	}

	/**
	 * @param {number} i
	 * @param {boolean} isEditing
	 */
	function setEditing(i, isEditing) {
		todoList[i].editing = isEditing;
	}

	/**
	 * @param {number} i
	 */
	function deleteTodo(i) {
		todoList.splice(i, 1);
		todoList = todoList; //https://svelte.dev/tutorial/updating-arrays-and-objects
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />
</svelte:head>

<div style="margin: 0 auto; padding: 20px; width: 700px;">
	<h2 style="text-align: center;">TODO List</h2>
	<p>Enter your TODO here (**Don't repeat content**)</p>
	<div style="display: flex; align-items: baseline;">
		<input type="text" bind:value={addInputText} style="flex:1;" />
		<button style="width: 200px; margin-left: 10px;" on:click={addTodo}>Add</button>
	</div>
</div>

{#each todoList as todo, i}
	<div style="display: flex; align-items: baseline; width: 700px; margin: 0 auto; padding: 0 20px;">
		{#if todo.editing}
			<input type="text" bind:value={todo.content} />
		{:else}
			<input type="checkbox" bind:checked={todo.checked} id={todo.content} />
			<label style="flex-grow:1;" for={todo.content}>{todo.content}</label>
		{/if}

		<div style="display: flex; margin-left: 10px; width: 200px;">
			{#if todo.editing}
				<button on:click={() => setEditing(i, false)}>Save</button>
			{:else}
				<button on:click={() => setEditing(i, true)}>Edit</button>
			{/if}
			<button style="margin-left:5px;" on:click={() => deleteTodo(i)}>Delete</button>
		</div>
	</div>
{/each}

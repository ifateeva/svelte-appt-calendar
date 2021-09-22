<script>
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	export let apptID;
	export let dateID;
	export let appointments;
	
	let apptDetails = {
		eventName: (appointments[apptID] && appointments[apptID].eventName) || "",
		eventDetails: (appointments[apptID] && appointments[apptID].eventDetails) || "",
	}

	const submitAppt = () => {
		dispatch('addAppt', apptDetails);
		// Return to empty values
		apptDetails = {
			eventName: "",
			eventDetails: "",
			eventTime: "",
		}
	};

	const handleDelete = () => {
		dispatch("deleteAppt", apptDetails)
	}
</script>


<section>
	<form method="post"
				id={apptID}
				on:submit|preventDefault={submitAppt}>
		
		<div id="closer-cont">
			<span on:click={() => dispatch('schClose')}
						class="close" 
						title="Close Modal">
				&times;
			</span>
		</div>
		<header>
			<h2>Please enter your data</h2>
			<input type="text" 
						 id="name"
						 required
						 placeholder="Enter your name.."
						 bind:value={apptDetails.eventName}>
			<input type="text"
						 id="details"
						 required
						 placeholder="Enter meeting details"
						 bind:value={apptDetails.eventDetails}>
			<div>
				<button class="bookBtn">Book</button>
				{#if appointments[apptID]}
					<button class="deleteButton" on:click|stopPropagation={handleDelete}>Delete</button>
				{/if}
			</div>	
		</header>
	</form>
</section>


<style>
	section { 
		box-sizing: border-box;
		width: 100%;
		height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		background-color: white;
		z-index: 20;
	}

	
	h2 {
		margin: 5px 0;
	}
	
	/* Bordered form */
	form {
		top: 0; left: 0; bottom: 0; right: 0;
		z-index: 10;
		overflow: auto;
		margin: auto;
		background-color: white;
		box-shadow: 0 0 10px black;
		
	}
		
	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
		border: 1px solid #ddd;
		background-color: white;
	}

	
	
	/* Style the close button */
	.close {
		position: absolute;
		font-size: 2rem;
		color: white;
		right: 0;
		top: 0;
		padding: 8px 16px 12px 16px;
		cursor: pointer;
	}

	.close:hover {
		background-color: hsl(168, 76%, 40%);

	}

	/* Style the header */
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--brown);
		padding: 30px 40px;
		color: white;
	/*   text-align: center; */
	}
	
	#time-cont {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 10px;
	}
	
	#hrs-mins-cont {
		width: 200px;
		display: flex;
		justify-content: space-between;
	}
	
	#time-colon {
		font-size: 3rem;
	}
	
	input[type=number] {
		margin-right: 5px;
	}
	
	input[type=number]::-webkit-inner-spin-button {
    opacity: 1
	}
	
	#am-pm-cont > div {
		width: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	input[type="radio"] {
		width: 20px;
	}
	
	/* Style the input */
	input {
		margin: 10px 0;
		border: none;
		border-radius: 0;
		width: 300px;
		padding: 10px;
		float: left;
		font-size: 1.1rem;
	}

	/* Style the "Add" button */
	
	.bookBtn {
		padding: 10px;
		width: 160%;
		background:	var(--green);
		color: #FFF;
		float: left;
		text-align: center;
		font-size: 16px;
		cursor: pointer;
		transition: 0.1s;
		border:	1px solid var(--green);
		border-radius: 0;
	}

	.deleteButton {
		padding: 10px;
		width: 160%;
		background:	var(--green);
		color: #FFF;
		float: left;
		text-align: center;
		font-size: 16px;
		cursor: pointer;
		transition: 0.1s;
		border:	1px solid var(--green);
		border-radius: 0;
	}

	.bookBtn:hover {
		border: 1px solid white;
		background-color: hsl(168, 76%, 35%);
	}	

	.bookBtn:active {
		background-color: hsl(168, 76%, 100%);
		color: hsl(168, 76%, 25%);
	}	

	

	/* Change styles for span and cancel button on extra small screens */
	@media screen and (max-width: 300px) {

	}
</style>
<script>
	import Calendar from "./Calendar.svelte";
	import Appointment from "./Appointment.svelte";
	import { scheduleStore } from './schedule-store';
	//JS Obj with key:array inside, filled with appointments for each date, the Object will come from newAppt obj

	let apptShowing = false;
	let dateID;
	let dateHeading;
	let schedule = {};

	//look inside the schedule object and takes the array for the dateID specified, we parse it to Scheduler
	$: appointments = schedule[dateID] || {};



	const unsubscribe = scheduleStore.subscribe(currDataState => {
		schedule = currDataState;
	})

	const makeDateHeading = () => {
		let dateAsHeading = dateID.replace(/_/g, " ");
		let date = new Date(`${dateAsHeading}`);
		dateHeading = date.toLocaleString("en-US", {day: 'numeric', month: 'long', year: 'numeric'} );
	}

	const handleAppts = (e) => {
		dateID = e.target.dataset.dateid;
		makeDateHeading();
		apptShowing = true;
	}
</script>


<main>
	<Calendar on:click={handleAppts}
			   {schedule} />
	{#if apptShowing}
		<Appointment on:apptClose={() => apptShowing = false}
				   {dateID}
				   {dateHeading}
				   {appointments} />
	{/if}
</main>



<style>
	:root{
		--green: #1abc9c;
		--brown: #dfc27d;
	}
	main {font-family: Verdana, sans-serif;}
</style>
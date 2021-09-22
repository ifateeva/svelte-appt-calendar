<script>
	import { scheduleStore } from './schedule-store';
	import Scheduler from "./Scheduler.svelte";
	import {onDestroy} from "svelte";
	import { createEventDispatcher } from 'svelte';


	const dispatch = createEventDispatcher();
	let schedulerShowing = false;
	let apptID;
	let schedule = {};

	//returns unsubscribed function, updating datastore, take the updated state and assign it to schedule
	const unsubscribe = scheduleStore.subscribe(currDataState => {
		schedule = currDataState;
	});


	//if unsubscribe exists, we call unsubscribe function
	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	})

	export let appointments, dateID, dateHeading;

	const getDateFromDateID = dateID => new Date(dateID.replace(/_/g, " "));

	const date = getDateFromDateID(dateID);
	

//'10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '14:00 - 15:00', '15:00 - 16:00'
	const weekDaysMap = [6, 0, 1, 2, 3, 4, 5];
	const appointmentSlots = [
			['10:00', '11:00', '12:00', '14:00', '15:00'],
			['10:00', '11:00', '12:00', '14:00', '15:00'],
			['10:00', '11:00', '12:00', '14:00', '15:00'],
			['10:00', '11:00', '12:00', '14:00', '15:00'],
			['10:00', '11:00', '12:00', '14:00', '15:00'],
			[],
			[]
	];

	//gets apptDetails(name, details)
	const setApptToSch = (e) => {
		//take details which we get using dispatcher function, and create data object, which is the part of svelte writable store (store data to Obj). this will be part of schedule Obj
		schedulerShowing = false
		let apptDetails = {
						eventName: e.detail.eventName,
						eventDetails: e.detail.eventDetails
		};

		// add newAppt to the schedule along with existing data for other dataIDs
		if (!schedule[dateID]) {
			scheduleStore.update(currDataState => {
				currDataState[dateID] = {};
				currDataState[dateID][apptID] = apptDetails;
				return currDataState;
			});
		} else {
			scheduleStore.update(currDataState => {
				currDataState[dateID][apptID] = apptDetails;
				return currDataState;
			});
		}
	};

	const handleDeleteAppt = (e) => {
		const apptID = e.target.dataset.slot;
		scheduleStore.update(currDataState => {
			delete currDataState[dateID][apptID];
			if (Object.keys(currDataState[dateID]).length === 0)
				delete currDataState[dateID];
			return currDataState;
		});
	};

	const handleSlot = (e) => {
		schedulerShowing = true;
		apptID = e.target.dataset.slot;
	}

	const getApptID = (date, hour) => {
		// date as Date
    	// time as string
    	let timeSplit = hour.match(/(\d+):(\d+)/);
    	let hours = timeSplit[1];
    	let minutes = timeSplit[2];
    	let apptDate = new Date(+date + (hours * 60 + minutes) * 60 * 1000);
    	return apptDate.toISOString()
	}
</script>

<div class=termine>
	<header style="height: 3em;">
		<div id="closer-cont">
				<span on:click={() => dispatch('apptClose')}
							class="close"
							title="Close Modal">
					&times;
				</span>
		</div>
		<h3 style="padding: 0.9em;">{dateHeading}</h3>
	</header>
	{#each appointmentSlots[weekDaysMap[date.getDay()]] as hour}
		<div class="appointment-line">
			<button data-slot="{getApptID(date, hour)}"
				 on:click={handleSlot}
				 class="appointment-slot {appointments[getApptID(date, hour)] ? 'appointmentTaken' : 'appointmentFree'}">
				{hour}
			</button>
			{#if appointments[getApptID(date, hour)]}
				<button class="deleteButton" data-slot="{getApptID(date, hour)}" on:click={handleDeleteAppt}>Delete</button>
			{/if}
		</div>
	{/each}
</div>


<!--if the appointment is completed (checkbox is true), the appointment is marked as completed -->
{#if schedulerShowing}
		<Scheduler on:schClose={() => schedulerShowing = false}
				   on:addAppt={setApptToSch}
				   on:deleteAppt={handleDeleteAppt}
				   {dateID}
				   {apptID}
				   {appointments}
		/>
{/if}


<style>
	td {
		text-align: left;
		padding: 6px;
	}

	td,
	input {
		cursor: pointer
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	input[type="checkbox"] {
		width: 55px;
		height: 25px;
		margin-top: 10px;
	}

	input[type=checkbox]:checked {
		background-color: hsl(168, 76%, 100%);
		color: white;
	}

	/* Style the close button */
	.close {
		float: right;
		font-size: 2rem;
		color: var(--green);
		padding: 0.2em 0.4em;
		cursor: pointer;
		transition: 0.5s;
	}

	.close:hover {
		background-color: var(--green);
    	color: white;
	}
	.termine {
		--width: 19em;
		--height: 18em;
		width: var(--width);
		height: var(--height);
		position: absolute;
		left: calc((100vw - var(--width)) / 2);
		top: calc((100vh - var(--height)) / 2);
		background-color: white;
		border-style: inset;
		border-color: black;
		z-index: 10;
	}

	.appointment-slot {
	}

	.appointment-line {
		padding: 0 1em;
	}

	.appointmentFree {
		background-color: var(--green);
	}

	.appointmentTaken {
		background-color: var(--brown);
	}

	.deleteButton {
		background:	var(--green);
		color: #FFF;
	}
</style>
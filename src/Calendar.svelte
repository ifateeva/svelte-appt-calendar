<script>
	export let schedule;
	const date = new Date();

	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear()
	}

	const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September",
	"October", "November", "December"];

	let monthIndex = date.getMonth()

	$: month = monthNames[monthIndex];
	let year = date.getFullYear();

	$: firstDayIndex = new Date(year, monthIndex, 1).getDay();
	$: numberOfDays = new Date(year, monthIndex+1, 0).getDate();

	let currentDay = date.getDate();

	$: calendarCellsQty = firstDayIndex <= 4 ? 35 : 42;

	const goToNextMonth = () => {
		if (monthIndex >= 11) {
			year += 1;
			return monthIndex = 0;

		}
		return monthIndex += 1;
	}
	const goToPrevMonth = () => {
		if (monthIndex <= 0) {
			year -= 1;
			return monthIndex = 11;
		}
		return monthIndex -= 1;
	}

</script>




<style>
	ul {list-style-type: none;}

	/* Month header */
	.month {
	  padding: 70px 25px;
	  width: auto;
	  background: #1abc9c;
	  text-align: center;
	}

	/* Month list */
	.month ul {
	  margin: 0;
	  padding: 0;
	}

	.month ul li {
	  color: white;
	  font-size: 20px;
	  text-transform: uppercase;
	  letter-spacing: 3px;
	}

	/* Previous button inside month header */
	.month .prev {
	  float: left;
	  padding-top: 10px;
	  cursor: pointer;
	}

	/* Next button */
	.month .next {
	  float: right;
	  padding-top: 10px;
	  cursor: pointer;
	}

	/* Weekdays (Mon-Sun) */
	.weekdays {
	  margin: 0;
	  padding: 10px 0;
	  background-color:#ddd;
	}

	.weekdays li {
	  display: inline-block;
	  width: 13.8%;
	  color: #666;
	  text-align: center;
	}

	/* Days (1-31) */
	.days {
	  padding: 10px 0;
	  background: #eee;
	  margin: 0;
	}

	.days li {
	  list-style-type: none;
	  display: inline-block;
	  border: 1px solid black;
	  padding: 9px;
	  width: 12.5%;
	  text-align: center;
	  font-size: 1.2rem;
	  color: #777;
	  cursor: pointer;
	}

	/* Highlight the "current" day */
	.active {
	  padding: 5px;
	  background: #1abc9c;
	  color: white;
	}

	/*when the day has appointments it will be marked as red */
	.days li.has-appts {
		color: var(--brown)
	}

	.days li.full-appts {
		color: #F2480A
	}
</style>


	<div class="month">
		<ul>
			<li class="prev" on:click={goToPrevMonth}>&#10094;</li>
			<li class="next" on:click={goToNextMonth}>&#10095;</li>
			<li>{month}<br>
				<span style="font-size:18px">{year}</span>
			</li>
		</ul>
	</div>

	<ul class="weekdays">
		<li>Su</li>
		<li>Mo</li>
		<li>Tu</li>
		<li>We</li>
		<li>Th</li>
		<li>Fr</li>
		<li>Sa</li>
	</ul>
	<!-- creates the number in the calendar -->
	<!--if the active class has appointments, look inside schedule, if it has dateId that matches the data-dateID -->
	<ul class="days">
		{#each Array(calendarCellsQty) as _, i}
			{#if i < firstDayIndex || i >= numberOfDays+firstDayIndex }
				<li>&nbsp;</li>
			{:else}
				<li class:active={i === today.dayNumber+(firstDayIndex-1) &&
										monthIndex === today.month &&
										year === today.year}
					data-dateID="{`${month}_${(i-firstDayIndex)+1}_${year}`}"
					class:full-appts={`${month}_${(i-firstDayIndex)+1}_${year}` in schedule &&
						              (Object.keys(schedule[`${month}_${(i-firstDayIndex)+1}_${year}`]).length === 5)}
					class:has-appts={`${month}_${(i-firstDayIndex)+1}_${year}` in schedule}
					on:click>
					{(i - firstDayIndex) + 1}
				</li>
			{/if}
		{/each}
	</ul>
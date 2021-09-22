import { writable } from 'svelte/store'

// Local Storage
// https://www.w3schools.com/jsref/prop_win_localstorage.asp
// LS with Svelte: https://www.youtube.com/watch?v=a65aPLz18IM
//
const storeInBrowser = (key, data) => {
	const dataAsString = localStorage.getItem(key);
 	const dataAsObj = dataAsString ? JSON.parse(dataAsString) : data;

 	const svelteStore = writable(dataAsObj, () => {
		const unsubscribe = svelteStore.subscribe(currDataState => {
			localStorage.setItem(key, JSON.stringify(currDataState))
		})
 		return unsubscribe;
 	})
	return svelteStore;
 }

 const scheduleData = {
 	"May_31_2021": {
		'2021-05-31T13:00:00Z': {eventName: "Bike ride", eventDetails: "my bike"},
		'2021-05-31T14:00:00Z': {eventName: "Skate ride", eventDetails: "friends skate"}
	}
 }

 export const scheduleStore = storeInBrowser('mySchedule', scheduleData)


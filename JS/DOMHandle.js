/**
* Make function and bind function to event with Tag ID
*
*/
this.clickBindHtmlIdTag("lectureHistory", init);		

const clickBindHtmlIdTag = (tagId, actionFunction) => {
	let tagIdEvent = document.getElementById(tagId);
	tagIdEvent.addEventListener("click", actionFunction);
},

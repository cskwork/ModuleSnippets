/**
* Make function and bind function to event with Tag ID
*
*/
this.clickBindHtmlIdTag("lectureHistory", init);		

const clickBindHtmlIdTag = (tagId, actionFunction) => {
	let tagIdEvent = document.getElementById(tagId);
	if(tagIdEvent) tagIdEvent.addEventListener("click", actionFunction);
},
/** 
* setValuesWithClassTag
* (Foreach X for compatibility)
*/
const setValuesWithClassTag = (value, className) =>{
	let classTags = document.getElementsByClassName(className);
	for(var i = 0, max = classTags.length; i < max; i++) 
	{
		classTags[i].style.display = "none";
		classTags[i].innerHTML = '';
	}	
}

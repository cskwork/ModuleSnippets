// Click Bind Function to Html Id Tag

// Set Values With Class Tag

// Postpone function execution 

// ==================================================================================
/**
*  Click Bind Function to Html Id Tag
*
*/
this.clickBindHtmlIdTag("lectureHistory", init);		

const clickBindHtmlIdTag = (tagId, actionFunction) => {
	let tagIdEvent = document.getElementById(tagId);
	if(tagIdEvent) tagIdEvent.addEventListener("click", actionFunction);
}     
// ==================================================================================     
/** 
* Set Values With Class Tag
* (Foreach X for compatibility)
*/
const setValuesWithClassTag = (value, className) =>{
	let classTags = document.getElementsByClassName(className);
	if(classTags.length>0){
		for(var i = 0, max = classTags.length; i < max; i++) 
		{
			//classTags[i].style.display = "none";
			classTags[i].innerHTML = value;
		}	
	}	
}
// ==================================================================================
// Postpone function execution 
// Postpone function execution until a certain period has passed without the event being fired. 
// (preventing the execution of functions if a user is rapidly clicking the buttons.)
function debounce(func, delay) {
	let timeout;
	return function() {
	  const context = this;
	  const args = arguments;
	  clearTimeout(timeout);
	  timeout = setTimeout(() => func.apply(context, args), delay);
	};
  }
  // Define the function that updates the layout
function updateLayout() {
	// Update the layout...
  }
  
  // Create a debounced version of the function
  const debouncedUpdateLayout = debounce(updateLayout, 250);
  
  // Listen for window resize events and call the debounced function
  window.addEventListener("resize", debouncedUpdateLayout);
// ==================================================================================

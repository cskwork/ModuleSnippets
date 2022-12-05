// @목차
// 배열의 고유값
// 첫번째와 마지막 위치를 기준으로 누적된 합을 이동하면서 비교하는 방법
// 두번째 배열 값들이 첫번째 배열값 X2 인지 확인 
// Anagram인지 확인
// 배열값 찾기 (binary search)

//=======================================================================================

// 배열의 고유값 
function countUniqueValues(arr){
    //배열 값이 있는지 확인
    if(arr.length === 0) return 0;
    var i = 0;
  //------------------------------------
    //배열 값을 비교할 위치를 0과 1로 나누고 값이 일치할 경우 1번째 위치만 증가. 
    //일치하지 않을 경우 둘 다 증가하고 0번째 위치 값은 동일하게 만들어서 
    //카운트 중복 제거
    for(var j = 1; j < arr.length; j++){
        if(arr[i] !== arr[j]){
            i++;
            arr[i] = arr[j]
        }
    }
    return i + 1;
  //------------------------------------
}
console.log(countUniqueValues([1,2,2,5,7,7,99]))

//=======================================================================================

// 첫번째와 마지막 위치를 기준으로 누적된 합을 이동하면서 비교하는 방법
function maxSubArraySum(arr, num){
    //maxSum을 보관할 변수, 임시 Sum을 보관할 변수 선언
    let maxSum = 0;
    let tempSum = 0;
    //Input validity 확인
    if(arr.length < num) return null; 
    //------------------------------------------
    //0번째 위치에서 순차적으로 지정된 횟수만큼 더한 합을 maxSum에 보관 
    for(let i=0; i< num; i++){
        maxSum += arr[i]; 
    }
    tempSum = maxSum;
    //------------------------------------------
    
    //------------------------------------------
    //0번째 위치 누적합 다음의 누적합을 0번째 누적합과 비교해서 더 큰 값 리턴 
    for(let i= num; i < arr.length; i++){
        //------------------------------------------
        //첫번째 누적합 - 배열의 최초 위치 값 + 누작합이 끝나는 위치 값
        //누적합이 그대로 우측으로 이동한다. (sliding window) 
        tempSum = tempSum - arr[i - num] + arr[i]; //Init input window
			  //------------------------------------------	
      
        //Add by init num. - first array value of window = only the sum of window.   
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
    //------------------------------------------
} 
console.log(maxSubArraySum([2,6,9,2,1,8,5,6,3], 3)); //19

//=======================================================================================

// 두번째 배열 값들이 첫번째 배열값 X2 인지 확인 
function compareValuesOfArrayWithCondition(arr1, arr2){

  //---------------------------------
  //배열값 갯수가 일치하는지 확인
  if(arr1.length !== arr2.length){
	  return false;
	}
  //---------------------------------
  //배열값 카운트에 사용하는 배열 2개 초기화
	let frequencyCounter1 = {};
	let frequencyCounter2 = {};
  //---------------------------------

  //---------------------------------
  //동일한 문자가 있으면 카운트해서 횟수 카운터 배열에 각각 넣기 
	for(let val of arr1){
	  frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1; //frequency counting. 
	}
  //---------------------------------

	for(let val of arr2){
	  frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
	}

  //---------------------------------
  //두번째 배열의 값이 첫번째 배열 ^2 조건을 충족하는지 확인
  for(let key in frequencyCounter1){
    if(!(key ** 2 in frequencyCounter2)){
	return false;
    }
    if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
	return false;
    }
   }
	//console.log(frequencyCounter1);
	//console.log(frequencyCounter2);
	return true;
  //---------------------------------
}

console.log(compareValuesOfArrayWithCondition([1,2,3] , [1,4,5])); //false
console.log(compareValuesOfArrayWithCondition([1,2,3] , [1,4,9])); //true

//=======================================================================================

// Anagram인지 확인
function validAnagram(first, second){
  //--------------------------------
  //2개의 문자열 길이가 일치하는지 확인
	if(first.length !== second.length){
		return false;
	}
  //--------------------------------
	
  //--------------------------------
  //1번째 문자 횟수 카운트 배열 선언
	const lookup = {}; //obj as freq.counter
  //--------------------------------

  //--------------------------------
  //횟수 카운트 1번째 배열에 문자를 넣어 반복 횟수 카운트 
	//Break down the first string.
	for(let i=0; i < first.length ; i++){
	  let letter = first[i];
	  //if letter exists, increment, otherwise set to 1
	  lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
	}
  //--------------------------------

  //--------------------------------
  //두번째 문자열의 각 문자가 발생한 횟수를 문자 횟수 카운트 배열로 확인. 
  //없으면 false, 있으면 문자가 반복된 횟수만큼 -1 카운트.
	//Break down the second string
	//then check to first string.
	for(let i=0; i < second.length; i++){
	  let letter = second[i];
	  //can't find letter or letter is zero then not anagram.
	  if(!lookup[letter]){
	    return false;
	  }else{
	    lookup[letter] -= 1;
	  }	
	}
	return true;
  //--------------------------------
}

console.log(validAnagram('anagram','nagaram'));
console.log(validAnagram('anagram','nagparam'));

//=======================================================================================

// 배열값 찾기 (binary search)
function searchB(array, val){
	let min=0; //Init left
	let max=array.length - 1; //Init right

	while(min <= max){
	    let middle = Math.floor((min + max) / 2); //INIT Middle
	    let currentElement = array[middle];

	    if(array[middle] < val){ //Check input search value to middle. 
	        min = middle + 1; //Init new min
	    }else if (array[middle] > val){
	        max = middle - 1; //Init new max
	    }else{
	        return middle;
	    }
	}
	return -1;

}


console.log(searchB([1,2,3,4,5,6], 8));
console.log(searchB([1,2,3,4,8,6], 8));

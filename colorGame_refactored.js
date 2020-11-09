var numSquares = 6;//important for reset button to work properly after toggling modes
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	//mode buttons event listeners
	for(var i = 0; i<modeButtons.length;i++){
		modeButtons[i].addEventListener("click",function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// if(this.textContent=== "Easy"){
			// 	numSquares = 3;
			// }else{
			// 	numSquares = 6;
			// }
			this.textContent === "Easy" ? numSquares=3: numSquares = 6;
			reset();
		});
	}
	for(var i=0; i<squares.length;i++){	
		//add click listeners to squares
		squares[i].addEventListener("click",function() {
			// grab color of clicked square
			var clickedColor = this.style.backgroundColor;//use backgroundColor instead of background
			// compare grabbed color i.e."clickedColor" to "pickedColor"
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!!";
				changeColor(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again";
			}else{
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again!!";
			}
		});
	};
	reset();
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i = 0; i<squares.length;i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";	
		}
	}
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function(){
	reset();
});	

//changing color of all the squared to the correct color
function changeColor(color){
	//loop through all the squares
	for(var i = 0; i<squares.length; i++){
		//change each square's color to match given/correct color
		squares[i].style.backgroundColor = color;
	}
};


function pickColor(){
	/*Note about Math.random(): it selects numbers between 0 and 1 and it excludes 1 so by multiplying it with "colors.length" we will get the values between 0 and 6 excluding 6 i.e. giving the indices upto 5 and that'll work for us here*/
	var random = Math.floor(Math.random() * colors.length);//floor crops off the decimal values leaving only whole numbers
	return colors[random];
};


function generateRandomColors(num){
	//make an array
	arr = [];
	//repeat num times
	for(var i = 0;i<num;i++){
		//get random color and push into the arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}


function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
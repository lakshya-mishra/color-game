var numSquares = 6;//important for reset button to work properly after toggling modes
var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
//randomizing the process of picking a color from the given colors list above
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function(){
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0;i<squares.length;i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
});


hardBtn.addEventListener("click", function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0;i<squares.length;i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}	
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
})


resetButton.addEventListener("click", function(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i = 0; i<squares.length;i++){
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
	this.textContent = "New Colors"
	messageDisplay.textContent = "";
});	


colorDisplay.textContent = pickedColor;


for(var i=0; i<squares.length;i++){
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i]; //here we used "i" and used to access "colors"
	//add click listeners to squares
	squares[i].addEventListener("click",function() {
		// grab color of clicked square
		var clickedColor = this.style.backgroundColor;//use backgroundColor instead of background
		// compare grabbed color i.e."clickedColor" to "pickedColor"
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!!";
			changeColor(clickedColor);
			h1.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play Again"
		}else{
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again!!";
		}
	});
};


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
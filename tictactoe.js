//Game Class

class Game{
	constructor() {
		this.turns = {
			count: 1,
		}
	}
	chooseMark() {
		const x = document.getElementById("symbol-x");
		const o = document.getElementById("symbol-o");
		
		x.onclick = () => {
			x.disabled = true;
			x.style.borderColor = "blue";
			x.setAttribute("activate", 1);
			o.disabled = true;
			this.user(x.innerHTML);
		}
		
		o.onclick = () => {
			o.disabled = true;
			o.style.borderColor = "blue";
			o.setAttribute("activate", 1);
			x.disabled = true;
			this.user(o.innerHTML);
		}
	}
	
	remember() {
		const x = document.getElementById("symbol-x");
		const o = document.getElementById("symbol-o");
		
		if(x.hasAttribute("activate")) {
			return "X";
		}
		
		if(o.hasAttribute("activate")) {
			return "O";
		}
	}
	
	user(mark) {
		this.checkButton(mark)
	}
	
	machine(mark) {
		let position= Math.floor(Math.random() * 9);
		this.checkButton(mark, position);
	}
	
	createBoard() {
		const primary = document.getElementById("primary");
		//concatenate all the buttons
		let buttons = "";
		//create a div tag
		const div = document.createElement("div");
		//iteration
		const ITER = 9;
		for(let items = 0; items < ITER; items++) {
			let btn = document.createElement("button");
			let text = document.createTextNode(items + 1);
			btn.classList.add('btn', `btn-${items + 1}`);
			btn.type = "button";
			btn.appendChild(text);
			div.appendChild(btn);
		}
		primary.appendChild(div);
		div.className = "element";
		div.id = "room";
		this.chooseMark();
	}
	
	draw() {
		//console.log("Match Drawn");
		//this.createBoard();
		
		const draw = document.getElementById("draw");
		
		if(this.turns.count > 1) {
			return
		}
		
		//reset 
		this.resetBtn();
		this.turns.count++;
		
		draw.innerHTML = "Match Drawn";
		draw.style.padding = "1.5rem";
	}
	
	resetBtn() {
		//reset 
		const mark = document.getElementById("mark-1");
		const reset = document.createElement("button");
		const resetText = document.createTextNode("Reset");
		reset.appendChild(resetText);
		mark.appendChild(reset);
		reset.style.backgroundColor = "crimson";
		reset.id = "reset-btn";
		
		const set = document.getElementById("reset-btn").addEventListener("click", function() {
			location.reload();
		});
	}
	
	win(symbol) {
		const winner = document.getElementById("winner");
		
		console.log(this.turns.count);
		
		if(this.turns.count > 1) {
			return
		}
		
		//reset 
		this.resetBtn();
		this.turns.count++;
		
		// const set = document.getElementById("reset-btn").addEventListener("click", function() {
			// location.reload();
		// });
		
		if(symbol == this.remember()) {
			//console.log("User Won");
			//return;
			//this.createBoard();
			winner.innerHTML = "You Won";
			winner.style.padding = "1.5rem";
		}else{
			//console.log("CPU Won");
			//return;
			//this.createBoard();
			winner.innerHTML = "CPU Won";
			winner.style.padding = "1.5rem";
			winner.style.backgroundColor = "red";
		}
	}
	
	validation(mark) {
		const btn = document.querySelectorAll(".btn");
		
		const patterns = {
			1 : [0, 4, 8],
			2 : [2, 4, 6],
			3 : [0, 1, 2],
			4 : [3, 4, 5],
			5 : [6, 7, 8],
			6 : [0, 3, 6],
			7 : [1, 4, 7],
			8 : [2, 5, 8]
		};
		
		// if(btn[0].innerHTML == btn[4].innerHTML &&  btn[4].innerHTML == btn[8].innerHTML) {
			
			// this.win(mark);
			// return true;
		// }
		
		for(let pattern in patterns) {
			if(btn[patterns[pattern][0]].innerHTML == btn[patterns[pattern][1]].innerHTML &&  btn[patterns[pattern][1]].innerHTML == btn[patterns[pattern][2]].innerHTML) {
				this.win(mark);
				return true;
			}
		} 
	}
	
	checkButton(mark, position = -1) {
		const btn = document.querySelectorAll(".btn");
		
		let count = 0;
		btn.forEach(function(element) {
			if(element.innerHTML == "X" || element.innerHTML == "O") {
				count++;
			}
		});
		
		if(count == 9) {
			this.draw();
			return
		}
		
		if(position != -1) {
			if(btn[position].innerHTML != "X" && btn[position].innerHTML != "O") {
				btn[position].innerHTML = mark;
				if(this.validation(mark)) {
					return;
				}
			}else {
				this.machine(mark);
			}
		}else{
			btn.forEach((element) => {
				element.onclick = () => {
					if(element.innerHTML != "X" && element.innerHTML != "O") {
						if(this.validation(mark)) {
							return;
						};
						element.innerHTML = mark;
						if(this.validation(mark)) {
							return;
						};
						if(mark == "X") {
							this.machine("O");
						}else {
							this.machine("X");
						}
					}
				}
			});
		}
	}
	
}

const user = new Game();
user.createBoard();
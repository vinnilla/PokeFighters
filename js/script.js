//create players
var p1 = {
	health: 100,
	damage: 10,
	x: ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px'],
	counter: 0
}

var p2 = {
	health: 100,
	damage: 10,
	x: ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px'],
	counter: 15
}

//pointers to html elements
p1HTML = document.getElementById('p1');
p2HTML = document.getElementById('p2');

//movement
document.addEventListener('keydown', function(e) {
	//d
	if (e.keyCode == 68) {
		if (p1.x[p1.counter+1] != undefined && p1.counter+1 != p2.counter) {
			p1.counter++;
			p1HTML.style.left = p1.x[p1.counter];
		}
	}
	else if (e.keyCode == 65) {
		if (p1.x[p1.counter-1] != undefined && p1.counter-1 != p2.counter) {
			p1.counter--;
			p1HTML.style.left = p1.x[p1.counter];
		}
	}
	else if (e.keyCode == 39) {
		if (p2.x[p2.counter+1] != undefined && p2.counter+1 != p1.counter) {
			p2.counter++;
			p2HTML.style.left = p2.x[p2.counter];
		} 
	}
	else if (e.keyCode == 37) {
		if (p2.x[p2.counter-1] != undefined && p2.counter+-1 != p1.counter) {
			p2.counter--;
			p2HTML.style.left = p2.x[p2.counter];
		} 
	}
}, false);
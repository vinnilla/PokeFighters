//create players
var p1 = {
	name: 'Keydar',
	health: 100,
	damage: 10,
	x: ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px'],
	counter: 0,
	timerid: 0
}

var p2 = {
	name: 'Dan',
	health: 100,
	damage: 10,
	x: ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px'],
	counter: 15,
	timerid: 0
}

//pointers to html elements
p1HTML = document.getElementById('p1');
p2HTML = document.getElementById('p2');
p1HP = document.getElementById('p1hp');
p2HP = document.getElementById('p2hp');

//show starting hp
updateHP();
document.addEventListener('keydown', movement, false);
document.addEventListener('keyup', collisionDetection, false);

function movement(e) {
	// d
	if (e.keyCode == 68) {
		testMove(p1, 'right');
	}
	// a
	else if (e.keyCode == 65) {
		testMove(p1, 'left');
	}
	// ->
	else if (e.keyCode == 39) {
		testMove(p2, 'right');
	}
	// <-
	else if (e.keyCode == 37) {
		testMove(p2, 'left');
	}
}

function collisionDetection(e) {
	//TODO change key layout for each palyer
	// space
	if (e.keyCode == 32) {
		//test collision
		if (p1.counter+1 == p2.counter) {
			//test hp of opponent
			if (p2.health) {
				p2.timerid = collide(p2HTML);
				calcDamage(p1, p2);
			}
		}
	}
	//enter
	else if (e.keyCode == 13) {
		if (p2.counter-1 == p1.counter) {
			if (p1.health) {
				p1.timerid = collide(p1HTML);
				calcDamage(p2, p1);
			}
		}
	}
}

function knockOut(aggressor, defender) {
	if (!defender.health) {
		console.log(defender.timerid)
		clearInterval(defender.timerid);
		//remove event listeners
		document.removeEventListener('keydown', movement);
		document.removeEventListener('keyup', collisionDetection);
		//ensure flashing interval is cleared
		setTimeout(function() {alert(aggressor.name + " KO'd " + defender.name);}, 500);
	}
}

//TODO add blocking damage reduction
function calcDamage(aggressor, defender){
	defender.health -= aggressor.damage;
	updateHP();
	//KO
	knockOut(aggressor, defender);
}

function updateHP() {
	p1HP.innerHTML = p1.health;
	p2HP.innerHTML = p2.health;
}

function collide(playerHit) {
		var timer = 3;
		var timerId = window.setInterval(function(){
			playerHit.classList.toggle('image');
			if (!timer) {
				window.clearInterval(timerId);
			}
			timer --;
		}, 250)
		return timerId;
};

function testMove(player, direction) {
	//p1 moving right
	if (player == p1 && direction == 'right') {
		if (p1.x[p1.counter+1] != undefined && p1.counter+1 != p2.counter) {
			p1.counter++;
			p1HTML.style.left = p1.x[p1.counter];
		}
	}

	//p1 moving left
	else if (player == p1 && direction == 'left') {
		if (p1.x[p1.counter-1] != undefined && p1.counter-1 != p2.counter) {
			p1.counter--;
			p1HTML.style.left = p1.x[p1.counter];
		}
	}

	//p2 moving right
	else if (player == p2 && direction == 'right') {
		if (p2.x[p2.counter+1] != undefined && p2.counter+1 != p1.counter) {
			p2.counter++;
			p2HTML.style.left = p2.x[p2.counter];
		} 
	}

	//p2 moving left
	else if (player == p2 && direction == 'left') {
		if (p2.x[p2.counter-1] != undefined && p2.counter+-1 != p1.counter) {
			p2.counter--;
			p2HTML.style.left = p2.x[p2.counter];
		} 
	}
}
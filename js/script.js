//IDEAS

//create players
var p1 = {
	name: 'Keydar',
	health: 100,
	damage: 10,
	x: ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px'],
	position: 0,
	timerid: 0,
	combo: 0,
	blockEnergy: 20,
	block: false,
	attackCD: 0,
	blockCD: 0
}

var p2 = {
	name: 'Dan',
	health: 100,
	damage: 10,
	x: ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px'],
	position: 15,
	timerid: 0,
	combo: 0,
	blockEnergy: 20,
	block: false,
	attackCD: 0,
	blockCD: 0
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
	//TODO change key layout for each player
	//attack
	// 1
	if (e.keyCode == 49) {
		//test collision
		if (p1.position+1 == p2.position) {
			//test hp of opponent and attack cooldown
			if (p2.health && p1.attackCD <= 0) {
				p2.timerid = collide(p2HTML);
				calcDamage(p1, p2);
			}
		}
	}
	// .
	else if (e.keyCode == 190) {
		if (p2.position-1 == p1.position) {
			if (p1.health && p2.attackCD <= 0) {
				p1.timerid = collide(p1HTML);
				calcDamage(p2, p1);
			}
		}
	}

	//block
	// 2
	else if (e.keyCode == 50) {
		block(p1, p1HTML);
	}
	// /
	else if (e.keyCode == 191) {
		block(p2, p2HTML);	
	}
}

function block(player, html) {
	if (player.blockCD <= 0) {
		//3 second cd
		player.blockCD = 3;
		player.block = true;
		toggleBlock(html);
		//make block false after 1 second
		setTimeout(function() {
			player.block = false;
			toggleBlock(html);
		}, 1000);
		console.log(player.block);
		//countdown block cool down
		var id = setInterval(function() {
			player.blockCD--;
			if (player.blockCD <= 0) {
				clearInterval(id);
			}
		}, 1000);
	}
}

function toggleBlock(player) {
	player.classList.toggle('image');
	player.classList.toggle('block');
}

function resetBlock (player) {
	player.block = false;
}

function knockOut(aggressor, defender) {
	if (defender.health <= 0) {
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
	//check block
	if (!defender.block) {
		defender.health -= aggressor.damage;
	}
	else { //damage halved when block
		defender.health -= aggressor.damage/2;
	}
	updateHP();
	setAttackCD(aggressor);
	//KO
	knockOut(aggressor, defender);
}

function setAttackCD(aggressor, move) {
	aggressor.attackCD = 1;
	//reset attackCD to 0
	var id = setInterval(function() {
		aggressor.attackCD --;
		if (aggressor.attackCD <=0) {
			clearInterval(id);
		}
	}, 500);
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
		if (p1.x[p1.position+1] != undefined && p1.position+1 != p2.position) {
			p1.position++;
			p1HTML.style.left = p1.x[p1.position];
		}
	}

	//p1 moving left
	else if (player == p1 && direction == 'left') {
		if (p1.x[p1.position-1] != undefined && p1.position-1 != p2.position) {
			p1.position--;
			p1HTML.style.left = p1.x[p1.position];
		}
	}

	//p2 moving right
	else if (player == p2 && direction == 'right') {
		if (p2.x[p2.position+1] != undefined && p2.position+1 != p1.position) {
			p2.position++;
			p2HTML.style.left = p2.x[p2.position];
		} 
	}

	//p2 moving left
	else if (player == p2 && direction == 'left') {
		if (p2.x[p2.position-1] != undefined && p2.position+-1 != p1.position) {
			p2.position--;
			p2HTML.style.left = p2.x[p2.position];
		} 
	}
}
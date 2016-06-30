//create players
var p1 = {
	name: 'Squirtle',
	x: ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px', '800px', '850px', '900px', '950px', '1000px', '1064px'],
	position: 0,
	health: 100,
	damage: 10,
	attackCD: 0,
	attackSpeed: 10,
	stun: false,
	combo: 0,
	comboId: 0,
	timerid: 0,
	blockStrength: 2,
	block: false,
	blockCD: 0
}

var p2 = {
	name: 'Dan',
	x: ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px', '800px', '850px', '900px', '950px', '1000px', '1064px'],
	position: 21,
	health: 100,
	damage: 10,
	attackCD: 0,
	attackSpeed: 10,
	stun:false,
	combo: 0,
	comboId: 0,
	timerid: 0,
	blockStrength: 2,
	block: false,
	blockCD: 0
}

//pointers to html elements
p1HTML = document.getElementById('p1');
p2HTML = document.getElementById('p2');
p1HP = document.getElementById('p1hp');
p2HP = document.getElementById('p2hp');
var $p1Combo = $('#p1combo');
var $p2Combo = $('#p2combo');

//show starting stats
updateStats();
document.addEventListener('keydown', movement, false);
document.addEventListener('keyup', collisionDetection, false);

// ------------------------------------------MOVEMENT------------------------------------------ //

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

function testMove(player, direction) {
	//p1 moving right
	if (player == p1 && direction == 'right') {
		if (p1.x[p1.position+1] != undefined && p1.position+6 != p2.position) {
			p1.position++;
			p1HTML.style.left = p1.x[p1.position];
		}
	}

	//p1 moving left
	else if (player == p1 && direction == 'left') {
		if (p1.x[p1.position-1] != undefined && p1.position-6 != p2.position) {
			p1.position--;
			p1HTML.style.left = p1.x[p1.position];
		}
	}

	//p2 moving right
	else if (player == p2 && direction == 'right') {
		if (p2.x[p2.position+1] != undefined && p2.position+6 != p1.position) {
			p2.position++;
			p2HTML.style.left = p2.x[p2.position];
		} 
	}

	//p2 moving left
	else if (player == p2 && direction == 'left') {
		if (p2.x[p2.position-1] != undefined && p2.position-6 != p1.position) {
			p2.position--;
			p2HTML.style.left = p2.x[p2.position];
		} 
	}
}

// ------------------------------------------COLLISION AND COMBAT------------------------------------------ //

function collisionDetection(e) {
	//TODO change key layout for each player
	//attack
	// 1
	if (e.keyCode == 49) {
		//test collision
		if (p1.position+6 == p2.position) {
			//test hp of opponent and attack cooldown and stun status
			if (p2.health && checkStatus(p1)) {
				p2.timerid = collide(p2HTML);
				calcDamage(p1, p2, p1HTML, p2HTML);
			}
		}
	}
	// .
	else if (e.keyCode == 190) {
		if (p2.position-6 == p1.position) {
			if (p1.health && checkStatus(p2)) {
				p1.timerid = collide(p1HTML);
				calcDamage(p2, p1, p2HTML, p1HTML);
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

function collide(playerHit) {
		var timer = 3;
		var timerId = window.setInterval(function(){
			playerHit.classList.toggle('standard');
			if (!timer) {
				window.clearInterval(timerId);
			}
			timer --;
		}, 250)
		return timerId;
};

function checkStatus(player) {
	return (player.attackCD <= 0 && !player.stun);
}

// ------------------------------------------ATTACKING------------------------------------------ //

//TODO add blocking damage reduction
function calcDamage(aggressor, defender, aggressorHTML, defenderHTML){
	//check block
	if (!defender.block) {
		//combo tracking -- only iterate combo if attack is not blocked
		defender.health -= aggressor.damage;
		aggressor.combo++;
		clearInterval(aggressor.comboId);
		aggressor.comboId = comboReset(aggressor);
		evolution(aggressor, aggressorHTML);
		//stun defender if attack isn't blocked
		stun(defender);
	}
	else { //damage halved when block
		defender.health -= aggressor.damage/defender.blockStrength;
	}
	setAttackCD(aggressor);
	updateStats();
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
	}, 50*aggressor.attackSpeed);
	console.log(aggressor.attackSpeed);
}

// ------------------------------------------COMBO MANAGEMENT------------------------------------------ //

function comboReset(player) {
	//reset combo after 3 seconds
	var id = setTimeout(function(){
		player.combo = 0;
		updateStats();
	},3000);
	return id;
}

function evolution(player, html) {
	if (player.combo >=3) {
		html.classList.remove('standard');
		html.classList.add('evo1');
		//player.damage = 20;
		player.attackSpeed = 5;
		//reset evolution after 5 seconds
		setTimeout(function(){
			html.classList.remove('evo1');
			html.classList.add('standard');
			//player.damage = 10;
			player.attackSpeed = 10;
		}, 5000);
	}
}

// ------------------------------------------ATTACK EFFECTS------------------------------------------ //

function stun(defender) {
	defender.stun = true;
	setTimeout(function() {
		defender.stun = false;
	},250);
}

// ------------------------------------------BLOCKING------------------------------------------ //

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
	player.classList.toggle('standard');
	player.classList.toggle('block');
}

// ------------------------------------------ROUND END------------------------------------------ //

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

function updateStats() {
	//hp
	p1HP.innerHTML = p1.health;
	p2HP.innerHTML = p2.health;
	//combo
	$p1Combo.text(p1.combo);
	$p2Combo.text(p2.combo);
}
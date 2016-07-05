//create players
var p1 = {
	name: 'Squirtle',
	pNeutral: "url('img/squirtle.png')",
	pWalk: "url('img/squirtle_walk.png')",
	pAttack: "url('img/squirtle_attack.png')",
	pBlock: "url('img/squirtle_block.png')",
	pFlinch: "url('img/squirtle_flinch.png')",
	pQuickAttack1: "url('img/squirtle bite.png')",
	pQuickAttack2: "url('img/squirtle bite 2.png')",
	html: $('#p1'),
	model: $('.normal').eq(0),
	evo1: $('.evolve1').eq(0),
	evo2: $('.evolve2').eq(0),
	// shield: $('#p1shield'),
	$hp: $('#p1hp'),
	$combo: $('#p1combo'),
	position: 0,
	nPosition: 0,
	health: 100,
	nHealth: 100,
	qDamage: 5,
	nqDamage: 5,
	sequence: 0,
	damage: 5,
	nDamage: 5,
	attackSpeed: 20,
	nAttackSpeed: 20,
	attackCD: 0,
	attack: false,
	stun: false,
	stunID: 0,
	combo: 0,
	comboId: 0,
	attackLock: 0,
	blockStrength: 5,
	nBlockStrength: 5,
	block: false,
	blockCD: 0,
	wins: 0,
	badge1: $('#p1badge1'),
	badge2: $('#p1badge2')
}

var p2 = {
	name: 'Charmander',
	//position: 21,
	pNeutral:"url('img/charmander.png')",
	pWalk:"url('img/charmander walk.png')",
	pAttack:"url('img/charmander attack.png')",
	pBlock:"url('img/charmander block.png')",
	pFlinch:"url('img/charmander flinch.png')",
	pQuickAttack1: "url('img/charmander scratch 1.png')",
	pQuickAttack2: "url('img/charmander scratch 2.png')",
	html: $('#p2'),
	model: $('.normal').eq(1),
	evo1: $('.evolve1').eq(1),
	evo2: $('.evolve2').eq(1),
	// shield: $('#p2shield'),
	$hp: $('#p2hp'),
	$combo: $('#p2combo'),
	position: 18,
	nPosition: 18,
	health: 100,
	nHealth: 100,
	qDamage: 5,
	nqDamage: 5,
	sequence: 0,
	damage: 5,
	nDamage: 5,
	attackSpeed: 20,
	nAttackSpeed: 20,
	attackCD: 0,
	attack: false,
	stun:false,
	stunID: 0,
	combo: 0,
	comboId: 0,
	attackLock: 0,
	blockStrength: 4,
	nBlockStrength: 4,
	block: false,
	blockCD: 0,
	wins: 0,
	badge1: $('#p2badge1'),
	badge2: $('#p2badge2')
}


// var x = ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px', '800px', '850px', '900px', '950px', '1000px', '1064px'];
var x = ['0px', '50px', '100px', '150px', '200px', '250px', '300px', '350px', '400px', '450px', '500px', '550px', '600px', '650px', '700px', '750px', '800px', '850px', '900px'];

//pointers to html elements not specific to player
var $document = $(document);
var $timer = $('#timer');

//show starting stats
updateStats();
neutralCSS(p1);
neutralCSS(p2);
//start round timer
var timer = 90;
var timerID = startTimer();

$document.on('keydown', movement);
$document.on('keyup', combat);

// ------------------------------------------MOVEMENT------------------------------------------ //

function movement(e) {
	// d
	if (e.keyCode == 68) {
		if (!p1.attack) {
			testMove(p1, 'right');
		}
	}
	// a
	else if (e.keyCode == 65) {
		if (!p1.attack) {
			testMove(p1, 'left');	
		}
	}
	// ->
	else if (e.keyCode == 39) {
		if (!p2.attack) {
			testMove(p2, 'right');
		}
	}
	// <-
	else if (e.keyCode == 37) {
		if (!p2.attack) {
			testMove(p2, 'left');
		}
	}
}

function testMove(player, direction) {
	//p1 moving right
	if (player == p1 && direction == 'right') {
		if (x[p1.position+1] != undefined && p1.position+7 != p2.position) {
			move(p1, 1);
		}
	}

	//p1 moving left
	else if (player == p1 && direction == 'left') {
		if (x[p1.position-1] != undefined && p1.position-7 != p2.position) {
			move(p1, -1);
		}
	}

	//p2 moving right
	else if (player == p2 && direction == 'right') {
		if (x[p2.position+1] != undefined && p2.position+7 != p1.position) {
			move(p2, 1);
		} 
	}

	//p2 moving left
	else if (player == p2 && direction == 'left') {
		if (x[p2.position-1] != undefined && p2.position-7 != p1.position) {
			move(p2, -1)
		} 
	}
}

function move(player, value) {
	player.position += value;
	player.model.animate({left: x[player.position]}, 100);
	player.evo1.css('left', parseInt(x[player.position]) + 30);
	player.evo2.css('left', parseInt(x[player.position]) + 30);
	//conditional allows movement while blocking without changing the character model
	if (!player.block) {
		neutralCSS(player);
	}
}

// ------------------------------------------COLLISION AND COMBAT------------------------------------------ //

function combat(e) {
	//TODO change key layout for each player
	//quick attack
	// 1
	if (e.keyCode == 49) {
		attack(p1, p2, 'quick');
	}
	// ,
	if (e.keyCode == 188) {
		attack(p2, p1, 'quick');
	}

	//strong attack
	// 2
	if (e.keyCode == 50) {
		attack(p1, p2, 'strong');
	}
	// .
	if (e.keyCode == 190) {
		attack(p2, p1, 'strong');
	}

	//block
	// 3
	if (e.keyCode == 51) {
		block(p1);
	}
	// /
	if (e.keyCode == 191) {
		block(p2);	
	}
}

function testCollision(attacker) {
	if (attacker == p1) {
		if (p1.position+7 == p2.position) {
			return true;
		}
	}
	else {
		if (p1.position == p2.position-7) {
			return true;
		}
	}
	
}

function checkStatus(player) {
	return (player.attackCD <= 0 && !player.stun);
}

// ------------------------------------------ATTACKING------------------------------------------ //

//TODO add blocking damage reduction
function attack(aggressor, defender, type){
	//check attack cooldown and stun status
	if (checkStatus(aggressor)) {
		//show animation
		//change css
		aggressor.model.css('width', '386px');
		if (type == 'strong') {
			aggressor.model.css('background-image', aggressor.pAttack);	
		}
		else {
			if (aggressor.sequence == 0) {
				aggressor.model.css('background-image', aggressor.pQuickAttack1);
				aggressor.sequence++;
			}
			else {
				aggressor.model.css('background-image', aggressor.pQuickAttack2);
				aggressor.sequence--;
			}
		}
		defender.model.css('z-index', 1)
		aggressor.model.css('z-index', 2);
		aggressor.attack = true;
		if (aggressor == p2) {
			console.log('shift left');
			aggressor.model.css('left', parseInt(aggressor.model.css('left'))-100);
		}
		//attacking creates animation lock
		var timeout = 0;
		if (type == 'strong') {
			timeout = 50;
		}
		else {
			timeout = 25;
		}
		aggressor.attackLock = setTimeout(function() {
			neutralCSS(aggressor);
			if (aggressor == p2) {
				aggressor.model.css('left', parseInt(aggressor.model.css('left'))+100);
			}
			aggressor.attack = false;

		},timeout*aggressor.attackSpeed);
		setAttackCD(aggressor, timeout);

		//check collision -- only on collision does damage apply
		if (testCollision(aggressor)) {
			//check hp of opponent
			if (defender.health) {
				//check block
				if (!defender.block) {
					if (type == 'strong') {
						defender.health -= aggressor.damage;
					}
					else {
						defender.health -= aggressor.qDamage;
					}
					//combo tracking -- only iterate combo if attack is not blocked
					aggressor.combo++;
					// taking damage will reset
					defender.combo = 0;
					defender.evo1.addClass('hidden');
					defender.evo2.addClass('hidden');
					// clearInterval(aggressor.comboId);
					// aggressor.comboId = comboReset(aggressor);
					evolution(aggressor);
					//stun defender if attack isn't blocked
					stun(defender, aggressor.attackSpeed);
					
				}
				else { //damage halved when block
					if (type == 'strong') {
						defender.health -= aggressor.damage/defender.blockStrength;
					}
					else {
						defender.health -= aggressor.qDamage/defender.blockStrength;
					}
				}
				updateStats();
				//check KO
				knockOut(aggressor, defender);
			}
		}
	}	
}

function setAttackCD(aggressor, time) {
	aggressor.attackCD = 1;
	//reset attackCD to 0
	var id = setInterval(function() {
		aggressor.attackCD --;
		if (aggressor.attackCD <=0) {
			clearInterval(id);
		}
	}, time*aggressor.attackSpeed);
}

// ------------------------------------------COMBO MANAGEMENT------------------------------------------ //

// function comboReset(player) {
// 	//reset combo after 3 seconds
// 	var id = setTimeout(function(){
// 		player.combo = 0;
// 		updateStats();
// 	},3000);
// 	return id;
// }

function evolution(player) {
	clearTimeout(player.comboID);
	if (player.combo >= 6) {
		//3x base damage
		player.damage = player.nDamage*3;
		player.evo1.addClass('hidden');
		player.evo2.removeClass('hidden');
		// console.log(player.damage);
		player.comboID = setTimeout(function() {
			//reset to base damage;
			player.damage = player.nDamage;
			player.evo2.addClass('hidden');
			player.combo = 0;
			console.log('hi');
			updateStats();
		}, 5000)
	}
	else if (player.combo >=3) {
		//replace with changing css background image to whatever image
		// player.html.removeClass('standard');
		// player.html.addClass('evo1');
		//2x base damage
		player.damage = player.nDamage*2;
		player.evo1.removeClass('hidden');
		//console.log(player.damage);
		//reset evolution after 5 seconds
		player.comboID = setTimeout(function(){
			//same as above
			// player.html.removeClass('evo1');
			// player.html.addClass('standard');
			//reset to base attack speed
			player.damage = player.nDamage;
			player.evo1.addClass('hidden');
			player.combo = 0;
			console.log('hello');
			updateStats();
		}, 5000);
	}
}

// ------------------------------------------ATTACK EFFECTS------------------------------------------ //

function stun(defender, rate) {
	clearTimeout(defender.stunID);
	if (defender.attack != true) {
		defender.stun = true;
		defender.model.css('background-image', defender.pFlinch);
		defender.stunID = setTimeout(function() {
			defender.stun = false;
			neutralCSS(defender);
		},50*rate)	
	}
}

// ------------------------------------------BLOCKING------------------------------------------ //

function block(player) {
	if (player.blockCD <= 0 && player.attack == false) {
		//3 second cd
		player.blockCD = 3;
		player.block = true;
		//change css
		//toggleBlock(player.shield);
		player.model.css('background-image', player.pBlock);
		//make block false after 1 second
		setTimeout(function() {
			player.block = false;
			//toggleBlock(player.shield);
			if (player.attack == false) {
				neutralCSS(player);
			}
		}, 1000);
		//countdown block cool down
		var id = setInterval(function() {
			player.blockCD--;
			if (player.blockCD <= 0) {
				clearInterval(id);
			}
		}, 1000);
	}
}

// function toggleBlock(player) {
// 	player.toggle(0,'hidden');
// }

// ------------------------------------------ROUND END------------------------------------------ //

function startTimer() {
	$timer.text(timer);
	var id = setInterval(function() {
		timer--;
		$timer.text(timer);
		checkTimer();
		if (timer <=0) {
			clearInterval(id);
		}
	}, 1000);
	return id;
}

function updateStats() {
	//hp
	p1.$hp.text(p1.health);
	p1.$hp.css('width', 5*(p1.health));
	p2.$hp.text(p2.health);
	p2.$hp.css('width', 5*(p2.health));
	//makes it so hp bar shifts right as it shrinks
	p2.$hp.css('left', 698+5*(p2.nHealth-p2.health));
	//combo
	p1.$combo.text(p1.combo);
	p2.$combo.text(p2.combo);
}

function resetGame(p1, p2) {
	//reset position
	p1.position = p1.nPosition;
	p2.position = p2.nPosition;
	neutralCSS(p1);
	neutralCSS(p2);
	clearTimeout(p1.attackLock);
	clearTimeout(p2.attackLock);
	//shift models back
	move(p1, 0);
	move(p2, 0);
	//reset health
	p1.health = p1.nHealth;
	p2.health = p2.nHealth;
	//reset combat mechanisms
	p1.attackCD = p2.attackCD = 0;
	p1.stun = p2.stun = false;
	p1.combo = p2.combo = 0;
	p1.block = p2.block = false;
	p1.blockCD = p2.blockCD = 0;
	p1.attack = p2.attack = false;
	//reset stat changes due to evolution
	p1.attackSpeed = p1.nAttackSpeed;
	p2.attackSpeed = p2.nAttackSpeed;
	p1.damage = p1.nDamage;
	p2.damage = p2.nDamage;
	p1.blockStrength = p1.nBlockStrength;
	p2.blockStrength = p2.nBlockStrength;
	p1.evo1.addClass('hidden');
	p2.evo1.addClass('hidden');
	p1.evo2.addClass('hidden');
	p2.evo2.addClass('hidden');
	// p1.html.removeClass('evo1');
	// p2.html.removeClass('evo1');
	//reset timer
	clearInterval(timerID);
	//start timer and show stats
	timer = 90;
	timerID = startTimer();
	updateStats();
	

	$document.on('keydown', movement);
	$document.on('keyup', combat);
}

//TODO call this function every second

function knockOut(aggressor, defender) {
	if (defender.health <= 0) {
		clearInterval(defender.timerid);
		//remove event listeners
		$document.off('keydown', movement);
		$document.off('keyup', combat);
		//ensure flashing interval is cleared
		//setTimeout(function() {alert(aggressor.name + " KO'd " + defender.name);}, 500);
		//add badge
		addBadge(aggressor);
		aggressor.wins++;
		resetGame(p1, p2);
	}
}

function checkTimer() {
	if ($timer.text() == 0) {
		alert('No one wins the round.');
		//remove event listeners
		$document.off('keydown', movement);
		$document.off('keyup', combat);
		resetGame(p1, p2);
	}
}

function addBadge(winner) {
	winner.wins++;
	if (winner.wins == 1) {
		winner.badge1.css('background-image', "url('img/badge.png')");
	}
	else {
		winner.badge2.css('background-image', "url('img/badge.png')");
		alert(winner.name + ' wins the best of three! The page will now reload.')
		location.reload();
	}
}

// ------------------------------------------ANIMATION------------------------------------------ //

function neutralCSS(player) {
	player.model.css('width', '300px');
	//check if even position
	if (player.position%2 == 0) {
		player.model.css('background-image',player.pNeutral);
	}
	else {
		player.model.css('background-image',player.pWalk);
	}

}
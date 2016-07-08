#Project 1: PokeFighters

###Attack Function

Description: This function deals with all the attack mechanics I have included in the game. It changes the css of the player model, applies combat balance mechanics like stuns and animation locks and calculates damage taken if characters are colliding. I pass in which ever player is attacking and defending so that the logic behind applying the changes I want to make to each player is simple. With the addition of multiple types of attacks, I included the type variable to help with distinguishing which attack is being used.

The first chunk of code deals purely with animating the character models by switching the background-images to the appropriate attack images. Manipulating the z-indexes of the two character models ensured that the attack effects stayed above the player being hit in the z-plane.The most problematic issue I had with the css was dynamically changing the 'left' property of the second player as the background-images changed in size.

The second chunk of code deals with checking for collision and applying damage and stuns while controlling the combo and evolution mechanics. The updateStats function essentially updates the UI with any changes made to player stats after every attack. 

from script.js
```js
function attack(aggressor, defender, type){
    if (checkStatus(aggressor)) { //able to attack

	// -----show animation (change css)----- //
		
		aggressor.model.css('width', '386px');
		if (type == 'strong') { //strong attack
			aggressor.model.css('background-image', aggressor.pAttack);	
		}
		else { //fast attack (sequence value determines which image is used)
			if (aggressor.sequence == 0) {  //animation 1
				aggressor.model.css('background-image', aggressor.pQuickAttack1);
				aggressor.sequence++;
			}
			else { //animation 2
				aggressor.model.css('background-image', aggressor.pQuickAttack2);
				aggressor.sequence--;
			}
		}
		//change z-index to place attack above defender (push attack effects to the top)
		defender.model.css('z-index', 2)
		aggressor.model.css('z-index', 3);
		aggressor.attack = true;
		//necessary shifting of p2 model when attacking (width is changing)
		if (aggressor == p2) {
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
			//reset CSS to neutral/walking image
			neutralCSS(aggressor);
			//reset shifting of p2 model after attacking
			if (aggressor == p2) {
				aggressor.model.css('left', parseInt(aggressor.model.css('left'))+100);
			}
			aggressor.attack = false;
		//timeout duration dependent on attack speed (currently no difference between the two players)
		},timeout*aggressor.attackSpeed);
		setAttackCD(aggressor, timeout);

	//check collision -- damage only calculates on collision -- allows players to attack anywhere on the field

		if (testCollision(aggressor)) {
			if (defender.health) {//check hp of opponent
				if (!defender.block) {//check block
					if (type == 'strong') {//strong
						defender.health -= aggressor.damage;
						multipleHit(aggressor, defender, timeout);//apply damage up to 2 times after initial tick
					}
					else {//fast
						defender.health -= aggressor.qDamage;
						//combo tracking -- only iterate combo if attack is not blocked
						aggressor.combo++;
					}
					//taking damage will reset combo
					defender.combo = 0;
					//hide defender evolution art
					defender.evo1.hide();
					defender.evo2.hide();
					//show attack evolution art
					evolution(aggressor);
					//stun defender if attack isn't blocked
					stun(defender, aggressor.attackSpeed);
					
				}
				else { //damage reduced by 80% when blocking
					if (type == 'strong') {
						defender.health -= aggressor.damage/defender.blockStrength;
						multipleHit(aggressor, defender, timeout);
					}
					else {
						defender.health -= aggressor.qDamage/defender.blockStrength;
					}
				}
				updateStats(); //show changes in hp, block, combo
				if (type != 'strong') { //multipleHit also checks for KO, so 'strong' is being filtered
					knockOut(aggressor, defender);
				}
			}
		}
	}	
}
```

###Multiple Hit Function
Description: This function deals with applying a damage overtime effect for the strong attack. Initially, I had problems figuring out where to place the testCollision function to ensure that collision was still true at any given game tick. I ended up using setInterval with a rate that scales with the attacker's attackspeed to apply the damage overtime effect. This way, collision can be tested each time so that damage is not applied if the defending character moves out of range.

from script.js
```js
function multipleHit(aggressor, defender, time) {
	var counter = 2;
	var id = setInterval(function() {
		if (testCollision(aggressor) && !aggressor.stun) {//check if collision is still true and not flinching
			if (!defender.block){
				defender.health -= aggressor.damage;
			}
			else {
				defender.health -= aggressor.damage/defender.blockStrength;
			}
		}
		counter--;
		updateStats();
		if (counter <= 0) {
			clearInterval(id);
			aggressor.combo++; //add to combo only after last tick
			updateStats();
			knockOut(aggressor, defender); //check KO after attack animation ends
		}
	}, time*aggressor.attackSpeed/3)
}
```
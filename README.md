#PokeFighters

![Image of Squirtle](img/squirtle.png)

##Game Dev Approach:
* All stats are hard coded into objects - so far only two objects (pokemon) exist. More will be added if time permits and then these objects will be placed in an array for organized storage
* All functionality of the game is calculated and managed using the stats of the objects and necessary animations will translate into the DOM.
* So far, the javascript is a mix of native javascript and JQuery but I plan on converting to fully utilize JQuery to ensure browser compatibility.

##Game Mechanics:

###Default stats:
* HP=100
* BaseDamage=10
* AttackSpeed=10
* BlockStrength=10


##Attack:
###P1 : (1)
###P2 : (.)
* Players must be colliding to attack. The player DPS is based on basedamage and attackspeed.

####Combo:

* Combo resets after 3 seconds. This countdown will refresh with each hit.
* Reaching a 3rd consecutive hit will cause the first evolution -- attack speed doubles
* TODO: Reaching a 6th consecutive hit will cause the second evolution -- damage doubles
* Evolution reverts after 5 seconds.



##Block:
###P1 : (2)
###P2 : (/)

* When blocking, a player will receive reduced damage (based on blockstrength) and will not suffer from the stun effect.

* However, blocking has a cooldown of 3 seconds. Use your blocks wisely.

####Stun:

* When hit, a player will be stunned for .25 seconds (cannot retaliate in that time.) However, the player can still block.




##Planned Features (some may not be implemented in final product):

###Dan's Ideas:

- [ ] combo 6 - evolve to final form (wartortle -> blastoise)

###Combat:

- [ ] Separate attacks into high, normal and low -- probably implement crouching ability as well (attack while crouching to attack low and dodge high attacks at the same time)

    * high attacks -- vulnerable spot so more damage

    * low attacks -- faster, but less damage

###Movement:

- [ ] Jumping(???)

- [ ] dashing forward and backward to quickly engage/disengage
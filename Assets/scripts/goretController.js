#pragma strict
var moveSpeed : float = 1000.0;
var bounceTarget : float;
var bounceCurrent : float;
var things : Array;
var russianTaunt : Array;
public static var bouncyCount:int;
var i : int;
var timecount : int;
var bounceWaiting:boolean;
var isFalling : boolean;
var hasRussians : boolean;
var idle : boolean;
var startTime : float;
var audioCatTouchSources : Component[];


public var plane : Transform;
public var bouncyCam : Transform;
public var audioRussian : Transform;
public var audioCatTouch : Transform;
public var russian : Transform;
public var catFall : GUIText;
public var bouncyText : GUIText;
public var russianText : GUIText;
public var BOUNCE : GUIText;
public var russianCounterText : GUIText;
public var russianCounterText_Text : GUITexture;
public var airBounce : GUITexture;
public var catLight1 : GameObject;
var catLight1_light : Light;


public static var xMove:float;
public static var zMove:float;

function Start () {
	catLight1_light = catLight1.GetComponent("Light");
	catLight1_light.enabled = false;
	audioCatTouchSources = audioCatTouch.GetComponents(AudioSource);
	bounceWaiting = false;
	airBounce.enabled = false;
	xMove = 0;
	zMove = 0;
	bouncyCount = 0;
	BOUNCE.enabled = false;
	catFall.enabled = false;
	isFalling = false;
	hasRussians = false;
	idle = false;
	catFall.text = "CAT IS FALL";
	things = ["BOuNCE", "b0UNCe", "b0uNc3", "BOUNCE", "bOUncE", "BOONC3", "B00nce", "bouNCE", "bOunCe"];
	russianTaunt = ["TOO SLOW !", "LAZY CAT !", "CAT SLOW !", "NO MOVING CAT !", "CAT DEAD ?", "CAT NO BOUNCE ?", "WHY U NO BOUNCE ?", "NO BOUNCE ?!"];
}

function Update () {
	// cat control
	//xMove = Input.GetAxis("Horizontal") * moveSpeed;
	//zMove = Input.GetAxis("Vertical") * moveSpeed;
	/*xMove = Input.acceleration.x * moveSpeed;
	zMove = Input.acceleration.y * moveSpeed;
	if (Input.touchCount > 1 && TouchPhase == "ended")
	{
		rigidbody.AddForce(Random.value*100,Random.value*100,Random.value*100);
	}*/
	
	rigidbody.AddForce(xMove,0,zMove);
	
	// ui effects
	BOUNCE.fontSize = Mathf.Lerp(bounceCurrent, bounceTarget, Time.time);
	
	// boundaries
	if (transform.position.y < -2 && isFalling == false)
	{
		HasFall();
	}
	
	// airBounce
	if (transform.position.y > 20)
	{
		airBounce.enabled = true;
		if(!bounceWaiting) waitForBounce();
	}
	else
	{
		airBounce.enabled = false;
	}
	
	
	// too slow = russians !!
	if (!idle)
	{
		if ((rigidbody.velocity.magnitude < 1) && hasRussians == false)
		{
			idle = true;
			timecount = 5;
			russianCounterText.enabled = true;
			russianCounterText_Text.enabled = true;
			russianCounterText.text = timecount.ToString();
			startTime = Time.time;
		}
	}
	else
	{
		if (hasRussians == false)
		{
			if ((rigidbody.velocity.magnitude >= 1))
			{
				idle = false;
				russianCounterText.enabled = false;
				russianCounterText_Text.enabled = false;		
			}
			else
			{
				timecount= 6 - (Time.time - startTime);
				russianCounterText.text = timecount.ToString();
				if (timecount == 0)
				{
					hasRussians = true;
					TextRussians();
					russianCounterText.enabled = false;
					russianCounterText_Text.enabled = false;		
				}
			}
		}
	}
}
function waitForBounce()
{
    	(plane.gameObject.GetComponent("AudioSource") as AudioSource).Play();
    	(plane.gameObject.GetComponent("AudioSource") as AudioSource).pitch = Random.value/2+0.75;
	bounceWaiting = true;
	Bounce();
	yield WaitForSeconds(.5);
	bounceWaiting = false;
	
}

function OnCollisionEnter(collider : Collision)
{
	if (collider.gameObject.name == "Plane")
	{
		Bounce();
    	(collider.gameObject.GetComponent("AudioSource") as AudioSource).Play();
    	(collider.gameObject.GetComponent("AudioSource") as AudioSource).pitch = Random.value/2+0.75;
	}
}

function Bounce ()
{ 
	bouncyCount++;
	bouncyText.text = bouncyCount+"";
	bouncyText.fontSize = 40;
	//bouncyCam.rotation = Quaternion.Euler(0, 45, Random.value*10-5);
	BOUNCE.enabled = true;
	BOUNCE.text = things[Random.RandomRange(0,things.length)];
	bounceCurrent = BOUNCE.fontSize;
	bounceTarget = Random.value*100+50;
	yield WaitForSeconds(.5);
	bouncyText.fontSize = 30;
	BOUNCE.enabled = false;
}

function HasFall()
{
	isFalling = true;
	catFall.enabled = true;
	catFall.fontSize = Random.value*100+50;
	yield WaitForSeconds(1);
	catFall.fontSize = Random.value*100+50;
	yield WaitForSeconds(1);
	catFall.fontSize = Random.value*300+50;
	yield WaitForSeconds(.5);
	catFall.fontSize = Random.value*200+50;
	yield WaitForSeconds(.5);
	catFall.fontSize = Random.value*200+50;
	yield WaitForSeconds(.3);
	catFall.enabled = false;
	rigidbody.velocity = Vector3(0,0,0);
	transform.position = Vector3(0,10,0);
	transform.rotation = Quaternion.Euler(0, 0, 0);
	isFalling = false;
	hasRussians = true;
	rigidbody.useGravity = false;
	yield WaitForSeconds(1);
	rigidbody.useGravity = true;
	hasRussians = false;
}
function SpawnRussians()
{
	(audioRussian.gameObject.GetComponent("AudioSource") as AudioSource).Play();
	for (var i : int = 0;i < 50; i++) {
		Instantiate (russian, Vector3(transform.position.x+Random.value*10-5, transform.position.y+Random.value*10-5, transform.position.z+Random.value*10-5), Quaternion.identity);
	}
	yield WaitForSeconds(10);
	DestroyRussians();
	hasRussians = false;
}
function DestroyRussians()
{
	var clones = GameObject.FindGameObjectsWithTag("russian");
    for (var clone in clones){
        Destroy(clone);
    }
}
function TextRussians()
{
	russianText.enabled = true;
	russianText.fontSize = 80;
	russianText.text = "TOO SLOW !";
	russianText.text = russianTaunt[Random.RandomRange(0,russianTaunt.length)];
	yield WaitForSeconds(2);
	SpawnRussians();
	russianText.fontSize = 120;
	russianText.text = "RUSSIANS !";
	yield WaitForSeconds(2);
	russianText.enabled = false;
}
function OnMouseDown()
{
	catTouch();
}
function catTouch()
{
	catLight1_light.enabled = true;
	yield WaitForSeconds(0.15);
	catLight1_light.enabled = false;
	(audioCatTouchSources[Random.RandomRange(0,audioCatTouchSources.length)] as AudioSource).Play();
}



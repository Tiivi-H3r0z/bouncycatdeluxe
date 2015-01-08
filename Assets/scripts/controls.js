#pragma strict
public var arrowLeft: GUITexture;
public var arrowRight: GUITexture;
public var arrowUp: GUITexture;
public var arrowDown: GUITexture;

var thisXmove:float = 0;
var thisZmove:float = 0;

var speed:int = 70;

var top : Rect;
var bottom : Rect;
var right : Rect;
var left : Rect;

function Start () {
	top = Rect(Screen.width/3, (Screen.height/3)*2, Screen.width/3, Screen.height / 3);
    bottom = Rect(Screen.width/3, 0, Screen.width / 3, Screen.height / 3);
    right = Rect((Screen.width / 3)*2, Screen.height/3, Screen.width / 3, Screen.height / 3);
    left = Rect(0, Screen.height/3, Screen.width / 3, Screen.height / 3);
	arrowLeft.color = new Color(1,1,1, 0.1);
	arrowRight.color = new Color(1,1,1, 0.1);
	arrowUp.color = new Color(1,1,1, 0.1);
	arrowDown.color = new Color(1,1,1, 0.1);
	/*arrowLeft.enabled = false;
	arrowRight.enabled = false;
	arrowUp.enabled = false;
	arrowDown.enabled = false;*/
}

function Update () {
	// touch controls
if (Input.touchCount > 0)
        {
            var touchPos = Input.GetTouch(0).position;
            if (top.Contains(touchPos))
            {
                arrowUp.color = new Color(1,1,1, 1);
                thisZmove = speed;
            }
            if (bottom.Contains(touchPos))
            {
                arrowDown.color = new Color(1,1,1, 1);
                thisZmove = -speed;
            }
            if (right.Contains(touchPos))
            {
                arrowRight.color = new Color(1,1,1, 1);
                thisXmove = speed;
            }  
            if (left.Contains(touchPos))
            {
                arrowLeft.color = new Color(1,1,1, 1);
                thisXmove = -speed;
            }
        }
else {
	thisXmove = 0;
	thisZmove = 0;
	arrowLeft.color = new Color(1,1,1, 0.1);
	arrowRight.color = new Color(1,1,1, 0.1);
	arrowUp.color = new Color(1,1,1, 0.1);
	arrowDown.color = new Color(1,1,1, 0.1);
}
	
	// accelerometer
	/*if (Input.acceleration.y <= -0.3){
		arrowDown.enabled = true;
		thisZmove = -speed;
	}
	if (Input.acceleration.y >= 0.1){
		arrowUp.enabled = true;
		thisZmove = speed;
	}
	if (Input.acceleration.x <= -0.1){
		arrowLeft.enabled = true;
		thisXmove = -speed;
	}
	if (Input.acceleration.x >= 0.1){
		arrowRight.enabled = true;
		thisXmove = speed;
	}
	if (Input.acceleration.x > -0.1 && Input.acceleration.x < 0.1)
	{
		thisXmove = 0;	
		arrowRight.enabled = false;
		arrowLeft.enabled = false;
	}
	if (Input.acceleration.y > -0.3 && Input.acceleration.y < 0.1)
	{
		thisZmove = 0;	
		arrowDown.enabled = false;
		arrowUp.enabled = false;
	}*/
	
	goretController.xMove = thisXmove;
	goretController.zMove = thisZmove;
}
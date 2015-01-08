#pragma strict

var camPosition:Vector3;

function Start () {
	camPosition = transform.position;
}

function Update () {
	transform.position = camPosition + Vector3(Mathf.PingPong(Time.time, 10)/37, 0, Mathf.PingPong(Time.time, 4)/64);
}
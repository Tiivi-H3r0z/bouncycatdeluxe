#pragma strict

function Start () {
	Screen.sleepTimeout = SleepTimeout.NeverSleep;
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape)) { Application.Quit(); }
	if (Input.GetKeyDown(KeyCode.Menu)) { Application.LoadLevel(0); }
}
#pragma strict

public var keepgoing50:GUITexture;
public var keepgoing20:GUITexture;
public var audioMain:Transform;
public var audioMeow:Transform;

function Start () {
	keepgoing50.enabled = false;
	keepgoing20.enabled = false;
}

function Update () {
	if (goretController.bouncyCount == 50)
	{
		goretController.bouncyCount++;
		keepGoing50();
	}
	if (goretController.bouncyCount == 20)
	{
		goretController.bouncyCount++;
		keepGoing20();
	}	
}

function keepGoing20()
{
	(audioMeow.gameObject.GetComponent("AudioSource") as AudioSource).Play();
	var audioTime:float = (audioMain.gameObject.GetComponent("AudioSource") as AudioSource).time;
	(audioMain.gameObject.GetComponent("AudioSource") as AudioSource).Pause();
	Time.timeScale = 0.25;
	keepgoing20.enabled = true;
	yield WaitForSeconds(0.75);
	(audioMain.gameObject.GetComponent("AudioSource") as AudioSource).time = audioTime;
	(audioMain.gameObject.GetComponent("AudioSource") as AudioSource).Play();
	Time.timeScale = 2;
	keepgoing20.enabled = false;
}

function keepGoing50()
{
	(audioMeow.gameObject.GetComponent("AudioSource") as AudioSource).Play();
	var audioTime:float = (audioMain.gameObject.GetComponent("AudioSource") as AudioSource).time;
	(audioMain.gameObject.GetComponent("AudioSource") as AudioSource).Pause();
	Time.timeScale = 0.25;
	keepgoing50.enabled = true;
	yield WaitForSeconds(0.75);
	(audioMain.gameObject.GetComponent("AudioSource") as AudioSource).time = audioTime;
	(audioMain.gameObject.GetComponent("AudioSource") as AudioSource).Play();
	Time.timeScale = 2;
	keepgoing50.enabled = false;
}




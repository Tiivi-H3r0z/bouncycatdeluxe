#pragma strict

function Start() {
	renderer.material.color = Color.yellow;
}

function OnMouseOver()
{
	renderer.material.color = Color.white;
}

function OnMouseExit()
{
	renderer.material.color = Color.yellow;
}

function OnMouseUp()
{
	Application.LoadLevel(1);
}
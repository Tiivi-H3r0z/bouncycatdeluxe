#pragma strict
#pragma strict

function Start() {
	renderer.material.color = Color.grey;
}

function OnMouseOver()
{
	renderer.material.color = Color.white;
}

function OnMouseExit()
{
	renderer.material.color = Color.grey;
}

function OnMouseUp()
{
	Application.LoadLevel(0);
}
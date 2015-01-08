#pragma strict
#pragma strict

function Start() {
	renderer.material.color = Color.green;
}

function OnMouseOver()
{
	renderer.material.color = Color.white;
}

function OnMouseExit()
{
	renderer.material.color = Color.green;
}

function OnMouseUp()
{
	Application.LoadLevel(2);
}
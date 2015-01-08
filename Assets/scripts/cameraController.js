#pragma strict

public var aSuivre:Transform;
var offset:Vector3;

function Start () {
	offset = transform.position;
}

function Update () {
	transform.position = aSuivre.position + offset;
}
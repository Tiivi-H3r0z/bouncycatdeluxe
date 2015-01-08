using UnityEngine;
using System.Collections;
/// <summary>
/// GUI hover controls.
/// Forces an audio source to the instance
/// plays an audio object on mouse up 
/// changes colour on mouse over and exit
/// loads or plays based on textmesh being clicked on the screen
/// 
/// IMPORTANT!!!
/// YOU MUST MAKE A TEXT MESH AND THEN APPLY THAT TO THE SLOT IN YOUR SCRIPT FOUND THROUGH INPECTOR.
/// IT IS ALSO ADIVASBLE TO MAKE THREE MATERIALS(DIFFUSE FINE) AND CHANGE EACH COLOR.
/// THE FADED OT MATERIAL JUST NEEDS TO BE SEE THOUGH OR HAVE NO TEXTURE OR SOMETHING, SEE UNITY MOBILE SHADERS->TRANSPARENT IN MATERIAL TYPE DROP DOWN
/// </summary>
[RequireComponent(typeof(AudioSource))]
public class GUIHoverControls : MonoBehaviour 
{
	public int levelToLoad; 
	public bool isQuitButton = false;
	public float wait = 5.0f;
	public Material mat1;
	public Material mat2;
	public Material mat3;
	public Material fadedOutMat;
	
	
	public TextMesh txtMesh;
	// Use this for initialization
	private bool isClicked = false;
	/// <summary>
	/// Raises the mouse over event.
	/// </summary>
	void OnMouseOver()
	{
		/// change the material when hovering over
		ChangeColor(mat2);
			
		/// if leftmouse button cllicked
		if(Input.GetMouseButtonUp(0))
		{
			/// change mat to signify click occurence
			ChangeColor(mat3);
			/// if this is a wuit button 
			if(isQuitButton)
			{	
				/// exit game if in a build (does not work in editor)
				Application.Quit();
			}
			else /// this is a button to load a level
			{
				
				Debug.Log ("loading level in 5 secs");
				/// specifics hack to check if button is start game to allow button audio to yield before starting the level
				if(txtMesh.text == "Scroll Over Me")
				{
					/// GUI.Label (new Rect(Screen.width/2,Screen.height /3,100,40), "Click to for Intro");
					isClicked = true;
					Debug.Log (isClicked);
					//you could do something here
				}
				else if(txtMesh.text == "Click Me To Load A Level")
				{
					isClicked = true;
					Debug.Log (isClicked);
					StartCoroutine(LoadALevel());
				}
				else /// we checked and it wasnt the start button
				{	
					isClicked = false;
					Debug.Log (isClicked);
					/// StartCoroutine(LoadChosenLevel());
				}
				
			}
		}
	}
	
	/// <summary>
	/// Raises the mouse exit event.
	/// when the mouse exits the textmesh`s collision area
	/// </summary>
	void OnMouseExit()
	{
		/// return colour to normal white faded alpha
		ChangeColor (mat1);	
	}
	
	/// <summary>
	/// Changes the color.
	/// change colour method taking a material in as the argument
	/// </summary>
	/// <param name='mat'>
	/// Mat.
	/// </param>/ <summary>
	/// Changes the color.
	/// </summary>
	/// <param name='mat'>
	/// Mat.
	/// </param>/ <summary>
	/// Changes the color.
	/// </summary>
	/// <param name='mat'>
	/// Mat.
	/// </param>//
	void ChangeColor(Material mat)
	{
		/// if not mat1 or mat 2
		if(mat != fadedOutMat && mat != mat2 && mat != mat3)
		{
			/// mat must be mat 1
			mat = mat1;
		}
		else if(mat != fadedOutMat && mat != mat1 && mat!= mat3)
		{
			/// mat must be mat 2
			mat = mat2;
		}
		else if(mat != fadedOutMat && mat!= mat1 && mat!= mat2)
		{
			/// mat must be mat 3
			mat = mat3;
		}
		else
		{
			/// mat must be mat 4
			mat = fadedOutMat;
		}
		/// assign new material to the textMesh being operated on
		txtMesh.renderer.material = mat;
		
	}	
	/// <summary>
	/// Loads a level based on a mouse input to start game
	/// </summary>
	/// <returns>
	/// The A level.
	/// </returns>
	IEnumerator LoadALevel()
	{
		if(isClicked)
		{
			
			ChangeColor (fadedOutMat); /// txtMesh.renderer.material.color.a = new Color(txtMesh.renderer.material.color.r,txtMesh.renderer.color.g,txtMesh.renderer.color.b,0.0f);
		}
		yield 
			return
				new WaitForSeconds(wait);
				 Application.LoadLevel(levelToLoad);
	}
}/// end class

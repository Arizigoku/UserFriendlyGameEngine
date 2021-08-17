function awake(){
	gameObjects.push(new Sprite());
	gameObjects.push(new Sprite());
	gameObjects[0].image=loadImage("Game/737.png");
	gameObjects[1].image=loadImage("Game/747.png");
}
function start(){
	gameObjects[0].tag="AA";
	gameObjects[0].transform.position=new Vec2(0,0);
	gameObjects[0].pivot=new Vec2(0.5,0.5);
	gameObjects[0].transform.angle=45;
	gameObjects[0].transform.scale=new Vec2(1/(12068/100),1/(12068/100));
	gameObjects[1].tag="BB";
	gameObjects[1].transform.position=new Vec2(325,125);
	gameObjects[1].pivot=new Vec2(0.5,0.5);
	gameObjects[1].transform.scale=new Vec2(1/(12068/100),1/(12068/100));
	gameObjects[1].transform.angle=45;
	gameObjects[1].transform.layer=1;
}
function mainLoop(){
	background(0);
	Camera.draw(mainCamera);
	gameObjects[1].transform.angle+=0.5;
}
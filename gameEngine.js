class Vec2{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	add(b){
		a = this;
		a.x+=b.x;
		a.y+=b.y;
		return a;
	}
	sub(b){
		a = this;
		a.x-=b.x;
		a.y-=b.y;
		return a;
	}
	mul(b){
		a = this;
		a.x*=b;
		a.y*=b;
		return a;
	}
	div(b){
		a = this;
		a.x/=b;
		a.y/=b;
		return a;
	}
	distance(b){
		return sqrt(pow(b.x-this.x,2) + pow(b.y-this.y,2))
	}
}
class GameObject{
	tag="";
	transform=new Transform(new Vec2(0,0),new Vec2(1,1),0,1);
	components=[];
	constructor(drawable){
		this.drawable=drawable;
	}
	draw(camera){
		this.drawable.draw(camera);
	}
}
class Rect{
	constructor(position,scale){
		this.position=position;
		this.scale=scale;
	}
}
class Transform extends Rect{
	constructor(position,scale,angle,layer){
		super(position, scale);
		this.angle=angle;
		this.layer=layer;
	}
	translate(b){
		position.add(b);
	}
	rotate(b){
		this.angle+=b;
	}
}
class Line extends GameObject{
	endPosition=new Vec2(0,0);
	
	draw(camera){
		strokeWeight(1);
		localPosition=this.endPosition.sub(this.transform.position);
		translate(this.transform.position.x-camera.position.x+camera.width/2,this.transform.position.y-camera.position.y+camera.height/2);
		translate(-this.pivot.x*this.transform.scale.x,-this.pivot.y*this.transform.scale.y);
		line(0,0,this.endPosition.x,this.endPosition.y);
		scale(this.transform.scale.x,this.transform.scale.y);
	}
}
class Square extends GameObject{
	size=new Vec2(0,0);
	pivot=new Vec2(0,0);
	draw(camera){
		translate(this.transform.position.x-camera.position.x+camera.width/2,this.transform.position.y-camera.position.y+camera.height/2);
		rotate(radians(this.transform.angle));
		translate(-this.size.x*this.pivot.x*this.transform.scale.x*camera.scale,-this.size.y*this.pivot.y*this.transform.scale.y*camera.scale);
		scale(this.transform.scale.x,this.transform.scale.y);
		scale(camera.scale,camera.scale);
		rect(0,0,this.size.x,this.size.y);
	}
}
class Sprite extends GameObject{
	pivot=new Vec2(0,0);
	size=new Vec2(0,0);
	image;
	draw(camera){
		translate(this.transform.position.x-camera.position.x+camera.width/2,this.transform.position.y-camera.position.y+camera.height/2);
		rotate(radians(this.transform.angle));
		translate(-this.pivot.x*this.image.width*this.transform.scale.x*camera.scale,-this.pivot.y*this.image.height*this.transform.scale.y*camera.scale);
		scale(this.transform.scale.x,this.transform.scale.y);
		scale(camera.scale,camera.scale);
		image(this.image,0,0,this.image.width,this.image.height);
	}
}
class Camera{
	position=new Vec2(0,0);
	scale=1;
	width=0;
	height=0;
	constructor(width,height){
		this.width=width;
		this.height=height;
	}
	static draw(camera){
		let l=gameObjects; 
		l.sort(function(a,b){
			return a.transform.layer-b.transform.layer;
		});
		l.forEach(function(value){
			push();
			value.draw(camera);
			pop()
		});
	}
}
class Component{
	constructor(component){
		this.component=component;
	}
	start(){
		this.component.start();
	}
	update(){
		this.component.update();
	}
}
let gameObjects=[];
let mainCamera=new Camera(1600,900);
let img0;
function preload(){
	awake();

}
function setup(){
	createCanvas(1600,900);
	
	start();
}
function draw(){
	mainLoop();
}
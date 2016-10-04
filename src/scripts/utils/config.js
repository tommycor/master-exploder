import threejs from "three-js";
const THREE = threejs();


var config = {
	
	canvas: {
		element : document.getElementById('container'),
		color : 0x666666
	},
	
	camera: {
		position : new THREE.Vector3(0, 0, 50),
		target : new THREE.Vector3(0, 10, 0)
	},
	
	lights: {
		ambient: {
			color : 0xffffff
		} 
	},
	
}


module.exports = config;
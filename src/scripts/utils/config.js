import threejs from "three-js";
const THREE = threejs();


var config = {
	
	canvas: {
		element : document.getElementById('container'),
		color : 0x333333
	},
	
	camera: {
		position : new THREE.Vector3(0, 0, 500),
		target : new THREE.Vector3(0, 0, 0)
	},

	axisHelper: true,
	
	lights: {
		ambient: {
			color : 0xffffff
		} 
	},

	particles: {
		count: 100000,
		maxExplosions: 50
	},

	drawField: {
		maxHeight: 400,
		maxWidth: 400,
		maxDepth: 20,
		mitigator: .3
	},

	plane: {
		width: 500,
		height: 500,
		wireframe: true,

	}
	
}


module.exports = config;
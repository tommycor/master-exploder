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

	axisHelper: false,
	
	lights: {
		ambient: {
			color : 0xffffff
		} 
	},

	particles: {
		count: 100000,
		maxExplosions: 100
	},

	drawField: {
		maxHeight: 600,
		maxWidth: 600,
		maxDepth: 200,
		mitigator: .3
	},

	plane: {
		width: 500,
		height: 500,
		wireframe: true,
		opacity: 0,
	}
	
}


module.exports = config;
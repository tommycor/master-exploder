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
		count: 10000
	},

	drawField: {
		maxHeight: 400,
		maxWidth: 400,
		maxDepth: 500,
		mitigator: .3
	}
	
}


module.exports = config;
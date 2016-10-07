import threejs from "three-js";
const THREE = threejs();

import config 	from '../utils/config';

module.exports = {

	init: function() {

		this.geometry = null;
		this.material = null;
		this.mesh = null;

		this.geometry = new THREE.PlaneGeometry( config.plane.width, config.plane.height, 1, 1 );
		this.material = new THREE.MeshBasicMaterial( {
			wireframe: config.plane.wireframe,
		});
		this.mesh = new THREE.Mesh( this.geometry, this.material );

		return this.mesh;
	}

};
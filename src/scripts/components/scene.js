import threejs from "three-js";
const THREE = threejs();

import config 	from '../utils/config';
import raf 		from '../utils/raf';

module.exports = {

	init: function() {

		this.render = this.render.bind(this);

		//// INIT
		this.scene = new THREE.Scene();
		this.container = config.canvas.element;

		this.camera = new THREE.PerspectiveCamera(45, this.ratio, 15, 2000);
	    this.camera.position.x = config.camera.position.x;
	    this.camera.position.y = config.camera.position.y;
	    this.camera.position.z = config.camera.position.z;
	    this.camera.lookAt(config.camera.target);

		if ( config.axisHelper ) {
	    	this.axisHelper =  new THREE.AxisHelper( 5 );
			this.scene.add( this.axisHelper );
		}

		//// RENDERER
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(config.canvas.color, 1.0);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		//// AMBIANT LIGHT
		this.ambient = new THREE.AmbientLight( config.lights.ambient.color );

		//// ADD OBJECTS TO SCENE
		this.scene.add( this.ambient );

		//// ADD CANVAS TO DOM
		this.container.appendChild( this.renderer.domElement );

		//// REGIST RENDERER
		raf.register(this.render);
		raf.start();
	},

	render: function() {

		this.renderer.render(this.scene, this.camera);

	}

};
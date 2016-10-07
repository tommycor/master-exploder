import threejs from "three-js";
const THREE = threejs();

import config 	from '../utils/config';
import raf 		from '../utils/raf';

import plane 		from './planeMouseDetector.js';

module.exports = {

	init: function() {

		this.render = this.render.bind(this);
		this.onClick = this.onClick.bind(this);
		this.clock = new THREE.Clock()

		this.plane = null;
		this.explosionsPos = [];
		this.explosionsTime = [];

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

		this.createParticles();

		//// REGIST RENDERER
		raf.register( this.render );
		raf.start();

		window.addEventListener( 'click', this.onClick );
	},

	createParticles: function() {
		this.uniforms = {
			map: { type: 't', value: THREE.ImageUtils.loadTexture("./assets/medias/smoke.png") },
			explosionsTime: { type: 'fv1', value: [] },
			explosionsTime: { type: 'v2v', value: [] }
		}
		this.geometry = new THREE.BufferGeometry();
		this.vertices = new Float32Array( config.particles.count * 3 );
		this.sizes = new Float32Array( config.particles.count );

		let maxWidth  = config.drawField.maxWidth;
		let maxHeight = config.drawField.maxHeight;
		let maxDepth = config.drawField.maxDepth;

		let stepX = maxWidth / config.particles.count;
		let stepY = maxHeight / config.particles.count;
		let stepZ = maxDepth / config.particles.count;

		for( let i = 0 ; i < config.particles.count ; i++ ) {

			let j = i - i * config.drawField.mitigator;

			let width  = maxWidth - stepX * j;
			let height = maxWidth - stepY * j;
			let depth  = maxDepth - stepY * j;

			let pX = Math.random() * ( width ) - width * .5;
			let pY = Math.random() * ( height ) - height * .5;
			let pZ = Math.random() * ( depth ) - depth * .5;

			this.vertices[i * 3] = pX;
			this.vertices[i * 3 + 1] = pY;
			this.vertices[i * 3 + 2] = pZ;

			this.sizes[ i ] = Math.random() * 5;
		}

		this.geometry.addAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) );

		this.geometry.addAttribute( 'size', new THREE.BufferAttribute( this.sizes, 1 ) );

		this.material = new THREE.ShaderMaterial( {
			uniforms: this.uniforms,
			transparent: true,
			vertexShader: require('../shaders/particles.vertex.glsl'),
			fragmentShader: require('../shaders/particles.fragment.glsl')
		});

		this.particleSystem = new THREE.Points( this.geometry, this.material );

		this.scene.add(this.particleSystem);


		this.plane = plane.init();

		this.scene.add( this.plane );
	},

	onClick: function( event ) {
		this.explosionsPos.push( new THREE.Vector2( event.clientX, event.clientY ) );

		this.explosionsTime.push( 0 );
	},

	resize: function() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);		
	},

	render: function() {
		let delta = this.clock.getDelta();

		for( let i = 0 ; i < this.explosionsTime.length ; i++ ) {
			this.explosionsTime[i] += delta;
		}

		this.uniforms.explosionsTime = this.explosionsTime;
		this.uniforms.explosionsPos = this.explosionsPos;

		this.renderer.render(this.scene, this.camera);
	}

};
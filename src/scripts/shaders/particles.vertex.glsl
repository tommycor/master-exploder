#define MAX_EXP 5
#define MAX_DIST 50.

uniform float explosionsTime[ 5 ];
uniform vec2 explosionsPos[ 5 ];

attribute float size;

varying vec2 vUv;
varying float influence;


void main() {

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	vUv = uv;
	influence = .0;

	for( int i = 0 ; i < MAX_EXP ; i++ ) {

		float dist = distance( vec3( explosionsPos[i], .0 ), position );

		if( dist <= MAX_DIST ) {
			influence = 1.0;
		}
	}

	gl_PointSize = size * ( 300. / - mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;
}
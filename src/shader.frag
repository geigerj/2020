precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D displacement;
uniform sampler2D horror;

void main() {
  // invert y axis to match source axis orientation
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  
  float displacementSample =  
    0.15 * texture2D(displacement, vec2(uv.y, uv.x)).r - 0.03;
  
  vec4 color = vec4(
    texture2D(horror, uv + displacementSample).r,
    texture2D(horror, uv + displacementSample).g,
    texture2D(horror, uv + displacementSample).b,
    1);
                            
  // ouput
  gl_FragColor = color;
  // gl_FragColor = texture2D(displacement, uv);
}
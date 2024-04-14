export const rayVertexShader = `
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    uniform float uTime;
    
    void main() {
      vUv = uv;
  
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
      float waveFrequency = 5.0; 
      float waveAmplitude = 0.15; 
      float waveSpeed = 1.0;
      float wave1 = sin(modelPosition.x * waveFrequency + uTime * waveSpeed) * waveAmplitude;
      float wave2 = sin(modelPosition.y * waveFrequency + uTime * waveSpeed) * waveAmplitude;
  
      modelPosition.z += (wave1 + wave2);
  
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `;

export const rayFragmentShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    uniform sampler2D uTexture;
    void main() { 
      vec2 newUV = vUv;
      vec4 tt = texture2D(uTexture, vUv);
  
      gl_FragColor = vec4(vUv,0.,1.);
      float fade = smoothstep(0.1,0.9,abs(vUv.y));
      gl_FragColor = vec4(vWorldPosition,1.);
      gl_FragColor = vec4(tt.rgb,1.);
      gl_FragColor = vec4(vec3(tt),tt*0.7*fade);
    }`;

export const backgroundVertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
  `;

export const backgroundFragmentShader = `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main() { 
      vec2 newUV = vUv;
      vec4 tt = texture2D(uTexture, vUv);
      gl_FragColor = vec4(vec3(tt),tt*0.3);
    }`;

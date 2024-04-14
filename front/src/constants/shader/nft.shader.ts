export const nftVertexShader = `
    uniform float uTime;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;

    float random2D(vec2 value)
    {
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      float glitchTime = uTime - modelPosition.y;
      float glitchStrength = sin(glitchTime) + sin(glitchTime * 2.34) +  sin(glitchTime * 5.67);
      glitchStrength /= 3.0;
      glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
      glitchStrength *= 0.15;
      modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
      modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
      vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
      vPosition = modelPosition.xyz;
      vNormal = modelNormal.xyz;
    }
  `;

export const nftFragmentShader = `
    uniform float uTime;
    uniform sampler2D uTexture;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() { 
      vec2 newUV = vUv;
      vec4 tt = texture2D(uTexture, vUv);
      vec3 normal = normalize(vNormal);

      float stripes = mod((vPosition.y - uTime * 0.1) * 20.0, 1.0);
      stripes = pow(stripes, 1.0);

      vec3 viewDirection = normalize(vPosition - cameraPosition);
      float fresnel = dot(viewDirection, normal) + 1.0;
      fresnel = pow(fresnel, 0.0);

      float holographic = stripes * fresnel;
      holographic += fresnel;

      gl_FragColor = vec4(vec3(tt), holographic);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`;

import React, { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';

interface FaceCustomization {
  faceColor: string;
  eyeStyle: 'round' | 'oval' | 'almond';
  eyeColor: string;
  eyeSize: 'small' | 'medium' | 'large';
  mouthStyle: 'smile' | 'neutral' | 'grin' | 'subtle';
  mouthColor: string;
  hairStyle: 'none' | 'short' | 'medium' | 'long';
  hairColor: string;
}

function Face({ customization }: { customization: FaceCustomization }) {
  const eyeSizes = {
    small: 'w-4 h-3',
    medium: 'w-6 h-4',
    large: 'w-8 h-5'
  };

  const eyeShapes = {
    round: 'rounded-full',
    oval: 'rounded-full scale-x-125',
    almond: 'rounded-full scale-x-150 rotate-[15deg]'
  };

  const hairStyles = {
    none: null,
    short: (
      <div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-52 h-20"
        style={{ backgroundColor: customization.hairColor }}
      >
        <div className="absolute bottom-0 w-full h-full rounded-t-[80px]"></div>
      </div>
    ),
    medium: (
      <div 
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-56 h-32"
        style={{ backgroundColor: customization.hairColor }}
      >
        <div className="absolute bottom-0 w-full h-full rounded-t-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-10 h-24 rounded-bl-[30px]"></div>
        <div className="absolute bottom-0 right-0 w-10 h-24 rounded-br-[30px]"></div>
      </div>
    ),
    long: (
      <div 
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-56 h-48"
        style={{ backgroundColor: customization.hairColor }}
      >
        <div className="absolute bottom-0 w-full h-full rounded-t-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-14 h-40 rounded-bl-[50px]"></div>
        <div className="absolute bottom-0 right-0 w-14 h-40 rounded-br-[50px]"></div>
      </div>
    )
  };

  const mouthStyles = {
    smile: (
      <div className="absolute w-20 h-10 overflow-hidden" style={{ left: '50%', top: '60%', transform: 'translate(-50%, -20%)' }}>
        <div className="w-20 h-20 rounded-full" style={{ border: `4px solid ${customization.mouthColor}` }}></div>
      </div>
    ),
    neutral: (
      <div 
        className="absolute w-16 h-1 rounded-full" 
        style={{ 
          left: '50%', 
          top: '65%', 
          transform: 'translate(-50%, -50%)',
          backgroundColor: customization.mouthColor
        }}
      ></div>
    ),
    grin: (
      <div className="absolute w-24 h-12 overflow-hidden" style={{ left: '50%', top: '60%', transform: 'translate(-50%, -20%)' }}>
        <div className="w-24 h-24 rounded-full" style={{ border: `5px solid ${customization.mouthColor}` }}></div>
      </div>
    ),
    subtle: (
      <div className="absolute w-16 h-8 overflow-hidden" style={{ left: '50%', top: '62%', transform: 'translate(-50%, -20%)' }}>
        <div className="w-16 h-16 rounded-full" style={{ border: `3px solid ${customization.mouthColor}` }}></div>
      </div>
    )
  };

  return (
    <div className="relative w-full h-full">
      {hairStyles[customization.hairStyle]}
      
      <div 
        className="absolute inset-0 rounded-full shadow-lg"
        style={{ backgroundColor: customization.faceColor }}
      ></div>
      
      <div 
        className={`absolute ${eyeSizes[customization.eyeSize]} ${eyeShapes[customization.eyeStyle]}`}
        style={{ 
          left: '30%', 
          top: '45%',
          backgroundColor: customization.eyeColor,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}
      ></div>
      <div 
        className={`absolute ${eyeSizes[customization.eyeSize]} ${eyeShapes[customization.eyeStyle]}`}
        style={{ 
          right: '30%', 
          top: '45%',
          backgroundColor: customization.eyeColor,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}
      ></div>
      
      {mouthStyles[customization.mouthStyle]}
    </div>
  );
}

function ColorPicker({ label, value, onChange, colors }: { 
  label: string; 
  value: string; 
  onChange: (color: string) => void;
  colors: string[];
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
              value === color ? 'border-blue-500 scale-110' : 'border-gray-200'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [position, setPosition] = useState(0);
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);
  const animationFrame = useRef<number>();
  
  const springStrength = 0.15;
  const damping = 0.95;
  const sensitivity = 0.25;
  const maxOffset = 150;

  const skinTones = [
    '#ffdfc4', // Light
    '#f0c8a0', // Fair
    '#d8b094', // Medium
    '#c68863', // Olive
    '#a56e44', // Tan
    '#8d5524', // Brown
    '#6b4423', // Dark brown
    '#483018'  // Deep brown
  ];

  const hairColors = [
    '#090806', // Natural black
    '#2c222b', // Dark brown
    '#71635a', // Medium brown
    '#b7a69e', // Light brown
    '#d6c4c2', // Dark blonde
    '#f0e0d6', // Blonde
    '#7c6c6c', // Gray
    '#c2c2c2'  // Silver
  ];

  const eyeColors = [
    '#634e34', // Brown
    '#2b1700', // Dark brown
    '#45322e', // Hazel
    '#337ab7', // Blue
    '#6f8faf', // Light blue
    '#aaa39d', // Gray
    '#2f4f4f', // Green
    '#4CAF50'  // Bright green
  ];

  const [customization, setCustomization] = useState<FaceCustomization>({
    faceColor: '#f0c8a0',
    eyeStyle: 'almond',
    eyeColor: '#634e34',
    eyeSize: 'medium',
    mouthStyle: 'subtle',
    mouthColor: '#8d5524',
    hairStyle: 'medium',
    hairColor: '#2c222b'
  });

  useEffect(() => {
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 16;
      const currentScrollY = window.scrollY;
      const scrollDelta = (currentScrollY - lastScrollY.current) * sensitivity;
      
      const maxVelocity = 15;
      const newVelocity = velocityRef.current + scrollDelta * deltaTime;
      velocityRef.current = Math.max(Math.min(newVelocity, maxVelocity), -maxVelocity);
      
      lastScrollY.current = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updatePhysics = () => {
      const springForce = -springStrength * position;
      velocityRef.current = (velocityRef.current + springForce) * damping;
      
      setPosition(prev => {
        const newPos = prev + velocityRef.current;
        return Math.max(Math.min(newPos, maxOffset), -maxOffset);
      });

      animationFrame.current = requestAnimationFrame(updatePhysics);
    };

    animationFrame.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [position]);

  const handleDownload = () => {
    const faceStyles = `
      .face {
        position: relative;
        width: 200px;
        height: 200px;
      }
      .clip-triangle {
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      }
      ${customization.hairStyle === 'spiky' ? `
        @keyframes sway {
          0%, 100% { transform: rotate(var(--rotation)); }
          50% { transform: rotate(calc(var(--rotation) + 5deg)); }
        }
        .spiky-hair {
          animation: sway 2s ease-in-out infinite;
        }
      ` : ''}
    `;

    const avatarHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            margin: 0;
            min-height: 300vh;
            background: linear-gradient(to bottom, #2a2a2a, #1a1a1a);
          }
          .avatar {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
          }
          ${faceStyles}
        </style>
      </head>
      <body>
        <div class="avatar">
          <div class="face">
            ${customization.hairStyle !== 'none' ? `
              <div style="
                position: absolute;
                ${customization.hairStyle === 'spiky' ? `
                  top: -24px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 176px;
                  display: flex;
                  justify-content: center;
                ` : `
                  top: -16px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: ${customization.hairStyle === 'short' ? '160px' : '192px'};
                  height: ${customization.hairStyle === 'short' ? '80px' : '160px'};
                `}
                background-color: ${customization.hairColor};
              ">
                ${customization.hairStyle === 'spiky' ? 
                  Array(7).fill(0).map((_, i) => `
                    <div class="spiky-hair" style="
                      width: 24px;
                      height: 64px;
                      margin: 0 2px;
                      --rotation: ${(i - 3) * 15}deg;
                    ">
                      <div class="clip-triangle" style="width: 100%; height: 100%;"></div>
                    </div>
                  `).join('') 
                : `
                  <div style="
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: ${customization.hairStyle === 'short' ? '100px' : '120px'} ${customization.hairStyle === 'short' ? '100px' : '120px'} 0 0;
                  "></div>
                  ${customization.hairStyle === 'long' ? `
                    <div style="
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      width: 48px;
                      height: 128px;
                      border-radius: 0 0 0 50px;
                    "></div>
                    <div style="
                      position: absolute;
                      bottom: 0;
                      right: 0;
                      width: 48px;
                      height: 128px;
                      border-radius: 0 0 50px 0;
                    "></div>
                  ` : ''}
                `}
              </div>
            ` : ''}
            <div style="
              position: absolute;
              inset: 0;
              background-color: ${customization.faceColor};
              border-radius: 9999px;
            "></div>
            <div style="
              position: absolute;
              width: ${customization.eyeSize === 'small' ? '12px' : customization.eyeSize === 'medium' ? '16px' : '20px'};
              height: ${customization.eyeSize === 'small' ? '12px' : customization.eyeSize === 'medium' ? '16px' : '20px'};
              background-color: ${customization.eyeColor};
              border-radius: ${customization.eyeStyle === 'square' ? '2px' : '9999px'};
              transform: ${customization.eyeStyle === 'oval' ? 'scaleY(1.5)' : 'none'};
              left: 30%;
              top: 40%;
            "></div>
            <div style="
              position: absolute;
              width: ${customization.eyeSize === 'small' ? '12px' : customization.eyeSize === 'medium' ? '16px' : '20px'};
              height: ${customization.eyeSize === 'small' ? '12px' : customization.eyeSize === 'medium' ? '16px' : '20px'};
              background-color: ${customization.eyeColor};
              border-radius: ${customization.eyeStyle === 'square' ? '2px' : '9999px'};
              transform: ${customization.eyeStyle === 'oval' ? 'scaleY(1.5)' : 'none'};
              right: 30%;
              top: 40%;
            "></div>
            ${customization.mouthStyle === 'smile' || customization.mouthStyle === 'frown' ? `
              <div style="
                position: absolute;
                width: 80px;
                height: 48px;
                overflow: hidden;
                left: 50%;
                ${customization.mouthStyle === 'smile' ? 'top: 50%; transform: translate(-50%, -20%);' : 'bottom: 20%; transform: translate(-50%, 0) rotate(180deg);'}
              ">
                <div style="
                  width: 80px;
                  height: 80px;
                  border: 4px solid ${customization.mouthColor};
                  border-radius: 9999px;
                "></div>
              </div>
            ` : customization.mouthStyle === 'surprised' ? `
              <div style="
                position: absolute;
                width: 32px;
                height: 32px;
                background-color: ${customization.mouthColor};
                border-radius: 9999px;
                left: 50%;
                top: 60%;
                transform: translate(-50%, -50%);
              "></div>
            ` : `
              <div style="
                position: absolute;
                width: 64px;
                height: 4px;
                background-color: ${customization.mouthColor};
                border-radius: 9999px;
                left: 50%;
                top: 60%;
                transform: translate(-50%, -50%);
              "></div>
            `}
          </div>
        </div>
        <script>
          let velocity = 0;
          let position = 0;
          let lastScrollY = window.scrollY;
          let lastTime = performance.now();
          
          const springStrength = 0.15;
          const damping = 0.95;
          const sensitivity = 0.25;
          const maxOffset = 150;

          window.addEventListener('scroll', () => {
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime) / 16;
            const currentScrollY = window.scrollY;
            const scrollDelta = (currentScrollY - lastScrollY) * sensitivity;
            
            const maxVelocity = 15;
            const newVelocity = velocity + scrollDelta * deltaTime;
            velocity = Math.max(Math.min(newVelocity, maxVelocity), -maxVelocity);
            
            lastScrollY = currentScrollY;
            lastTime = currentTime;
          });

          function updatePhysics() {
            const springForce = -springStrength * position;
            velocity = (velocity + springForce) * damping;
            position = Math.max(Math.min(position + velocity, maxOffset), -maxOffset);
            
            const avatar = document.querySelector('.avatar');
            avatar.style.transform = \`translate(-50%, calc(-50% + \${position}px))\`;
            requestAnimationFrame(updatePhysics);
          }

          requestAnimationFrame(updatePhysics);
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([avatarHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-bouncing-emoticon.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[300vh] bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm p-4">
        <h1 className="text-2xl text-gray-800 text-center font-bold">
          Create Your Avatar
        </h1>
      </div>

      <div className="fixed inset-0 flex items-center">
        {/* Left side - Face preview */}
        <div className="w-2/3 h-full flex items-center justify-center">
          <div 
            className="relative w-[300px] h-[300px] bg-white rounded-2xl shadow-xl p-8"
            style={{
              transform: `translateY(${position}px)`
            }}
          >
            <Face customization={customization} />
          </div>
        </div>

        {/* Right side - Customization panel */}
        <div className="w-1/3 h-full bg-white shadow-lg overflow-y-auto">
          <div className="p-6 space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl text-gray-800 font-semibold">Face Features</h2>
              <ColorPicker 
                label="Skin Tone" 
                value={customization.faceColor}
                onChange={(color) => setCustomization(prev => ({ ...prev, faceColor: color }))}
                colors={skinTones}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Eye Shape</label>
                <select 
                  value={customization.eyeStyle}
                  onChange={(e) => setCustomization(prev => ({ 
                    ...prev, 
                    eyeStyle: e.target.value as FaceCustomization['eyeStyle']
                  }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="almond">Almond</option>
                  <option value="round">Round</option>
                  <option value="oval">Oval</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Eye Size</label>
                <select 
                  value={customization.eyeSize}
                  onChange={(e) => setCustomization(prev => ({ 
                    ...prev, 
                    eyeSize: e.target.value as FaceCustomization['eyeSize']
                  }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <ColorPicker 
                label="Eye Color" 
                value={customization.eyeColor}
                onChange={(color) => setCustomization(prev => ({ ...prev, eyeColor: color }))}
                colors={eyeColors}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl text-gray-800 font-semibold">Hair & Expression</h2>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Hair Style</label>
                <select 
                  value={customization.hairStyle}
                  onChange={(e) => setCustomization(prev => ({ 
                    ...prev, 
                    hairStyle: e.target.value as FaceCustomization['hairStyle']
                  }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="none">Bald</option>
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>

              {customization.hairStyle !== 'none' && (
                <ColorPicker 
                  label="Hair Color" 
                  value={customization.hairColor}
                  onChange={(color) => setCustomization(prev => ({ ...prev, hairColor: color }))}
                  colors={hairColors}
                />
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Expression</label>
                <select 
                  value={customization.mouthStyle}
                  onChange={(e) => setCustomization(prev => ({ 
                    ...prev, 
                    mouthStyle: e.target.value as FaceCustomization['mouthStyle']
                  }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="subtle">Subtle Smile</option>
                  <option value="smile">Friendly</option>
                  <option value="grin">Happy</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Download size={20} />
              Download Your Avatar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
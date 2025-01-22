
 export type EyeStyle = 'round' | 'oval' | 'almond' | 'square';
 export type EyeSize = 'small' | 'medium' | 'large';
 export type MouthStyle = 'smile' | 'neutral' | 'grin' | 'subtle' | 'surprised' | 'frown';
 export type HairStyle = 'none' | 'short' | 'medium' | 'long' | 'spiky';
 export type Faceshape = 'oval' |'round' | 'long' | 'square' | 'heart'

 export interface FaceCustomization {
	faceColor: string;
	eyeStyle: EyeStyle;
	eyeColor: string;
	eyeSize: EyeSize;
	mouthStyle: MouthStyle;
	mouthColor: string;
	hairStyle: HairStyle;
	hairColor: string;
	faceshape: Faceshape
  }

  export default function Face({ customization }: { customization: FaceCustomization }) {
	const eyeSizes = {
	  small: 'w-4 h-3',
	  medium: 'w-6 h-4',
	  large: 'w-8 h-5'
	};

	const eyeShapes = {
	  round: 'rounded-full',
	  oval: 'rounded-full scale-x-125',
	  almond: 'rounded-full scale-x-150 rotate-[15deg]',
	  square: 'rounded-full scale-x-200 rotate-[10deg]'
	};

	const faceshape = {
		oval: 'w-32 h-16 rounded-full',
		round: 'rounded-full',
		long: 'w-20 h-26 rounded-full',
		square: 'w-50 h-50',
		heart: 'relative w-16 h-16 bg-red-500 rounded-full before:content-[\'\'] before:absolute before:w-16 before:h-16 before:bg-red-500 before:rounded-full before:top-[-8px] before:left-[-8px] after:content-[\'\'] after:absolute after:w-16 after:h-16 after:bg-red-500 after:rounded-full after:top-[-8px] after:right-[-8px] clip-heart'
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
	  ),
	  spiky: (
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
	  ),
	  surprised: (
		<div
		  className="absolute -top-8 left-1/2 -translate-x-1/2 w-56 h-48"
		  style={{ backgroundColor: customization.hairColor }}
		>
		  <div className="absolute bottom-0 w-full h-full rounded-t-[120px]"></div>
		  <div className="absolute bottom-0 left-0 w-14 h-40 rounded-bl-[50px]"></div>
		  <div className="absolute bottom-0 right-0 w-14 h-40 rounded-br-[50px]"></div>
		</div>
	  ),
	  frown: (
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

	return (
	  <div className="relative w-full h-full">
		{hairStyles[customization.hairStyle]}

		<div
		  className={`absolute ${faceshape[customization.faceshape]}`}
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

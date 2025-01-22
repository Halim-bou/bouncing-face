import React from "react";

 const faceShapeStyles = {
	base: "relative bg-gray-200 mx-auto",
	longFace: {
	  width: "w-48",
	  height: "h-64",
	  borderRadius: "rounded-full",
	  shadow: "shadow-lg",
	  color: "bg-skin-base",
	},
  };

  const FaceShape = () => {
	const { longFace } = faceShapeStyles;

	return (
	  <div
		className={`${faceShapeStyles.base} ${longFace.width} ${longFace.height} ${longFace.borderRadius} ${longFace.shadow} ${longFace.color}`}
	  ></div>
	);
  };

  export default FaceShape;

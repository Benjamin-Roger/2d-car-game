import React from "react";

const Canvas = (props) => {

  const { draw, canvasRef, ...rest } = props
  
  return (
    <>
      <canvas className="canvas" ref={canvasRef} {...rest}  ></canvas>
    </>
  );
};


export default Canvas;

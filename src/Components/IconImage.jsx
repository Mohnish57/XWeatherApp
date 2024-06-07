import React from "react";
import "./IconImage.css";
function IconImage({ image, alt }) {
  return (
    <div className="icon">
      <img src={image} width={100} height={100} alt={alt} />
    </div>
  );
}

export default IconImage;

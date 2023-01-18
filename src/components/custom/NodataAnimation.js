import React from "react";

function NodataAnimation() {
  return (
    <div>
      {" "}
      <lottie-player
        src="https://assets5.lottiefiles.com/packages/lf20_yuisinzc.json"
        background="transparent"
        speed="1"
        style={{ width: "280px", height: "280px" }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
}

export default NodataAnimation;

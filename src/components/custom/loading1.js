import React from "react";

const Loading1 = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <lottie-player
        src="https://assets10.lottiefiles.com/packages/lf20_a2chheio.json"
        background="transparent"
        speed="1"
        style={{ width: "280px", height: "280px" }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
};

export default Loading1;

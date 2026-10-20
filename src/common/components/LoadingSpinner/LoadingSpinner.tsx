import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./LoadingSpinner.css";

// ❌ 배경색이 흰색임. 투명으로 바꿔야함

export default function LoadingSpinner() {
  return (
    <div>
      <div className="loading-container">
        <DotLottieReact
          src="https://lottie.host/8a1aef85-d78f-4061-ba7c-14e37315affd/EL0wI1vB3S.lottie"
          loop
          autoplay
          className="loading-spinner"
        />
      </div>
    </div>
  );
}

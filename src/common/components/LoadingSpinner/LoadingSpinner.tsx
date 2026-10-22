import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div>
      <div className="loading-container">
        <DotLottieReact
          src="/EL0wI1vB3S.lottie"
          loop
          autoplay
          className="loading-spinner"
        />
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { Timeline, Tween } from "react-gsap";
import { Controller, Scene } from "react-scrollmagic";
import "./App.css";

function App() {
  useEffect(() => {
    const html = document.documentElement;
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const currentFrame = (index) =>
      `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
        .toString()
        .padStart(4, "0")}.jpg`;

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };

    const frameCount = 147;

    // canvas setting
    canvas.width = 1158;
    canvas.height = 770;
    const image = new Image();
    image.src = currentFrame(1);

    image.onload = () => {
      context.drawImage(image, 0, 0);
    };

    const updateImage = (index) => {
      image.src = currentFrame(index);
      context.drawImage(image, 0, 0);
    };

    window.addEventListener("scroll", () => {
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex + 1));
      preloadImages();
    });
  }, []);

  return (
    <>
      <Controller>
        <Scene triggerHook="onLeave" duration={500} pin>
          <Timeline>
            <Tween
              from={{ fontSize: "4rem", opacity: 1, top: "30%" }}
              to={{ fontSize: "2rem", opacity: 0, top: "25%" }}
              duration={1}
            >
              <h1>AirPods Pro</h1>
            </Tween>
          </Timeline>
        </Scene>
      </Controller>
      <canvas id="canvas"></canvas>
    </>
  );
}

export default App;

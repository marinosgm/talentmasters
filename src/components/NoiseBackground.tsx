import { NoiseBackground } from "@/components/ui/noise-background";

export function NoiseBackgroundDemo() {
  return (
    <div className="flex justify-center">
      <NoiseBackground
        containerClassName="w-fit p-2 rounded-full mx-auto"
        gradientColors={[
          "rgb(255, 100, 150)",
          "rgb(100, 150, 255)",
          "rgb(255, 200, 100)",
        ]}
      >
        <button className="
          h-full w-full cursor-pointer rounded-full
          bg-black text-white
          px-4 py-2

          transition-all duration-100
          hover:brightness-110
          active:scale-98
        ">
          Start applying &rarr;
        </button>
      </NoiseBackground>
    </div>
  );
}

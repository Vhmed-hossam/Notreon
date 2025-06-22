import { BeamsBackground } from "@/Components/shadcn/beams-background";
import { FlowButton } from "@/Components/shadcn/flow-button";
import { InteractiveHoverButton } from "@/Components/shadcn/interactive-hover-button";
import { Typewriter } from "@/Components/shadcn/typewriter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <BeamsBackground intensity="medium">
        <div className="flex flex-col gap-4">
          {" "}
          <div className="flex flex-col items-center justify-center gap-4 px-4 text-center">
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src="/Notreon_logo.png"
              alt="Notreon logo"
              className="w-50"
            />{" "}
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Notreon
            </motion.h1>
            <motion.p
              className="whitespace-pre-wrap text-lg md:text-xl lg:text-2xl tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span>{"Built for "}</span>
              <Typewriter
                text={["Creators", "Students", "Professionals", "Engineers"]}
                speed={40}
                className="text-[#25AADA]"
                waitTime={1500}
                deleteSpeed={30}
              />
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-2 flex flex-row justify-center gap-4 items-center"
          >
           <Link to="/register"><FlowButton text="Get Started" /></Link>
           <Link to="/login"><InteractiveHoverButton text="Login" /></Link>
          </motion.div>
        </div>
      </BeamsBackground>
    </>
  );
}

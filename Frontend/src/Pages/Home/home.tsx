import Aurora from "@/Components/Aurora/aurora";
import { GridItem } from "@/Components/GridItem/griditem";
import { BeamsBackground } from "@/Components/shadcn/beams-background";
import { FlowButton } from "@/Components/shadcn/flow-button";
import { InteractiveHoverButton } from "@/Components/shadcn/interactive-hover-button";
import { TextRevealByWord } from "@/Components/shadcn/text-reveal";
import { Typewriter } from "@/Components/shadcn/typewriter";
import ClickSpark from "@/Components/Sparkclick/sparkclick";
import { TextHoverEffect } from "@/Components/text-hover-effect/text-hover-effect";
import { motion } from "framer-motion";
import { Box, Paintbrush, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      {" "}
      <div className="flex flex-col">
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
                className="text-6xl max-sm:text-5xl font-semibold tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <TextHoverEffect text="Notreon" />
              </motion.h1>
              <motion.div
                className="whitespace-pre-wrap text-lg md:text-xl lg:text-2xl tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span>{"Built for "}</span>
                <Typewriter
                  text={[
                    "Creators",
                    "Students",
                    "Professionals",
                    "Engineers",
                    "Developers",
                  ]}
                  speed={40}
                  className="text-[#25AADA]"
                  waitTime={1500}
                  deleteSpeed={30}
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-2 flex flex-row justify-center gap-4 items-center"
            >
              <Link to="/register">
                <FlowButton text="Get Started" />
              </Link>
              <Link to="/login">
                <InteractiveHoverButton text="Login" />
              </Link>
            </motion.div>
          </div>
        </BeamsBackground>
        <div className="pt-5 flex flex-col gap-5">
          <div className="flex-1 flex flex-col mx-auto container gap-2 items-start">
            <motion.h2
              className="text-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Our Service
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Notreon helps you organize what matters most. your{" "}
              <span className="ms-1 p-2 text-2xl rounded-md gradient-text">
                Notes
              </span>
            </motion.p>
          </div>
          <div className="flex flex-row justify-center gap-5 px-2 max-lg:flex-col max-lg:gap-0 mx-3 max-lg:mt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/4]"
                icon={
                  <Box className="h-4 w-4 text-black dark:text-neutral-400" />
                }
                title="Focus and type"
                description="turn your idea into an action."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/4]"
                icon={
                  <Paintbrush className="h-4 w-4 text-black dark:text-neutral-400" />
                }
                title="Do it the right way"
                description="Stay focused with a clean  workflow."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/4]"
                icon={
                  <Puzzle className="h-4 w-4 text-black dark:text-neutral-400" />
                }
                title="Clean Design"
                description="Enjoy a clean writing space designed for you"
              />
            </motion.div>
          </div>
        </div>{" "}
        <TextRevealByWord text="Notreon will change tour typing experience" />
        <div>
          <Aurora
            colorStops={["#FFE93B", "#25AADA", "#F0C315"]}
            blend={1}
            amplitude={0.9}
            speed={0.8}
          />
          <div className="flex flex-col p-2 justify-center items-center">
            <div
              className="flex-1"
              style={{
                backgroundColor: "rgba(19, 19, 19, 0.15)",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src="/Notreon_logo.png"
                    alt="Notreon Logo"
                    className="w-18"
                  />
                  <h2 className="text-3xl">Notreon</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </ClickSpark>
  );
}

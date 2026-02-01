import React from "react";
import MaxWidthWrapper from "../Wrappers/MaxWidthWrapper";
import { Button } from "../ui/button";
import Image from "next/image";

const Heropage = () => {
  return (
    <MaxWidthWrapper>
      <div className="py-4">
        <div className="relative h-150">
          <div className="absolute z-12 left-0 top-1/2 -translate-y-1/2">
            <TopLiveBanner />
            <HeroText />
          </div>

          <div className="absolute z-10 blur-3xl bg-primary/20 h-[40vh] w-[30vw]"/>

          <div className="absolute top-1/2 -translate-y-1/2 -right-20">
            <div className="border-2 border-primary/20 p-10 rounded-full">
              <div className="border-2 border-primary/30 p-10 rounded-full">
                <div className="p-10 rounded-full border-2 border-primary/50">
                  <div className="p-10 rounded-full border-2 border-primary/80">
                    <div className="p-7 rounded-full bg-primary/30 border-primary border-2">
                      <Image
                        src="/hero-image.png"
                        alt="Hero Image"
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

const TopLiveBanner = () => {
  return (
    <div className="w-fit rounded-full py-1 px-4 border-2 text-primary bg-card/40">
      <p className="uppercase font-sans text-sm"> 🚀 Next Gen AI 2.0 is Live</p>
    </div>
  );
};

const HeroText = () => {
  return (
    <div className="mt-8">
      <h1 className="font-sans text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-background/20">
        Automate The <br />
        Future of Work
      </h1>
      <p className="font-mono text-sm text-muted-foreground mt-4 mb-8 w-1/2">
        With AI-powered test generation, you can create tests in seconds, saving
        you time and effort. With AI-powered test generation, you can create
        tests in seconds, saving you time and effort.
      </p>

      <div className="flex gap-4">
        <Button className="text-white">Get Started</Button>
        <Button variant="outline">Watch Demo</Button>
      </div>
    </div>
  );
};

export default Heropage;

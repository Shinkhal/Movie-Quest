"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import Link from "next/link";
import "./button.css"

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-white text-center">
            Discover Your Next Favorite <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 text-blue-500 leading-none z-10">
              MOVIE
            </span>
          </h1>
        }
      >
        <div className="relative w-full h-80 md:h-[80vh]">
          <Image
            src={`/movie-banner.png`}
            alt="hero"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            draggable={false}
          />
        </div>
      </ContainerScroll>
      <div className="button-prop mt-auto">
        <Link href="/search">
          <button type="button" className="button mt-auto">
            <div className="button-top">Search Now</div>
            <div className="button-bottom"></div>
            <div className="button-base"></div>
          </button>
        </Link>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      {/* Overlay for title and rating */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
        <div className="flex justify-between items-center text-lg md:text-xl font-medium text-white">
          <span>{card.title}</span>
          <span className="text-yellow-400">⭐ {card.rating} </span>
        </div>
      </div>
      {/* Description on hover */}
      {hovered === index && (
        <div className="absolute inset-0 bg-black/75 text-white flex items-center justify-center px-4 text-center transition-opacity duration-300">
          <p>{card.description}</p>
        </div>
      )}
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  rating: string;
  description: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-4 gap-10 mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

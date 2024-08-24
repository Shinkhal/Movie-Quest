"use client";
import React from "react";
import Box from "@/components/Box";

export default function Result(props) {
    const boxes = props.movies.map(
        (item,index) => {
        return <Box key={index} image={item.poster_path} title={item.original_title} rating={item.vote_average} />; // Add a unique key here
    });

    return (
        <div className='grid md:grid-cols-4 w-full mx-auto mb-6 gap-6 text-white'>
            {boxes}
        </div>
    );
}

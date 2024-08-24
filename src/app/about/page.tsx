'use client';
import React from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';

const stats = [
  { name: 'Movies in our database', value: '10,000+' },
  { name: 'Genres covered', value: '25+' },
  { name: 'Daily active users', value: '5,000+' },
  { name: 'Average ratings', value: '4.8/5' },
];

export default function About() {
  return (
    <div className="text-white">
      {/* Introduction Section */}
      <div className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Movie-Quest</h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-4xl mx-auto">
            Welcome to Movie-Quest, your ultimate destination for discovering and exploring movies. 
            Whether you&apos;re a film enthusiast looking for your next favorite movie or just browsing 
            for something to watch tonight, we&apos;ve got you covered. Our extensive database and personalized 
            recommendations make it easy to find the perfect film.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Why Choose Movie-Quest?</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-4xl mx-auto">
            Movie-Quest offers a unique combination of comprehensive movie data and cutting-edge algorithms 
            to bring you the best movie recommendations. Dive into our collection, filter by genre, rating, 
            and more, and discover your next favorite movie today!
          </p>
        </div>
      </div>
      <BackgroundBeams/>
    </div>
  );
}

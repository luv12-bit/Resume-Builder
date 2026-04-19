import React from "react";
import Title from "./Title";
import { BookUserIcon } from "lucide-react";

const Testimonial = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
      date: "April 20, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
      date: "May 10, 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200",
      name: "Jordan Lee",
      handle: "@jordantalks",
      date: "June 5, 2025",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2">
        <img
          className="size-11 rounded-full object-cover"
          src={card.image}
          alt="User"
        />
        <div>
          <p className="font-semibold">{card.name}</p>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm py-4 text-gray-800">
        Radiant made undercutting all of our competitors an absolute breeze.
      </p>

      <div className="text-xs text-slate-500">{card.date}</div>
    </div>
  );

  return (
    <>
      {/* Animation */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div
        id="testimonials"
        className="flex flex-col items-center my-16 scroll-mt-12"
      >
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
          <BookUserIcon className="size-4 stroke-green-600" />
          <span>Testimonials</span>
        </div>

        <Title
          title="Don't just take our word"
          description="Hear what our users say about us."
        />

        {/* First Row */}
        <div className="w-full mx-auto max-w-5xl overflow-hidden relative mt-10">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

          <div className="marquee-inner flex min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>

          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>

        {/* Second Row Reverse */}
        <div className="w-full mx-auto max-w-5xl overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

          <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>

          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;

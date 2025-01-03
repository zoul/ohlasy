"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PodcastEpisode } from "src/data/podcast";
import { tilde } from "src/utils";

type PodcastPlayerProps = {
  episode: PodcastEpisode;
};

export const PodcastPlayer = ({ episode }: PodcastPlayerProps) => {
  const playerRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-plum rounded-xl p-7 md:p-9 my-6">
      <audio
        src={episode.url}
        ref={playerRef}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <div className="flex flex-col md:flex-row gap-7">
        <div className="relative aspect-square w-full md:w-[216px] shrink-0">
          <Image
            className="bg-gray shadow-lg rounded-xl"
            sizes="(min-width: 768px) 216px, 100vw"
            src={episode.image}
            alt=""
            fill
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-white">
            <p className="text-2xl text-balance">{tilde(episode.title)}</p>
            <p className="text-sm">
              {Intl.DateTimeFormat("cs-CZ").format(new Date(episode.date))} 
            </p>
          </div>
          <div>
            {!playing && (
              <Button
                icon={PlayIcon}
                onClick={() => playerRef.current?.play()}
              />
            )}
            {playing && (
              <Button
                onClick={() => playerRef.current?.pause()}
                icon={PauseIcon}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Button = ({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: JSX.Element;
}) => (
  <button
    className="block aspect-square w-[50px] text-white hover:scale-110"
    onClick={onClick}
  >
    {icon}
  </button>
);

const PlayIcon = (
  <svg
    role="img"
    aria-hidden="false"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
  >
    <title>Spustit</title>
    <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.75-4.567a.5.5 0 0 0-.75.433v8.268a.5.5 0 0 0 .75.433l7.161-4.134a.5.5 0 0 0 0-.866L9.75 7.433z"></path>
  </svg>
);

const PauseIcon = (
  <svg
    role="img"
    aria-hidden="false"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
  >
    <title>Pozastavit</title>
    <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm7.5-5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-2zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-2z"></path>
  </svg>
);
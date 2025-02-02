"use client";

import { useDrag, useDrop } from "react-dnd";
import type { Playlist, DragItem } from "@/lib/types/playlist";

interface PlaylistCardProps extends Playlist {
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isDragging: boolean;
  handlePlaylistSelect: (playlist: Playlist) => void;
}

export function PlaylistCard({
  id,
  title,
  index,
  thumbnail,
  videos,
  moveCard,
  handlePlaylistSelect,
  description,
}: PlaylistCardProps) {
  const [{ isOver }, drop] = useDrop({
    accept: "PLAYLIST",
    hover(item: DragItem) {
      if (item.index === index) {
        return;
      }
    },
    drop(item: DragItem) {
      if (item.index === index) {
        return;
      }
      moveCard(item.index, index);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging: isThisCardDragging }, drag] = useDrag({
    type: "PLAYLIST",
    item: { type: "PLAYLIST", id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className="relative hover:shadow-lg cursor-pointer"
      onClick={() =>
        handlePlaylistSelect({ id, title, thumbnail, videos, description })
      }
    >
      <div
        ref={(node) => {
          if (node) {
            drag(drop(node));
          }
        }}
        className={`relative rounded-lg overflow-hidden shadow-lg transition-opacity ${
          isThisCardDragging ? "opacity-30" : "opacity-100"
        } ${
          isOver &&
          !isThisCardDragging &&
          "border-2 border-dashed border-gray-300"
        }`}
      >
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title ?? ""}
          className="w-full h-30 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className="text-white/80 text-sm">{videos.length} videos</p>
        </div>
      </div>
    </div>
  );
}

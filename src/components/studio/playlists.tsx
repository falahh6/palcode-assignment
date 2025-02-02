"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { Loader, X } from "lucide-react";
import { PlaylistCard } from "./playlist-card";
import { Button } from "../ui/button";

interface Playlist {
  id: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  thumbnail: string;
  videos: {
    id: string | null | undefined;
    title: string | null | undefined;
    description: string | null | undefined;
    thumbnail: string | null | undefined;
    duration: string | null | undefined;
  }[];
}

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
  const [playlistLayout, setPlaylistLayout] = useState<
    (string | null | undefined)[]
  >([]);

  const [saveLoading, setSaveLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/youtube/playlists");
        const data = await response.json();
        setPlaylists(data.playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        toast({
          title: "Error",
          description: "Failed to fetch playlists. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setPlaylists((prevPlaylists) => {
      const newPlaylists = [...prevPlaylists];
      const draggedItem = newPlaylists[dragIndex];
      newPlaylists.splice(dragIndex, 1);
      newPlaylists.splice(hoverIndex, 0, draggedItem);
      setPlaylistLayout(newPlaylists.map((p) => p.id));
      return newPlaylists;
    });
  }, []);

  const SaveLayoutHandler = async () => {
    console.log("Save layout", playlistLayout);

    setSaveLoading(false);
  };

  useEffect(() => {
    if (playlistLayout.length > 0) {
      toast({
        className: "rounded-2xl",
        title: "Save your layout changes?",
        duration: Infinity,
        action: (
          <ToastAction
            className="rounded-xl"
            onClick={() => SaveLayoutHandler()}
            altText="Save layout"
            disabled={saveLoading}
          >
            {saveLoading ? (
              <Loader className="animate-spin h-4 w-4" />
            ) : (
              "Save layout"
            )}
          </ToastAction>
        ),
      });
    }
  }, [playlistLayout]);

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    console.log("Selected playlist", playlist);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row gap-4 h-full">
        <div
          className={cn(`bg-[#27272F] w-[65%] p-4 rounded-2xl h-full`, {
            "w-full": !selectedPlaylist,
          })}
        >
          {loading ? (
            <div className="h-40 w-full flex items-center justify-center">
              <Loader className="h-6 w-6 animate-spin mr-2" /> Loading your
              playlists
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              {playlists.map((playlist, index) => (
                <PlaylistCard
                  key={playlist.id}
                  {...playlist}
                  index={index}
                  moveCard={moveCard}
                  isDragging={isDragging}
                  handlePlaylistSelect={handlePlaylistSelect}
                />
              ))}
            </div>
          )}
        </div>
        {selectedPlaylist && (
          <div className="bg-[#27272F] min-w-[35%] max-w-[25%] p-4 rounded-2xl">
            <div>
              <h3 className="text-lg font-semibold flex flex-row items-center justify-between">
                {selectedPlaylist.title}
                <Button
                  onClick={() => setSelectedPlaylist(undefined)}
                  size={"sm"}
                  variant={"custom"}
                  className="p-1 rounded-full h-fit"
                >
                  {" "}
                  <X className="h-4 w-4" />
                </Button>
              </h3>
            </div>
            <div className="my-4 h-full p-2 max-h-[65vh] overflow-y-auto scrollbar-hide flex flex-col gap-2">
              {selectedPlaylist.videos
                .filter(
                  (v) =>
                    v.title !== "Private video" && v.title !== "Deleted video"
                )
                .map((video, i) => (
                  <div
                    key={video.id! + i}
                    className="flex flex-row items-center gap-4 p-2 border rounded-lg border-gray-700"
                  >
                    <div className="min-w-32 h-20 relative rounded-xl overflow-hidden">
                      <Image
                        src={video.thumbnail || ""}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2 text-xs">
                      <h3 className="font-semibold">{video.title}</h3>
                      <span className="bg-white/10 text-gray-200 p-0.5 px-1 font-semibold rounded text-xs w-fit">
                        {video.duration}
                      </span>
                      {/* <p>Products Attached : 5</p> */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

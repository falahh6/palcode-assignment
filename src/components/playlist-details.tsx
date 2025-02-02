import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type React from "react"; // Import React

interface PlaylistDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PlaylistDetails({ className, ...props }: PlaylistDetailsProps) {
  const videos = [
    {
      id: 1,
      title: "Video Title Name",
      duration: "4:05:60",
      productsCount: 5,
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-31%20at%207.19.41%E2%80%AFPM-zsDtKijvgtx79PCVZOeEAGOOuE4QJT.png",
    },
    // Repeat for more videos
  ].flatMap((v) => [v, v, v, v]);

  return (
    <div className={cn("bg-gray-900/50 p-6", className)} {...props}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Thumbnail Title</h3>
          <Input placeholder="Get Sporty in Style" />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Video status</h3>
          <RadioGroup defaultValue="active" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inactive" id="inactive" />
              <Label htmlFor="inactive">Inactive</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Product List</h3>
          <div className="space-y-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/50"
              >
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{video.title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{video.duration}</span>
                    <span>Products Attached: {video.productsCount}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <input type="checkbox" className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Update Playlist
        </Button>
      </div>
    </div>
  );
}

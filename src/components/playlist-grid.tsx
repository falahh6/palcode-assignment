import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PlaylistGrid() {
  const playlists = [
    {
      id: 1,
      name: "Product Playlists Name",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-31%20at%207.19.41%E2%80%AFPM-zsDtKijvgtx79PCVZOeEAGOOuE4QJT.png",
      videoCount: 5,
    },
    // Repeat 5 more times for the grid
  ].flatMap((p) => [p, p, p, p, p, p])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {playlists.map((playlist) => (
        <Card key={playlist.id} className="overflow-hidden bg-gray-900/50">
          <CardContent className="p-0 relative aspect-video">
            <img
              src={playlist.thumbnail || "/placeholder.svg"}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Button variant="ghost" size="icon" className="absolute top-2 right-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-0 p-4 w-full">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-500" />
                <h3 className="font-medium text-white">{playlist.name}</h3>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
                <span>{playlist.videoCount} Videos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


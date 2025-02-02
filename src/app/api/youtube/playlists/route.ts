import { NextResponse } from "next/server";
import { google, youtube_v3 } from "googleapis";
import { auth } from "../../auth/[...nextauth]/authOptions";
import { parseDuration } from "@/lib/utils";
import { GaxiosResponse } from "gaxios";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export async function GET() {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    oAuth2Client.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
    });

    const youtube = google.youtube({
      version: "v3",
      auth: oAuth2Client,
    });

    const playlistsResponse = await youtube.playlists.list({
      part: ["snippet", "contentDetails"],
      mine: true,
      maxResults: 50,
    });

    const playlists = playlistsResponse.data.items || [];

    const playlistsWithVideos = await Promise.all(
      playlists.map(async (playlist) => {
        const videos = [];
        let nextPageToken = null;

        do {
          const videosResponse: GaxiosResponse<youtube_v3.Schema$PlaylistItemListResponse> =
            await youtube.playlistItems.list({
              part: ["snippet"],
              playlistId: playlist.id!,
              maxResults: 50,
              pageToken: nextPageToken || undefined,
            });

          if (videosResponse.data.items) {
            const videoDetails = await Promise.all(
              videosResponse.data.items.map(
                async (item: youtube_v3.Schema$PlaylistItem) => {
                  const videoId = item.snippet?.resourceId?.videoId;
                  if (videoId) {
                    const videoResponse = await youtube.videos.list({
                      part: ["snippet", "contentDetails"],
                      id: [videoId],
                    });

                    const video = videoResponse.data.items?.[0];
                    return {
                      id: videoId,
                      title: item.snippet?.title,
                      description: item.snippet?.description,
                      thumbnail: item.snippet?.thumbnails?.medium?.url,
                      duration: parseDuration(
                        video?.contentDetails?.duration ?? ""
                      ),
                    };
                  }
                  return null;
                }
              )
            );

            videos.push(...videoDetails.filter((video) => video !== null));
          }

          nextPageToken = videosResponse.data.nextPageToken || null;
        } while (nextPageToken);
        return {
          id: playlist.id,
          title: playlist.snippet?.title,
          thumbnail: playlist.snippet?.thumbnails?.medium?.url,
          description: playlist.snippet?.description,
          videos,
        };
      })
    );

    return NextResponse.json({ playlists: playlistsWithVideos });
  } catch (error) {
    console.error("Error fetching YouTube playlists and videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlists and videos" },
      { status: 500 }
    );
  }
}

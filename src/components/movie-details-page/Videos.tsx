import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}

interface VideosProps {
  videos: VideoResult[];
}

const Videos = ({ videos }: VideosProps) => {
  const trailers = videos.filter(video => video.type === "Trailer");

  if (trailers.length === 0) {
    return (
      <div className="py-8 text-center text-white">
        <p className="text-lg">No trailers available for this movie.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="py-6 md:px-20 w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Trailers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trailers.map(video => (
          <Card key={video.id} className="overflow-hidden bg-[#1a1d1d] border-0">
            <div className="relative pb-[56.25%] w-full">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <CardContent className="p-4 text-white">
              <h3 className="font-bold truncate">{video.name}</h3>
              <p className="text-sm text-gray-400">{formatDate(video.published_at)}</p>
              <Badge 
                className="text-md mt-5 bg-slate-700" variant="secondary"
              >
                {video.official ? "Official" : "Unofficial"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Videos;
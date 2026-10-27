import { content } from "../data/content";
import { embedUrl, parseYoutubeVideoId, watchUrl } from "../lib/youtube";

/**
 * Live in-form preview: renders the real YouTube player as soon as the typed
 * URL parses to a valid video id, swaps when the id changes and disappears for
 * invalid input. No iframe is ever created for an unvalidated URL.
 */
const YouTubePreview = ({ url }: { url: string }) => {
  const videoId = parseYoutubeVideoId(url);
  if (!videoId) return null;

  return (
    <div className="mt-4 animate-[fadeSlideUp_0.4s_ease-out_both]">
      <p className="text-sm font-medium text-white/60">{content.form.preview.title}</p>
      <div className="mt-2 aspect-video overflow-hidden rounded-xl border border-charcoal-600 bg-black">
        <iframe
          key={videoId}
          src={embedUrl(videoId)}
          title={content.form.preview.iframeTitle}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-white/45">
        {content.form.preview.fallbackNote}{" "}
        <a
          href={watchUrl(videoId)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-court-400 underline-offset-2 hover:underline"
        >
          {content.form.preview.watchOnYoutube}
        </a>
      </p>
    </div>
  );
};

export default YouTubePreview;

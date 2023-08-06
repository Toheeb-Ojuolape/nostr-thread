import NostrFeed from "./NostrFeed";
import { nip19 } from "nostr-tools";
import { FeedsProps } from "../../types/interfaces";

function NostrFeedList({ feeds, users }: FeedsProps) {
  return (
    <div className="nostr-feed-list">
      {feeds.map((feed,i) => (
        <NostrFeed
          key={i}
          content={feed.content}
          created_at={feed.created_at}
          hashtags={feed.tags.filter((t) => t[0] === "t").map((t) => t[1])}
          user={{
            name:
              users[feed.pubkey]?.name ??
              `${nip19.npubEncode(feed.pubkey).slice(0, 12)}...`,
            image:
              users[feed.pubkey]?.picture ??
              `https://api.dicebear.com/5.x/identicon/svg?seed=${feed.pubkey}`,
            pubkey: feed.pubkey,
          }}
        />
      ))}
    </div>
  );
}

export default NostrFeedList;

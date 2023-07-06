import "./NostrFeed.css"

interface Props {
  content: string;
  // user: {
  //   name: string;
  //   image: string;
  //   pubkey: string;
  // };
  created_at: number;
  hashtags: string[];
}

export default function NostrFeed({
  content,
  // user,
  created_at,
  hashtags,
}: Props) {
  return (
    <div className="nostr_feed">
      <div className="nostr_feed_header">
        <img
          src={"https://pbs.twimg.com/profile_images/1557656097409929216/x7JTvjC-_400x400.jpg"}
          alt="note"
          className="avatar"
        />
        <div>
          <a
            // href={`https://nostr.guru/p/${user.pubkey}`}
            className="nostr_feed_title"
            target="_blank"
            rel="noreferrer"
          >
            {/* {user.name} */} Tobi Ojuolape
          </a>
          <p className="nostr_feed_date">
            {new Date(created_at * 1000).toISOString().split("T")[0]}
          </p>
        </div>
      </div>
      <p>{content}</p>
      <ul className="nostr_tags">
        {hashtags
          .filter((t) => hashtags.indexOf(t) === hashtags.lastIndexOf(t))
          .map((hashtag) => (
            <li
              key={hashtag}
              className="nostr_tag"
            >
              #{hashtag}
            </li>
          ))}
      </ul>
    </div>
  );
}

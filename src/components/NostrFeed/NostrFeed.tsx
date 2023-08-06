import Content from "./Content";
import "./NostrFeed.css"
import moment from "moment";
import { NostrFeedProps } from "../../types/interfaces";

export default function NostrFeed({
  content,
  user,
  created_at,
  hashtags,
}: NostrFeedProps) {
  return (
    <div className="nostr_feed">
      <div className="nostr_feed_header">
        <img
          src={user.image}
          alt="note"
          className="avatar"
        />
        <div>
          <a
            href={`https://nostr.guru/p/${user.pubkey}`}
            className="nostr_feed_title"
            target="_blank"
            rel="noreferrer"
          >
            {user.name}
          </a>
          <p className="nostr_feed_date">
            {moment(created_at*1000).startOf('hour').fromNow()}
          </p>
        </div>
      </div>
      <Content content={content}/>
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

import NostrFeed from "./NostrFeed"


function NostrFeedList() {
  return (
    <div className="nostr-feed-list">
        <NostrFeed content="Hello" created_at={164545454545} hashtags={["Bitcoin","Nostr"]}  />
    </div>
  )
}

export default NostrFeedList
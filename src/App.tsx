import './App.css'
import SharePost from './components/SharePost/SharePost'
import NostrFeedList from './components/NostrFeed/NostrFeedList'
import NostrTags from './components/NostrTags/NostrTags'
import { SimplePool, Event } from "nostr-tools";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { insertEventIntoDescendingList } from './helpers/helper';
import NostrSkeletonList from './components/Loader/NostrSkeleton';



export const RELAYS = [
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.drss.io",
  "wss://nostr.swiss-enigma.ch",
  "wss://relay.damus.io",
];

export interface User {
  name?: string;
  about?: string;
  picture?: string;
  nip05?: string;
}

function App() {
  const [pool, setPool] = useState<SimplePool | null>(null);

  const [eventsImmediate, setEvents] = useState<Event[]>([]);

  const [events] = useDebounce(eventsImmediate, 1500);

  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading,setLoading] = useState(true)

  const feedsFetched = useRef<Record<string, boolean>>({});


    // setup a relays pool

    useEffect(() => {
      const _pool = new SimplePool();
      setPool(_pool);
  
      return () => {
        _pool.close(RELAYS);
      };
    }, []);

     // subscribe to some events
  useEffect(() => {
    if (!pool) return;

    setEvents([]);
    const sub = pool.sub(RELAYS, [
      {
        kinds: [1],
        limit: 20,
        "#t": ['bitcoin','sphinx'],
      },
    ]);

    sub.on("event", (event: Event) => {
      setEvents((events) => insertEventIntoDescendingList(events, event));
    });

    return () => {
      sub.unsub();
    };
  }, [ pool]);

  useEffect(() => {
    if (!pool) return;

    const pubkeysToFetch = events
      .filter((event) => feedsFetched.current[event.pubkey] !== true)
      .map((event) => event.pubkey);

    pubkeysToFetch.forEach(
      (pubkey) => (feedsFetched.current[pubkey] = true)
    );

    const sub = pool.sub(RELAYS, [
      {
        kinds: [0],
        authors: pubkeysToFetch,
      },
    ]);

    sub.on("event", (event: Event) => {
      const metadata = JSON.parse(event.content) as User;

      setUsers((cur) => ({
        ...cur,
        [event.pubkey]: metadata,
      }));
      setLoading(false)
    });

    sub.on("eose", () => {
      sub.unsub();
    });

    return () => {};
  }, [events, pool]);

  if (!pool) return null;


  return (
    <>
     <div className="nostr-container">
      <div className="nostr-feeds">
      <SharePost />

      {/* loading state to show before feeds */}
      <NostrSkeletonList isLoading={loading}/>

      <NostrFeedList users={users} feeds={events}/>
      </div>
      <div>
        <NostrTags/>
      </div>
     </div>
    </>
  )
}

export default App

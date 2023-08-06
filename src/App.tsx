import './App.css'
import SharePost from './components/SharePost/SharePost'
import NostrFeedList from './components/NostrFeed/NostrFeedList'
import NostrTags from './components/NostrTags/NostrTags'
import { SimplePool, Event } from "nostr-tools";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { insertEventIntoDescendingList } from './helpers/helper';
import NostrSkeletonList from './components/Loader/NostrSkeleton';
import { Toaster } from 'react-hot-toast';
import NostrTagMobile from './components/NostrTags/NostrTagMobile';
import { User } from './types/interfaces';

export const RELAYS = [
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.drss.io",
  "wss://nostr.swiss-enigma.ch",
  "wss://relay.damus.io",
];

function App() {
  const [pool, setPool] = useState<SimplePool | null>(null);

  const [eventsImmediate, setEvents] = useState<Event[]>([]);

  const [events] = useDebounce(eventsImmediate, 1500);

  const [users, setUsers] = useState<Record<string, User>>({});
  const [tags,setTags] = useState(['bitcoin','sphinx'])
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
        "#t": tags,
      },
    ]);

    sub.on("event", (event: Event) => {
      setEvents((events) => insertEventIntoDescendingList(events, event));
    });

    return () => {
      sub.unsub();
    };
  }, [tags,pool]);

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


  const setNewTag = (e:string) =>{
    setTags([e]) 
    setLoading(true)
  }


  return (
    <>
     <div className="nostr-container">
      <div className="nostr-feeds">
      <SharePost hashtags={tags} pool={pool}/>

      {/* loading state to show before feeds */}
      {/* Mobile Tags */}
      <div>
        <NostrTagMobile setTags={(e:string)=>setNewTag(e)}/>
      </div>

      <NostrSkeletonList isLoading={loading}/>

      <NostrFeedList users={users} feeds={events}/>
      </div>
      <div>
        <NostrTags setTags={(e:string)=>setNewTag(e)}/>
      </div>
     </div>
     <Toaster/>
    </>
  )
}

export default App

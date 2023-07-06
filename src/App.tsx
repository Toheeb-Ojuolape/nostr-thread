import './App.css'
import SharePost from './components/SharePost/SharePost'
import NostrFeedList from './components/NostrFeed/NostrFeedList'
import NostrTags from './components/NostrTags/NostrTags'


function App() {
  return (
    <>
     <div className="nostr-container">
      <div className="nostr-feeds">
      <SharePost />
      <NostrFeedList />
      </div>
      <div>
        <NostrTags />
      </div>
     </div>
    </>
  )
}

export default App

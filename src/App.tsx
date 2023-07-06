import './App.css'
import SharePost from './components/SharePost/SharePost'
import NostrFeedList from './components/NostrFeed/NostrFeedList'
import NostrTags from './components/NostrTags/NostrTags'


function App() {
  return (
    <>
     <div>
      <SharePost />
      <NostrFeedList />
      <NostrTags />
     </div>
    </>
  )
}

export default App

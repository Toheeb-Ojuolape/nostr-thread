import './App.css'
import SharePost from './components/SharePost/SharePost'
import NostrFeed from './components/NostrFeed/NostrFeed'
import NostrTags from './components/NostrTags/NostrTags'


function App() {
  return (
    <>
     <div>
      <SharePost />
      <NostrFeed />
      <NostrTags />
     </div>
    </>
  )
}

export default App

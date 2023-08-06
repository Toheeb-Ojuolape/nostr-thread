import tags from "../../data/tags.json"
import "./NostrTags.css"
import { TagProps,NostrTags } from "../../types/interfaces"

const Tag = ({tag,setTags}:TagProps) => {
  return (
    <div onClick={()=>setTags(tag.slug)} className="nostr-tag-item">
    <div className="nostr-tag">
      <span>Trending in Bitcoin</span>
      <h3>{tag.name}</h3>
      </div>
    </div>

  )
}

function NostrTags({setTags}:NostrTags) {
  return (
    <div className="hidden-mobile nostr-tag-list">
      <h3 style={{padding:"5px 15px"}}>Trends for You</h3>
      <div className="grid">
      {
        tags.map((tag,i)=>(
          <Tag tag={tag} key={i} setTags={setTags} />
        ))
      }
      </div>
    </div>
  )
}

export default NostrTags
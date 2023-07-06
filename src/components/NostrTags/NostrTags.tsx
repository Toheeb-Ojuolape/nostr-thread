import tags from "../../data/tags.json"
import "./NostrTags.css"

interface Tag{
  name:string,
  color:string,
  id:number
}

interface TagProps{
  tag:Tag
}

const Tag = ({tag}:TagProps) => {
  return (
    <div className="nostr-tag-item">
    <div className="nostr-tag">
      <span>Trending in Bitcoin</span>
      <h3>{tag.name}</h3>
      </div>
    </div>

  )
}

function NostrTags() {
  return (
    <div className="nostr-tag-list">
      <h3 style={{padding:"5px 15px"}}>Trends for You</h3>
      <div className="grid">
      {
        tags.map((tag,i)=>(
          <Tag tag={tag} key={i} />
        ))
      }
      </div>
    </div>
  )
}

export default NostrTags
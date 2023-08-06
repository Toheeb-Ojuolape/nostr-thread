import tags from "../../data/tags.json"
import { TagProps,NostrTags } from "../../types/interfaces"


function TagChip({tag,setTags}:TagProps){
    return (
        <div className="tag-chip" onClick={()=>setTags(tag.slug)}>{tag.name}</div>
    )
}

function NostrTagMobile({setTags}:NostrTags) {
  return (
    <div className="tag-mobile">
        {tags.map((tag,i)=>(
            <TagChip tag={tag} key={i} setTags={setTags}/>
        ))}
    </div>
  )
}

export default NostrTagMobile
import SkeletonLoader from "./Skeleton"
import feeds from "../../data/feeds.json"
import { SkeletonFeed,NostrSkeletonListProps} from "../../types/interfaces"


function NostrSkeleton({}:SkeletonFeed) {
  return (
    <div>
       <div className="nostr_feed">
      <div className="nostr_feed_header">
        <SkeletonLoader height={"40px"} width={"40px"} border={"50%"}/>
        <div>
            <SkeletonLoader height={"10px"} width={"150px"} border={"0px"}/>
          <p style={{marginTop:"3px"}}>
          <SkeletonLoader height={"9px"} width={"60px"} border={"0px"}/>
          </p>
        </div>
      </div>
      <p className="skeleton-text">
        <SkeletonLoader height={"10px"} width={"100%"} border={"0px"}/>
        <SkeletonLoader height={"10px"} width={"100%"} border={"0px"}/>
        <SkeletonLoader height={"10px"} width={"100%"} border={"0px"}/>
      </p>
      
    </div>
    </div>
  )
}



function NostrSkeletonList({isLoading}:NostrSkeletonListProps){
    return(
        <>
        {
            isLoading && feeds.map((feed:any,i:number)=>(
                <NostrSkeleton feed={feed} key={i}/>
            ))
        }
        </>
    )
    
}



export default NostrSkeletonList



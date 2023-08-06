import './SkeletonLoader.css'; // Import CSS file for styling
import { SkeletonProps } from '../../types/interfaces';



const SkeletonLoader = ({width,height,border}:SkeletonProps) => {
  return (
    <div className="skeleton-loader" style={{width:width,height:height,borderRadius:border}}>
      <div className="skeleton-loader__content"></div>
    </div>
  );
};

export default SkeletonLoader;

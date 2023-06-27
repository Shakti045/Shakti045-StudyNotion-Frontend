import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src,className}) => {
    return (
        <LazyLoadImage
            alt="StudyNotionImage"
            effect="blur"
            className={className}
            src={src}
        />
    );
};

export default Img;
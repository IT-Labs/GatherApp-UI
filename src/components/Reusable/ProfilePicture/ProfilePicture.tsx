// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

// styles
import { SProfilePicture } from "./styles";

interface IProps {
  image: string | null;
  iconStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
}

const ProfilePicture = ({ image, iconStyle, imageStyle }: IProps) => {
  return image !== null ? (
    <SProfilePicture src={image} customStyles={imageStyle} />
  ) : (
    <FontAwesomeIcon icon={faUserCircle} size="2x" style={iconStyle} />
  );
};

ProfilePicture.defaultProps = {
  iconStyle: {},
  imageStyle: {},
};

export default ProfilePicture;

import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/helperFuntions";

const useMoveToHome = () => {
  const navigate = useNavigate();

  return () => {
    scrollToTop();
    setTimeout(() => {
      // window.location.reload(true);
      navigate("/");
    }, 1000);
  };
};

export default useMoveToHome;

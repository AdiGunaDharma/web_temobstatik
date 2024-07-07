import "../biodata.css";
import {useNavigate} from "react-router-dom";

function Back() {
  const history = useNavigate();
  return (
    <div className="backbio">
      <button onClick={() => history("/")}>&lt;</button>
    </div>
  );
}
export default Back;

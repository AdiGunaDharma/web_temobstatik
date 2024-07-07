import { useEffect, useState } from "react";
import "../periksa.css";
import Image from "../logofix_white.png";
import { auth, realtimedb } from "../Firebase";
import { ref, get, child } from "firebase/database";
import Back from "./back";
import { useUserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card } from "@nextui-org/react";

function Periksa() {
  const [axialLength, setAxialLength] = useState(0);
  const [coroidalThickness, setCoroidalThickness] = useState(0);
  const [status, setStatus] = useState("");
  const refDb = ref(realtimedb);
  const history = useNavigate();
  const { user } = useUserAuth();

  useEffect(() => {
    if (user?.uid) {
      get(child(refDb, user.uid))
        .then((res) => {
          if (res.exists()) {
            const data = res.val();
            setAxialLength(data["axialLength"]);
            setCoroidalThickness(data["coroidalThickness"]);
            setStatus(data["status"]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    console.log("user", user);
  }, [user]);

  return (
    <div className="periksa">
      <Back />

      <div className="periksaimg">
        <img src={Image} className="prkimage" alt="logo_glassist" />
      </div>

      <div className="periksa-cek">
        <form action="#" className="periksa-form">
          <div className="top">
            <h1 className="title">PERIKSA NEUROPATI DIABETIK</h1>
          </div>

          <div className="bottom">
            <Card>
              <Card.Header>Axial Length (mm)</Card.Header>
              <Card.Body>{axialLength}</Card.Body>
            </Card>

            <Card>
              <Card.Header>Coroidal Thickness (µm)</Card.Header>
              <Card.Body>{coroidalThickness}</Card.Body>
            </Card>

            <p className={`status-${status === "membaik" ? "membaik" : "memburuk"}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Periksa;

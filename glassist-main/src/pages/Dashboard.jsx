import React, {useState} from "react";
import {Card, Button, Form, Spinner, Navbar} from "react-bootstrap";
import {useUserAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {query, getDoc, doc, updateDoc} from "firebase/firestore";
import {database} from "../Firebase";
import {auth} from "../Firebase";
import {color} from "../helper";
import Logo from "../assets/glassist_logo.png";
import {Link} from "react-router-dom";

const MyForm = ({
  label,
  value,
  onChange,
  type,
  dataMap,
  disabled,
  placeholder,
}) => {
  return (
    <Form.Group style={{marginTop: 10}}>
      {type !== "hide" && (
        <>
          {type !== "date" && <Form.Label>{label}</Form.Label>}
          {type === "text" && (
            <Form.Control
              value={value}
              onChange={onChange}
              disabled={disabled}
              style={{width: 250}}
              placeholder={placeholder}
            />
          )}
          {type === "select" && (
            <Form.Select
              onChange={onChange}
              disabled={disabled}
              style={{width: 250}}
              value={value}
            >
              {dataMap.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          )}
          {type === "date" && (
            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
              <span>{label}</span>
              <input
                type="date"
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                style={{
                  width: 250,
                  height: 35,
                  paddingLeft: 7,
                  border: `1px solid ${color.gray}`,
                  borderRadius: 4,
                }}
              />
            </div>
          )}
        </>
      )}
    </Form.Group>
  );
};

export default function Dashboard() {
  const [error, setError] = useState("");
  const {logout} = useUserAuth();
  const [navBar, setNavbar] = useState({
    home: color.white,
    riwayat: color.white,
    periksa: color.white,
  });
  const history = useNavigate();
  const [userName, setUserName] = useState(null);
  const [disabledInput, setDisabledInput] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [renderPage, setRenderPage] = useState(false);

  const [inputForm, setInputForm] = useState({
    nama: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    alergi: "",
    kacamata: "",
    lensa_kanan: "",
    lensa_kiri: "",
    buta_warna: "",
    penyakit: "",
    riwayat_operasi: "",
  });

  const [beforeEdit, setBeforeEdit] = useState({
    nama: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    alergi: "",
    kacamata: "",
    lensa_kanan: "",
    lensa_kiri: "",
    buta_warna: "",
    penyakit: "",
    riwayat_operasi: "",
  });

  const [historyCheck, setHistoryCheck] = useState({
    diabetesKencingManis: false,
    hipertensi: false,
    kolesterol: false,
    gangguanGinjal: false,
  });

  const [beforeCheck, setBeforeCheck] = useState({
    diabetesKencingManis: false,
    hipertensi: false,
    kolesterol: false,
    gangguanGinjal: false,
  });

  const labelInput = [
    "Nama",
    "Jenis Kelamin",
    "Tanggal Lahir",
    "Alergi",
    "Kacamata",
    "Lensa Kanan",
    "Lensa Kiri",
    "Buta Warna",
    "Penyakit Mata yang diderita",
    "Riwayat Operasi",
  ];

  const placeholderList = [
    "Nama...",
    "Jenis Kelamin...",
    "Tanggal Lahir...",
    "boleh di kosongkan",
    "Kacamata...",
    "isi dengan jenis lensa",
    "isi dengan jenis lensa",
    "Buta Warna",
    "boleh di kosongkan",
    "boleh di kosongkan",
  ];

  const valueTypes = [
    "text",
    "select",
    "date",
    "text",
    "select",
    "hide",
    "hide",
    "select",
    "text",
    "text",
  ];

  const valueTypes2 = [
    "text",
    "select",
    "date",
    "text",
    "select",
    "text",
    "text",
    "select",
    "text",
    "text",
  ];

  const [valueType, setValueType] = useState(valueTypes);

  const optionKacamata = [
    {name: "Pilih ya atau tidak", value: ""},
    {name: "Ya", value: "Ya"},
    {name: "Tidak", value: "Tidak"},
  ];

  const optionJK = [
    {name: "Pilih jenis kelamin", value: ""},
    {name: "Laki-laki", value: "Laki-laki"},
    {name: "Perempuan", value: "Perempuan"},
  ];

  const optionRiwayat = [
    {name: "Diabetes / Kencing Manis", key: "diabetesKencingManis"},
    {name: "Hipertensi", key: "hipertensi"},
    {name: "Kolesterol", key: "kolesterol"},
    {name: "Gangguan Ginjal", key: "gangguanGinjal"},
  ];

  const onChangeCheckbox = (key, e) => {
    setHistoryCheck({...historyCheck, [key]: !e});
    console.log(key, !e);
  };

  const onChangeInput = (key, e) => {
    setInputForm({...inputForm, [key]: e.target.value});
    console.log(key, e.target.value);
  };

  const onEdit = () => setDisabledInput(false);

  const selectData = (label) => {
    switch (label) {
      case "jenis_kelamin":
        return optionJK;
      case "kacamata":
        return optionKacamata;
      case "buta_warna":
        return optionKacamata;
      default:
        return "";
    }
  };

  async function handleLogout() {
    setError("");

    try {
      // await logout();
      await auth.signOut();
      history("/");
    } catch {
      setError("Failed to log out");
    }
  }

  const convertToUIText = (data) => {
    const obj = {
      nama: "",
      jenis_kelamin: "",
      tanggal_lahir: "",
      alergi: "",
      kacamata: "",
      lensa_kanan: "",
      lensa_kiri: "",
      buta_warna: "",
      penyakit: "",
      riwayat_operasi: "",
    };

    obj.nama = data?.nama ? data?.nama : "";
    obj.jenis_kelamin = data?.jenis_kelamin ? data?.jenis_kelamin : "";
    obj.tanggal_lahir = data?.tanggal_lahir ? data?.tanggal_lahir : "";
    obj.alergi = data?.alergi ? data?.alergi : "";
    obj.kacamata = data?.kacamata ? data?.kacamata : "";
    obj.lensa_kanan = data?.lensa_kanan ? data?.lensa_kanan : "";
    obj.lensa_kiri = data?.lensa_kiri ? data?.lensa_kiri : "";
    obj.buta_warna = data?.buta_warna ? data?.buta_warna : "";
    obj.penyakit = data?.penyakit ? data?.penyakit : "";
    obj.riwayat_operasi = data?.riwayat_operasi ? data?.riwayat_operasi : "";

    console.log(obj);
    return obj;
  };

  const convertToUICheck = (data) => {
    const obj = {
      diabetesKencingManis: false,
      hipertensi: false,
      kolesterol: false,
      gangguanGinjal: false,
    };

    obj.diabetesKencingManis = data?.diabetesKencingManis
      ? data?.diabetesKencingManis
      : false;
    obj.kolesterol = data?.kolesterol ? data?.kolesterol : false;
    obj.hipertensi = data?.hipertensi ? data?.hipertensi : false;
    obj.gangguanGinjal = data?.gangguanGinjal ? data?.gangguanGinjal : false;

    return obj;
  };

  const onSave = async () => {
    const arrError = [];
    Object.values(inputForm).map((item, index) => {
      if (labelInput[index] === "Alergi") return;
      if (labelInput[index] === "Penyakit Mata yang diderita") return;
      if (labelInput[index] === "Riwayat Operasi") return;
      if (valueType[index] === "hide") return;
      if (!item)
        arrError.push(
          valueTypes[index] !== "select"
            ? `${labelInput[index]} harus di isi!\n`
            : `${labelInput[index]} pilih salah satu!\n`
        );
    });
    if (arrError.length > 0) return alert(arrError.join(""));

    await updateDoc(doc(database, "users", auth.currentUser.uid), {
      ...inputForm,
      ...historyCheck,
    }).then(() => {
      setDisabledInput(true);
      setIsLoading(true);
      setRenderPage(!renderPage);
      alert("success mengupdate Biodata");
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser) {
        const myQuery = query(doc(database, "users", auth.currentUser.uid));
        getDoc(myQuery)
          .then((res) => {
            setUserName(res.data().nama);
            setInputForm(convertToUIText(res.data()));
            setBeforeEdit(convertToUIText(res.data()));
            setHistoryCheck(convertToUICheck(res.data()));
            setBeforeCheck(convertToUICheck(res.data()));
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      } else history("/");
    }, 3000);
  }, [auth.currentUser, renderPage]);

  useEffect(() => {
    if (inputForm.kacamata === "Ya") {
      setValueType(valueTypes2);
    } else {
      setValueType(valueTypes);
    }
  }, [inputForm.kacamata]);

  return (
    <>
      {!isLoading ? (
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* header */}
          <div
            style={{
              height: 60,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 10px",
              boxShadow: "0px 6px 21px -7px rgba(0,0,0,0.75)",
              background: color.lavender,
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
              }}
            >
              <img
                onClick={() => history("/")}
                src={Logo}
                alt="logo glassist"
                style={{height: 100, cursor: "pointer"}}
              />
              <Link
                to={"/"}
                style={{
                  cursor: "pointer",
                  color: navBar.home,
                  textDecoration: "none",
                }}
                onMouseOut={() => setNavbar({...navBar, home: color.white})}
                onMouseOver={() => setNavbar({...navBar, home: color.sky})}
              >
                Home
              </Link>
              <Link
                to={"/riwayat"}
                style={{
                  cursor: "pointer",
                  color: navBar.riwayat,
                  textDecoration: "none",
                }}
                onMouseOut={() => setNavbar({...navBar, riwayat: color.white})}
                onMouseOver={() => setNavbar({...navBar, riwayat: color.sky})}
              >
                Riwayat
              </Link>
              <Link
                to={"/periksa"}
                style={{
                  cursor: "pointer",
                  color: navBar.periksa,
                  textDecoration: "none",
                }}
                onMouseOut={() => setNavbar({...navBar, periksa: color.white})}
                onMouseOver={() => setNavbar({...navBar, periksa: color.sky})}
              >
                Periksa
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
              }}
            >
              <span>{userName ? userName : ""}</span>
              <Button variant="danger" onClick={handleLogout}>
                logout
              </Button>
            </div>
          </div>

          {/* content */}
          <div
            style={{
              marginTop: 30,
              display: "flex",
              minHeight: "calc(100vh - 80px)",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 50,
            }}
          >
            <Card style={{width: 720, padding: "20px 30px"}}>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Biodata
                <Button variant="outline-success" onClick={onEdit}>
                  Edit
                </Button>
              </Card.Title>
              <Card.Body>
                <Form>
                  {Object.keys(inputForm).map((item, index) => (
                    <MyForm
                      key={index}
                      value={Object.values(inputForm)[index]}
                      label={labelInput[index]}
                      onChange={(e) => onChangeInput(item, e)}
                      type={valueType[index]}
                      disabled={disabledInput}
                      dataMap={selectData(item)}
                      placeholder={placeholderList[index]}
                    />
                  ))}
                  <Form.Group style={{marginTop: 20}}>
                    <Form.Label style={{width: 250}}>
                      Riwayat Penyakit Lain
                    </Form.Label>
                    {optionRiwayat.map((item, index) => (
                      <Form.Check
                        style={{width: 250}}
                        key={index}
                        type="checkbox"
                        label={item.name}
                        value={historyCheck[item.key]}
                        checked={historyCheck[item.key]}
                        onChange={() =>
                          onChangeCheckbox(item.key, historyCheck[item.key])
                        }
                        disabled={disabledInput}
                      />
                    ))}
                  </Form.Group>
                </Form>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                  }}
                >
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setInputForm(beforeEdit);
                      setHistoryCheck(beforeCheck);
                      setDisabledInput(true);
                    }}
                    disabled={disabledInput}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="primary"
                    onClick={onSave}
                    disabled={disabledInput}
                  >
                    Simpan
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="border"
            role={"status"}
            variant="info"
            style={{height: 200, width: 200}}
          />
        </div>
      )}
    </>
  );
}

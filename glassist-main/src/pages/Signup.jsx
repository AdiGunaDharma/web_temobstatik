import React, {useRef, useState, useEffect} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useUserAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {addDoc, collection, setDoc, doc} from "firebase/firestore";
import {database} from "../Firebase";
import {auth} from "../Firebase";
import {onAuthStateChanged} from "firebase/auth";
import LoadingScreen from "./LoadingScreen";

export default function Signup() {
  const fullName = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {signUp} = useUserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();

  const [jk, setjk] = useState("");

  const optionJK = [
    {name: "Pilih jenis kelamin", value: ""},
    {name: "Laki-laki", value: "Laki-laki"},
    {name: "Perempuan", value: "Perempuan"},
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      onAuthStateChanged(auth, async (user) => {
        await setDoc(doc(database, "users", user.uid), {
          userId: user.uid,
          email: user.email,
          nama: fullName.current.value,
          jenis_kelamin: jk,
        });
      });
      history("/dashboard");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser) history("/dashboard");
      else setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 100
          }}
        >
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Daftar</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form
                onSubmit={handleSubmit}
                style={{display: "flex", flexDirection: "column", gap: 10}}
              >
                <Form.Group id="namaLengkap">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    ref={fullName}
                    placeholder="nama..."
                    required
                    style={{width: 230}}
                  />
                </Form.Group>
                <Form.Group id="jenisKelamin">
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select
                    onChange={(e) => setjk(e.target.value)}
                    style={{width: 230}}
                    value={jk}
                  >
                    {optionJK.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    style={{width: 230}}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                    style={{width: 230}}
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Konfirmasi Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                    style={{width: 230}}
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                  style={{marginTop: 15}}
                >
                  Daftar
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* footer */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 50,
            }}
          >
            <div className="w-100 text-center mt-2">
              Sudah pernah Daftar? <Link to="/login">Masuk</Link>
            </div>
            <div className="w-100 text-center mt-2">
              Kembali ke <Link to="/">Beranda</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, {useRef, useState, useEffect} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useUserAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../Firebase";
import LoadingScreen from "./LoadingScreen";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {logIn} = useUserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      history("/dashboard");
    } catch (err) {
      setError(err.message);
      console.log(err);
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
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                  style={{marginTop: 15}}
                >
                  Masuk
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Lupa Password?</Link>
              </div>
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
            }}
          >
            <div className="w-100 text-center mt-2">
              Belum buat akun? <Link to="/signup">Sign Up</Link>
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

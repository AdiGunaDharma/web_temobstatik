import React from "react";
import "../style.css";
import Image from "../logofix_white.png";
import AboutImage from "../temobstatikalat.png"; // Pastikan path ini benar
import Profile from "../profile.png";
import { auth } from "../Firebase";
import { Link } from "react-router-dom";
import Dev1 from "../dev1.png";
import Dev2 from "../dev2.png";
import Dev3 from "../dev3.png";
import Dev4 from "../dev4.png";
import Dev5 from "../dev5.png";

import photo1 from "../photo1.jpg";
import photo2 from "../photo2.jpg";
import photo3 from "../photo3.jpg"; // Sesuaikan path dengan struktur proyek Anda


function Home() {
  const user = auth.currentUser;
  const developers = [
    { 
      name: "Dewa", 
      role: (
        <div>
          Ketua Tim <br />
          (Teknik Mesin 22')
        </div>
      ),
      imgSrc: Dev1 
    },
    { 
      name: "Adi", 
      role: (
        <div>
          ML Developer <br />
          (Teknik Mesin 21')
        </div>
      ),
      imgSrc: Dev2 
    },
    { 
      name: "Raisa", 
      role: (
        <div>
          Data analisis <br />
          (Pendidikan Dokter 22')
        </div>
      ),
      imgSrc: Dev3 
    },
    { 
      name: "Yoga", 
      role: (
        <div>
          Data Analisis <br />
          (Pendidikan Dokter 22')
        </div>
      ),
      imgSrc: Dev4 
    },
    { 
      name: "Febri", 
      role: (
        <div>
          Desain Manufaktur <br />
          (Teknik Mesin 21')
        </div>
      ),
      imgSrc: Dev5 
    },
  ];

  // Informasi penyakit dan langkah-langkah pencegahannya
  const diseaseInfo = [
    {
      Penyebab: (
        <ul>
          <li>Gangguan pada pembuluh darah di retina</li>
        </ul>
      ),
      prevention: (
        <ul>
          <li>Penglihatan menurun secara bertahap</li>
          <li>Pembengkakan atau penumpukan cairan di retina</li>
          <li>Terlepasnya retina</li>
        </ul>
      ),
    },
    // Tambahkan info penyakit lainnya sesuai kebutuhan
  ];

  const tutorialSteps = [
    {
      title: "Hidupkan Alat",
      imgSrc: photo1, // Replace "path_to_image1.jpg" with the actual path to your image
    },
    {
      title: "Lakukan pengambilan gambar mata",
      imgSrc: photo2, // Replace "path_to_image2.jpg" with the actual path to your image
    },
    {
      title: "Lihat hasil pengukuran pada halaman PERIKSA",
      imgSrc: photo3, // Replace "path_to_image3.jpg" with the actual path to your image
    },
    // Add more tutorial steps as needed
  ];

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="profile">
          <Link to={!user ? "/signup" : "/dashboard"}>
            <img src={Profile} className="profileLogo" alt="profile" />
          </Link>
        </div>
        <div className="home">
          <div className="button">
            <form action="#" className="button-form">
              <a href="/periksa">Periksa</a>
              <a href="/riwayat">Riwayat</a>
              <a href="/biodata">Biodata</a>
            </form>
          </div>
          <div className="panels-home">
            <div className="panel left-panel">
              <img src={Image} className="glassist" alt="logo_glassist" />
            </div>
          </div>
        </div>
        <section className="about">
          <img src={AboutImage} className="about-image" alt="about us" />
          <h2>Tentang Kami</h2>
          <p>
            Temobstatik adalah sebuah sistem yang terintegrasi untuk membantu proses monitoring pasien penderita retinopati diabetik.
          </p>
        </section>
        {/* Penambahan bagian informasi penyakit */}
        <section className="disease-info">
          <h3>Tentang Retinopati Diabetik</h3>
          <div className="disease-list">
            {diseaseInfo.map((disease, index) => (
              <div key={index} className="disease-item">
                <p><strong>Penyebab:</strong> {disease.Penyebab}</p>
                <p><strong>Gejala:</strong> {disease.prevention}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Penambahan bagian tutorial */}
        <section className="tutorial">
          <h3>Cara Penggunaan Alat</h3>
          <div className="tutorial-steps">
            {tutorialSteps.map((step, index) => (
              <div key={index} className="tutorial-step">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <img src={step.imgSrc} alt={step.title} />
              </div>
            ))}
          </div>
        </section>
        {/* Bagian Tim Kami */}
        <section className="developers">
          <h3>Tim Kami</h3>
          <div className="developer-profiles">
            {developers.map((developer, index) => (
              <div key={index} className="developer-profile">
                <img src={developer.imgSrc} alt={developer.name} />
                <h4>{developer.name}</h4>
                <p>{developer.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <footer className="footer">
        <p>Follow us on social media</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;

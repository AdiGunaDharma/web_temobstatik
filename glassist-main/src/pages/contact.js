import React, { useState } from "react";
import { database } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";
import "../biodata.css"

function Contact() {
  const [nama, setNama] = useState([]);
  const [jk, setJk] = useState([]);
  const [lahir, setLahir] = useState([]);
  const [alergi, setAlergi] = useState([]);
  const [kacamata, setKacamata] = useState([]);
  const [lkanan, setLkanan] = useState([]);
  const [lkiri, setLkiri] = useState([]);
  const [buta_warna, setButawarna] = useState([]);
  const [penyakit, setPenyakit] = useState([]);
  const [riwayat_lain, setRiwayatlain] = useState([]);
  const [operasi, setOperasi] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(database, 'biodata_medis'), {
        nama: nama,
        jenis_kelamin: jk,
        tanggal_lahir: lahir,
        alergi: alergi,
        kacamata: kacamata,
        lensa_kanan: lkanan,
        lensa_kiri: lkiri,
        buta_warna: buta_warna,
        penyakit: penyakit,
        riwayat_lain: riwayat_lain,
        riwayat_operasi: operasi,
      });
      
    } catch (err) {
      alert(err)
    }
    
    setNama("");
    setJk("");
    setLahir("");
    setAlergi("");
    setKacamata("");
    setLkanan("");
    setLkiri("");
    setButawarna("");
    setPenyakit("");
    setRiwayatlain("");
  };

  return (
    <form className="formbio" onSubmit={handleSubmit}>
      <form className="kotak">
      <h1>BIODATA KLINIS</h1>

      <label>Nama</label>
      <input placeholder="Nama Lengkap" value={nama} onChange={(e) => setNama(e.target.value)} />

      <label>Jenis Kelamin</label>
      <input placeholder="Laki-Laki / Perempuan" value={jk} onChange={(e) => setJk(e.target.value)} />

      <label>Tanggal Lahir</label>
      <input placeholder="dd/mm/yyyy" value={lahir} onChange={(e) => setLahir(e.target.value)} />

      <label>Alergi *</label>
      <input placeholder="*jika tidak ada diisi dengan (-)" value={alergi} onChange={(e) => setAlergi(e.target.value)} />

      <label>Kacamata</label>
      <input placeholder="Ya / Tidak" value={kacamata} onChange={(e) => setKacamata(e.target.value)} />

      <label>Mata Kanan</label>
      <input placeholder="Isi dengan jenis lensa" value={lkanan} onChange={(e) => setLkanan(e.target.value)} />

      <label>Mata Kiri</label>
      <input placeholder="Isi dengan jenis lensa" value={lkiri} onChange={(e) => setLkiri(e.target.value)} />

      <label>Buta warna</label>
      <input placeholder="Ya / Tidak" value={buta_warna} onChange={(e) => setButawarna(e.target.value)} />

      <label>Penyakit Mata yang Diderita</label>
      <input placeholder="" value={penyakit} onChange={(e) => setPenyakit(e.target.value)} />

      <label>Riwayat Penyakit Lain</label>
      <input placeholder="Diabetes/Hipertensi/Kolesterol/Gangguan Ginjal" className="riwayat" value={riwayat_lain} onChange={(e) => setRiwayatlain(e.target.value)} />

      <label>Riwayat Operasi</label>
      <input placeholder="" value={operasi} onChange={(e) => setOperasi(e.target.value)} />

      <button type="submit">Submit</button>
      </form>
    </form>
  );
}

export default Contact;
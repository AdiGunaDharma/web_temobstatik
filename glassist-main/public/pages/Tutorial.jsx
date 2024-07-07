import React from "react";
import "../tutorial.css";
import Photo1 from "../photo1.jpg";
import Photo2 from "../photo2.jpg";
import Photo3 from "../photo3.jpg";
import Photo4 from "../photo4.jpg";
import { Card, Grid, Text, Row, Image, Col,Container} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const list = [
  {
    title: "Hidupkan alat dan gunakan penyangga kepala",
    img: Photo1,
  },
  {
    title: "Arahkan pandangan ke titik fokus",
    img: Photo2,
  },
  {
    title: "Tekan tombol capture sesuai mata kanan atau kiri",
    img: Photo3,
  },
  {
    title: "Tunggu beberapa saat dan lihat hasil pada halaman Periksa dan Riwayat",
    img: Photo4,
  },
];

export default function Tutorial() {
  /*const HeaderItem = ({ index }) => {
    return (
      <Card.Header>
        <Card.Image
          src="../photo1,jpg"
          objectFit="cover"
          
        />
      </Card.Header>
    );
  };
  const MockItem = ({ text }) => {
    return (
      <Card.Body>
        <Text h6 size={15} color="black">
          {text}
        </Text>
      </Card.Body>
    );
  };*/
  
  const history = useNavigate()

  return (
    <body>
      <div className="backtutor">

        {/* back button */}
        <div className="backbio">
          <button onClick={() => history("/periksa")}>&lt;</button>
        </div>

      </div>
      <h1 className="tutortitle" >Cara Penggunaan Alat</h1>
      <Container>
      <Grid.Container gap={2} justify="flex-start">
        {list.map((item, index) => (
          <Grid xs={12} sm={3} key={index}>
            {/*<Card isPressable css={{ h: "$100" }}>*/}
            {/*  <Card.Body>*/}
            {/*    <Card.Image*/}
            {/*      src={item.img}*/}
            {/*      objectFit="cover"*/}
            {/*      width="100%"*/}
            {/*      height="100%"*/}
            {/*      alt={item.title}*/}
            {/*    />*/}
            {/*  </Card.Body>*/}
            {/*  <Card.Footer css={{ justifyItems: "flex-start" }}>*/}
            {/*    <Row wrap="wrap" justify="space-between" align="center">*/}
            {/*      <Text b>{item.title}</Text>*/}
            {/*    </Row>*/}
            {/*  </Card.Footer>*/}
            {/*</Card>*/}
              <Card css={{ bg: "$black", w: "100%" }}>
                  <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                      <Col>
                          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                              Langkah {index+1}
                          </Text>
                          <Text h4 color="white">
                              {item.title}
                          </Text>
                      </Col>
                  </Card.Header>
                  <Card.Image
                      src={item.img}
                      width="100%"
                      height={540}
                      objectFit="cover"
                      alt="Card image background"
                  />
              </Card>
          </Grid>
        ))}
      </Grid.Container>
      </Container>
    </body>
    
  );
}

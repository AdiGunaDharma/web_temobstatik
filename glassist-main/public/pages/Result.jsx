import {useEffect, useState} from "react";
import "../App.css";
import {app, database} from "../Firebase";
import {collection, query, orderBy, getDocs} from "firebase/firestore";
import {Card, Grid, Text, Row, Container, Link, Table} from "@nextui-org/react";
import Back from "./back";
import {auth} from "../Firebase";
import {ref, getDownloadURL} from "firebase/storage";
import {storage} from "../Firebase";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function Result() {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refFirestore = query(
    collection(database, "ml_result_img"),
    orderBy("day")
  );

  // get image url
  const getFile = (fileName) => {
    const refFile = ref(storage, `/ml_image/result/${fileName}`);
    getDownloadURL(refFile)
      .then((url) => {
        window.open(url);
      })
      .then((err) => {
        console.log(err);
      });
  };

  // if user not logged in yet
  const notLoggedIn = () => {
    alert(
      "silahkan login terlebih dahulu!\nuntuk user baru silahkan register terlebih dahulu!"
    );
    history("/");
  };

  // checking userLogin
  useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser) setIsLoading(false);
      else notLoggedIn();
    }, 3000);
  }, []);

  // get history table
  useEffect(() => {
    getDocs(refFirestore).then((data) => {
      console.log(data.docs[0].data());
      if (auth.currentUser.email !== "administrator@admin.com") {
        const arrOfData = [];
        data.docs.map((item) => {
          if (item.data()?.emailUser === auth.currentUser.email)
            arrOfData.push({
              ...item.data(),
              id: item.id,
              dateTime: convertDateTime(
                item.data().day,
                item.data().month,
                item.data().year,
                item.data().c_time,
                "epoch"
              ),
            });
        });
        const sortDesc = arrOfData.sort((a, b) => b.dateTime - a.dateTime);
        setData(sortDesc);
      } else {
        const allData = [];
        data.docs.map((item) => {
          allData.push({
            ...item.data(),
            id: item.id,
            dateTime: convertDateTime(
              item.data().day,
              item.data().month,
              item.data().year,
              item.data().c_time,
              "epoch"
            ),
          });
        });

        const sortDesc = allData.sort((a, b) => b.dateTime - a.dateTime);
        setData(sortDesc);
      }
    });
  }, []);

  const convertDateTime = (date, month, year, times, type) => {
    let index = 0;
    const hours = [];
    const minutes = [];
    const seconds = [];
    for (const time of times) {
      if (index <= 1) hours.push(time);
      if (index > 1 && index < 4) minutes.push(time);
      if (index > 3) seconds.push(time);
      index += 1;
    }
    const joinTimes = `${hours.join("")}:${minutes.join("")}:${seconds.join(
      ""
    )}`;
    // const converted = moment(`${year}/${month}/${date} ${joinTimes}`).format("DD/MM/YYYY HH:MM:SS")
    if (type === "epoch")
      return new Date(`${year}/${month}/${date} ${joinTimes}`).getTime();
    if (type === "view") return `${date}/${month}/${year} ${joinTimes}`;
  };

  console.log(data);

  const headerStyles = {background: "#9d6cae", color: "White"};

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <body>
          <div>
            <Back />
            <Container>
              <div>
                <Text
                  h1
                  css={{
                    textAlign: "center",
                    color: "#9d6cae",
                    paddingBottom: "3%",
                    paddingTop: "2%",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  RIWAYAT PENGUJIAN
                </Text>
              </div>
              <div>
                <Table
                  aria-label="Example table with static content"
                  css={{
                    height: "auto",
                    minWidth: "100%",
                  }}
                >
                  <Table.Header>
                    <Table.Column css={headerStyles}>ID</Table.Column>
                    <Table.Column css={headerStyles}>Tanggal</Table.Column>
                    <Table.Column css={headerStyles}>TD</Table.Column>
                    <Table.Column css={headerStyles}>AP</Table.Column>
                    <Table.Column css={headerStyles}>
                      Volume Okular
                    </Table.Column>
                    <Table.Column css={headerStyles}>Status</Table.Column>
                    <Table.Column css={headerStyles}></Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {data.map((item, index) => {
                      let rowStyle;

                      if (index % 2 === 1) rowStyle = "#e7eaf6";
                      return (
                        <Table.Row
                          key={index}
                          css={{background: rowStyle ? rowStyle : "White"}}
                        >
                          <Table.Cell>{item.alias}</Table.Cell>
                          {/* <Table.Cell>{item.day}/{item.month}/{item.year}{" "}{item.c_time}</Table.Cell> */}
                          <Table.Cell>
                            {convertDateTime(
                              item.day,
                              item.month,
                              item.year,
                              item.c_time,
                              "view"
                            )}{" "}
                          </Table.Cell>
                          <Table.Cell>{item.TD}</Table.Cell>
                          <Table.Cell>{item.AP}</Table.Cell>
                          <Table.Cell>
                            {Math.round(item.volume / 100) / 100}
                          </Table.Cell>
                          <Table.Cell>{item.status}</Table.Cell>
                          <Table.Cell>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() =>
                                getFile(
                                  `ml_${item.year}${item.month}${item.day}${item.c_time}.jpg`
                                )
                              }
                            >
                              Foto
                            </Button>{" "}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </Container>
          </div>
        </body>

        /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
      )}
    </>
  );
}

export default Result;

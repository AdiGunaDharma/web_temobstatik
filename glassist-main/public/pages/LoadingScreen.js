import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => {
  return (
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
  )
}

export default LoadingScreen
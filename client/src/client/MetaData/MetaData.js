import React from 'react';
import Helmet from "react-helmet";

// Helmet -> To manage changes at document head
const MetaData = ({ title }) => {
  return (
    <>
        <Helmet>
            <title>{title}</title>
        </Helmet>
    </>
  )
}

export default MetaData
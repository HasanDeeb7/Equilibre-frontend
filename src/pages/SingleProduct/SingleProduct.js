import React, { useEffect, useState } from "react";
import SingleProductOverview from "../../components/SingleProductOverview/SingleProductOverview";
import axios from "axios";

function SingleProduct() {
  const id = "65a40bd3170a175c800f88af";

  return (
    <div>
      <SingleProductOverview id={id} />
    </div>
  );
}

export default SingleProduct;

const express = require("express");
const port = 3000;
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use("/products", productRoutes);

app.listen(port, () => {
    console.log("Server is running");
});

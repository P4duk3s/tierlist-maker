import React from "react"
import "./App.scss"
import { HomePage } from "./pages/HomePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NavBar } from "./components/NavBar/NavBar"
import { Tierlist } from "./components/Tierlist/Tierlist"
import { carBrands, f1Teams } from "./lib/Tierlist-Data"

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        errorElement: <div>Something went wrong</div>,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/create",
                element: <Tierlist data={[]} />
            },
            {
                path: "/carbrands",
                element: <Tierlist data={carBrands} titleProp="Car Brands" />
            },
            {
                path: "/f1teams",
                element: <Tierlist data={f1Teams} titleProp="F1 Teams" />
            }
        ]
    }
])

function App() {

    return <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>

}

export default App

import React from "react"
import "./App.scss"
import { v4 } from "uuid"
import { HomePage } from "./pages/HomePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NavBar } from "./components/NavBar/NavBar"
import { Tierlist } from "./components/Tierlist/Tierlist"

export type IconData = {
    id: string,
    imgSrc: string,
    group: "main" | (string & {})
}

const carBrands: IconData[] = [
    {
        id: v4(),
        imgSrc: "abarth.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "alfa-romeo.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "alpine.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "aston-martin.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "audi.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "bentley.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "bmw.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "bugatti.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "chevrolet.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "citroen.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "ferrari.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "fiat.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "ford.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "honda.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "jaguar.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "lamborghini.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "lancia.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "land-rover.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "lexus.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "maserati.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "mazda.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "mini.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "merc.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "nissan.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "opel.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "peugeot.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "porsche.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "renault.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "rolls-royce.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "rover.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "saab.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "seat.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "skoda.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "subaru.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "suzuki.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "tesla.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "toyota.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "vw.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "volvo.png",
        group: "main"
    }
]

const f1Teams: IconData[] = [
    {
        id: v4(),
        imgSrc: "f1-redbull.png",
        group: "main"
    },
    {
        id: v4(),
        imgSrc: "f1-mclaren.png",
        group: "main"
    }, {
        id: v4(),
        imgSrc: "f1-ferrari.png",
        group: "main"
    }, {
        id: v4(),
        imgSrc: "f1-mercedes.png",
        group: "main"
    }, {
        id: v4(),
        imgSrc: "f1-aston-martin.png",
        group: "main"
    }, {
        id: v4(),
        imgSrc: "f1-racing-bulls.png",
        group: "main"
    }, {
        id: v4(),
        imgSrc: "f1-haas.png",
        group: "main"
    }, {
        id: v4(),
        imgSrc: "f1-williams.png",
        group: "main"
    }, {
        id: v4(),
        imgSrc: "f1-alpine.png",
        group: "main"
    }, {
        id: v4(),
        imgSrc: "f1-sauber.png",
        group: "main"
    }
]

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

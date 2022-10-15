import "./HomePage.css"

import { useRef } from "react"

function HomePage({ setName }) {

    const idRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        setName(idRef.current.value)
    }

    return (
        <>
            <header id="homeHeader">Enter Name</header>
            <form onSubmit={ handleSubmit }>
                <input type="text"
                ref={idRef}
                placeholder="Bob"
                ></input>
                <button className="btn" type="submit">Submit</button>
            </form>
        </>
    )
}

export default HomePage;
import { Accordion } from "../cmps/Accordion.jsx"

export function More() {

    return (
        <section className="more">


            <Accordion >
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo labore eveniet quam ipsa eaque sit quae unde amet, quis eum earum, aliquam corrupti? Laudantium quidem quasi saepe facere accusantium assumenda!</p>
                <button>x</button>
            </Accordion>
            <Accordion >
                <h4>!!!!!</h4>
                <button>x</button>
                <button>v</button>
            </Accordion>

            <FancyBox title="Hi" onClose={() => console.log('close')} >
                <h1>Holla</h1>
                <button>❤</button>
            </FancyBox>
            <FancyBox title="Hi" onClose={() => console.log('close')} >
                <h4>Hellooooo</h4>
                <span>🍌</span>
                <span>🍌</span>
            </FancyBox>

        </section>
    )
}


function FancyBox({ title = 'Hello', onClose, children }) {
    return (
        <div className="fancy-box">
            <button className="close-btn" onClick={onClose}>x</button>
            <h3>{title}</h3>
            {children}
        </div>
    )
}

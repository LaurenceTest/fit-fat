import "../CSS/card.css"
import Header from "../Components/header_user"
import runningWoman from "../assets/bgs/woman-running.png"
import "../CSS/dashboard.css"
import "../CSS/mainPage.css"
import { useState } from "react"

const Dashboard = ()=>{
    return(
        <div className="dashboard-page">
            <Header username="User"/>
            <div className="text-content">
                <div className="tc-text"></div>
                <img src={runningWoman} alt="Running woman" className="featured-image"/>
            </div>
            <div className="card-flex">
                <AgendaCard/>
                <TotalCard/>
            </div>
        </div>
    )
}

interface Exercise{
    name:string,
    sets?:number,
    reps?:number,
    dur?:number
}

const AgendaCard = ()=>{
    const [exercises] = useState([{name:"Push Ups",sets:10,reps:9,dur:8},{name:"Push Ups and test am I rihgt ladies? duhihdwqud overflowing",sets:10,reps:9,dur:8},{name:"Push Ups",sets:10,reps:9,dur:8}])
    return(
        <div className="card agenda-card">
            <div className="week-s-agenda">
                <button className="agenda-card-btn btn-purple">Done any?</button>
                <section className="agenda-card-design display-weight">
                    <h3>Weight</h3>
                    <div className="card weight-show">
                        <WeightChart label="Current" weight={432}/>
                        <WeightChart label="Current" weight={5}/>
                        <WeightChart label="Current" weight={6}/>
                    </div>
                </section>
            </div>
            <div className="card agenda-card-list">
                {/* FIXME: CSS add */}
                <div className="exercise-col1"></div>
                <div className="exercise-col2">Sets</div>
                <div className="exercise-col3">Reps</div>
                <div className="exercise-col4">Duration</div>
                {
                    exercises.map((exercise:Exercise)=>{
                        return(
                            <ExerciseItem {...exercise}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const ExerciseItem:React.FC<Exercise> = ({name,sets,reps,dur})=>{
    return(
        <>
            <div className="exercise-col1">{name}</div>
            <div className="exercise-col2">{sets}</div>
            <div className="exercise-col3">{reps}</div>
            <div className="exercise-col4">{dur}</div>
        </>
    )
}

const WeightChart:React.FC<{label: string, weight:number}> = ({label, weight})=>{
    return(
        <>
        <div className="printWeight">
            <div className="weight-text"><p>{label}</p></div>
            <div className="weight-circle"><p>{weight}</p></div>
        </div>
        </>
    )
}

const TotalCard = ()=>{
    return(
        <div className="card total-card">
            <header className="total-card-title">Total</header>
            <TotalCardItem value={10}>Sets</TotalCardItem>
            <TotalCardItem value={10}>Reps</TotalCardItem>
            <TotalCardItem value={10}>Time</TotalCardItem>
        </div>
    )
}

const TotalCardItem:React.FC<{children:string,value:number}> = ({children,value})=>{
    return(
        <>
            <div className="card total-card-item">
                {children}
                <div className="total-card-circle">{value}</div>
            </div>
        </>
    )
}

export default Dashboard
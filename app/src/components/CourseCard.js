import { Fragment } from 'react'

export default function CourseCard(props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src="https://placeimg.com/400/225/arch" /></figure>
        <div className="card-body">
            <h2 className="card-title">{props.title}</h2>
            <p>Course description or something goes here something something ......</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">See More</button>
            </div>
        </div>
    </div>
  )
}

import { Fragment } from 'react'
import CourseCard from '../components/CourseCard';

export default function CourseGrid() {
  return (
    <div class="place-content-center flex flex-wrap p-5 gap-4">
        <div >
          <CourseCard />
        </div>
        <div >
          <CourseCard />
        </div>
        <div >
          <CourseCard />
        </div>
        <div >
          <CourseCard />
        </div>
        <div >
          <CourseCard />
        </div>
        <div >
          <CourseCard />
        </div>
        <div >
          <CourseCard />
        </div>

       
    </div>
  )
}

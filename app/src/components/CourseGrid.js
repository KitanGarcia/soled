import { Fragment } from 'react'
import CourseCard from '../components/CourseCard';

export default function CourseGrid() {
  return (
    <div class="grid grid-cols-4 gap-4">
        <div>
          <CourseCard />
        </div>
        <div>
          <CourseCard />
        </div>
        <div>
          <CourseCard />
        </div>
        <div>
          <CourseCard />
        </div>
        <div>
          <CourseCard />
        </div>
        <div>
          <CourseCard />
        </div>
    </div>
  )
}

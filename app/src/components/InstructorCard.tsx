import { InstructorCardProps } from '../../types/InstructorCardProps';

export default function InstructorCard({
  username,
  profilePicUrl,
  backgroundPicUrl,
  numFollowing,
  numFollowers,
  numCourses,
  rating,
  listNumber,
}: InstructorCardProps) {
  const placeholder = 'https://via.placeholder.com/70x70';
  return (
    <div className="w-[440px] transition hover:delay-300 hover:shadow-md hover:border-highlight-color mx-6 bg-fg-color border-2 cursor-pointer border-card-border-color-start rounded-3xl">
      <div className="flex items-center">
        <div className="center p-6 flex items-center">
          <h1 className="leading-10 text-xl font-medium text-main-text opacity-75">
            {listNumber}
          </h1>
          <img
            className="ml-4 rounded-full h-[70px] w-[70px]"
            src={placeholder}
          />
        </div>
        <div>
          <div className="card-title pl-6">{username}</div>
        </div>
        <div className="text-secondary-text pl-10">Rating:</div>
      </div>
    </div>
  );
}

import { WrenchIcon, HeartIcon } from '@heroicons/react/24/solid';
import { CourseCardProps } from '../../types/CourseCardProps';

export default function CourseCard({
  title,
  thumbnailUrl,
  rating,
  price,
  numLessons,
}: CourseCardProps) {
  return (
    <div className="w-[400px] border-2 border-card-border-color-start bg-fg-color rounded-xl overflow-hidden">
      <div className="center p-6">
        <img className="rounded-xl h-[275px] w-[350px]" src={thumbnailUrl} />
      </div>
      <div>
        <div className="card-title pl-6">
          <p className="cursor-pointer">{title}</p>
        </div>
      </div>
      <div className="max-h-16 overflow-hidden pt-5 pl-6">
        <div className="text-secondary-text">Rating:</div>
        <strong className="text-transparent font-normal bg-clip-text bg-gradient-to-br from-solana-start to-solana-end">
          {rating}
        </strong>{' '}
      </div>
      <div className="pt-5 pb-5 pl-6 flex">
        <p className="text-secondary-text"> Tech/Community: </p>
        <WrenchIcon className="ml-1 h-6 w-6 text-main-text" />{' '}
        <WrenchIcon className="ml-1 h-6 w-6 text-main-text" />{' '}
        <WrenchIcon className="ml-1 h-6 w-6 text-main-text" />{' '}
      </div>

      <div className="flex place-content-between ml-0 pl-6 border-t-2 border-dashed border-t-card-border-color-start">
        <div className="flex-row">
          <div className="card-title pt-2 pb-2">
            {price} SOL ~ {34 * price}$
          </div>
          <div className="flex gap-4 text-secondary-text">
            <p className="truncate"> {numLessons} lessons</p>
            <p className="truncate"> |</p>
            <p className="truncate">6 practices </p>
          </div>
        </div>

        <div className="relative right-[-15px] bottom-[-15px] ">
          <button className="btn h-[90px] w-[90px] rounded-full bg-like-btn hover:bg-gradient-to-br from-solana-start to-solana-end">
            <HeartIcon className="ml-1 h-6 w-6 text-main-text offset-position" />
          </button>
        </div>
      </div>
    </div>
  );
}

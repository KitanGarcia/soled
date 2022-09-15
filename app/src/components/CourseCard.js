import { WrenchIcon, HeartIcon } from '@heroicons/react/24/solid';

export default function CourseCard(props) {
  return (
    <div className="w-[400px] bg-fg-color rounded-xl overflow-hidden">
      <div className="center p-6">
        {console.log(props.thumbnailUrl)}
        <img
          className="rounded-xl h-[275px] w-[350px]"
          src={props.thumbnailUrl}
        />
      </div>
      <div>
        <div className="card-title pl-6">{props.title}</div>
      </div>
<<<<<<< Updated upstream
      <div className="max-h-16 overflow-hidden pt-5">
=======
      <div className="max-h-16 overflow-hidden pt-5 pl-6">
>>>>>>> Stashed changes
        <div className="text-secondary-text">Rating:</div>
        <strong className="text-transparent font-normal bg-clip-text bg-gradient-to-br from-solana-start to-solana-end">
          {props.rating}
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
            {props.price} SOL ~ {34 * props.price}$
          </div>
          <div className="flex gap-4 text-secondary-text">
            <p className="truncate"> {props.lessons} lessons</p>
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

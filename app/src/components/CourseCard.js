import { Fragment } from 'react';
import { WrenchIcon, HeartIcon } from '@heroicons/react/24/solid';

export default function CourseCard() {
  return (
    <div className="card w-80 border-2 border-card-border-color-start bg-fg-color shadow-xl rounded-xl flex items-center">
      <img
        className="p-4 rounded-3xl h-[275px] w-[275px]"
        src="https://placeimg.com/400/225/arch"
      />
      <div className="card-body p-0">
        <h2 className="card-title flex flex-col">Course Title</h2>
        <p className="text-secondary-text pl-2">
          Rating: <br />
          <strong className="text-transparent font-normal bg-clip-text bg-gradient-to-br from-solana-start to-solana-end">
            Promising
          </strong>{' '}
          <br />
        </p>
        <p className="text-secondary-text flex p-2">
          Tech/Community:
          <WrenchIcon className="ml-1 h-6 w-6 text-main-text" />{' '}
          <WrenchIcon className="ml-1 h-6 w-6 text-main-text" />{' '}
          <WrenchIcon className="ml-1 h-6 w-6 text-main-text" />
        </p>
        <p className="p-2">
          Course description or something goes here something something ......
        </p>
        <div className="card-actions pt-4 justify-end w-full border-t-2 border-dashed border-t-card-border-color-start">
          <button className="btn border-none h-[60px] w-[60px] rounded-full bg-like-btn hover:bg-gradient-to-br from-solana-start to-solana-end">
            <HeartIcon className="ml-1 h-6 w-6 text-main-text" />
          </button>
        </div>
      </div>
    </div>
  );
}

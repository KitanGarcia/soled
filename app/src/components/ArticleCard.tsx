export default function ArticleCard() {
  const placeholder = 'https://via.placeholder.com/300x220';
  const title = 'article title';
  const date = '23.02.2022';
  const description =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim minim mollit.';

  return (
    <div className="w-4/5 mt-5 bg-fg-color transition hover:delay-200 hover:shadow-md hover:border-highlight-color border-2 cursor-pointer border-card-border-color-start rounded-2xl">
      <div className="flex items-center">
        <div className="center flex">
          <img className="h-[220px] rounded-l-xl w-[300px]" src={placeholder} />
        </div>
        <div className="flex flex-col px-8">
          <p className="text-secondary-text font-light leading-6">{date}</p>
          <h1 className="py-4 text-xl leading-7 text-2xl text-main-text">
            {title.toUpperCase()}
          </h1>
          <p className="text-secondary-text font-light leading-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ArticleCard() {
  const placeholder = 'https://via.placeholder.com/300x220';
  const title = 'Article Title';
  const date = '23.02.2022';
  const description =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim minim mollit.';

  return (
    <div className="w-4/5 mt-5 bg-fg-color cursor-pointer">
      <div className="flex items-center">
        <div className="center flex items-center">
          <h1 className="leading-10 text-xl font-medium text-main-text opacity-75"></h1>
          <img className="h-[220px] w-[300px]" src={placeholder} />
        </div>
      </div>
    </div>
  );
}

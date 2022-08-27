import './MainPageFrame.css';

function MainPageFrame({ title, theme, children }) {
  return (
    <section className={theme ? `page-frame page-frame_theme_${theme}` : "page-frame"}>
      <h2 className='page-frame__title'>{title}</h2>
      {children}
    </section>
  );
}

export default MainPageFrame;

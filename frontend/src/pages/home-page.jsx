import { HomeFooter } from '../cmps/home-footer';
import { HomeHeader } from '../cmps/home-header';

export const HomePage = () => {
  return (
    <section className="home-page">
      <HomeHeader />
      <div>Home div</div>
      <HomeFooter />
    </section>
  );
};

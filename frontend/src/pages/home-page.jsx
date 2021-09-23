import { Link } from 'react-router-dom';
import { HomeFooter } from '../cmps/home-footer';
import { HomeHeader } from '../cmps/home-header';
import HeroImg from '../assets/img/hero.png';
import BoardImg from '../assets/img/board.png';
import ViewImg from '../assets/svg/view.svg';
import CardImg from '../assets/svg/card-back.svg'

export const HomePage = () => {
  return (
    <section className="home-page">
      <HomeHeader />
      <section className="hero">
        <div className="container flex align-center">
          <div>
            <h1>Swello helps teams move work forward.</h1>
            <p>Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is unique—accomplish it all with Swello.</p>
            <Link to="/" className="btn">Get Started-it's free!</Link>
          </div>
          <img src={HeroImg} alt="hero" />
        </div>
      </section>
      <section className="product">
        <div className="container flex column">
          <div>
            <h2>It’s more than work. It’s a way of working together.</h2>
            <p>Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows.
              Manage projects, organize tasks, and build team spirit—all in one place.</p>
            <p><Link to="/" className="btn">Start doing <span>→</span></Link></p>
          </div>
          <img src={BoardImg} alt="board" />
        </div>
      </section>
      <section className="features">
        <div className="container flex column">
          <div>
            <h2>Features to help your team succeed</h2>
            <p>Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and projects to events and goal setting,
              Trello’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.</p>
          </div>
          <div className="flex">
            <img src={ViewImg} alt="view" />
            <div className="txt">
              <h5>Choose a view</h5>
              <h2>The board is just the beginning</h2>
              <p>Lists and cards are the building blocks of organizing work on a Trello board.
                Grow from there with task assignments, timelines, productivity metrics, calendars, and more.</p>
            </div>
          </div>
          <div className="flex">
            <img src={CardImg} alt="card" />
            <div className="txt">
              <h5>Dive into the details</h5>
              <h2>Cards contain everything you need</h2>
              <p>Trello cards are your portal to more organized work—where every single part of your task can be managed, tracked, and shared with teammates.
                Open any card to uncover an ecosystem of checklists, due dates, attachments, conversations, and more.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="signup">
        <div className="container">
          <div className="form-container">
            <div className="content">
              <h3>Sign up and get started with Swello today. A world of productive teamwork awaits!</h3>
            </div>
            <div className="input-container flex">
              <input name="email" type="email" placeholder="Email" />
              <button>Sign up</button>
            </div>
          </div>
        </div>
      </section>
      <div className="pre-footer flex justify-center">Trello also works great on your smaller screen.</div>
      <HomeFooter />
    </section>
  );
};

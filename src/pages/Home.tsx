import { Link } from 'react-router-dom';
import routes from 'routes';
const Home: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">請選擇遊戲</h1>
      <nav>
        <ul className="game-list">
          {routes.map((route, index) => {
            if (
              route.path &&
              route.path !== '/' &&
              route.path !== '*' &&
              route.linkName
            ) {
              return (
                <li>
                  <Link key={index} to={route.path} className="link">
                    {route.linkName}
                  </Link>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Home;

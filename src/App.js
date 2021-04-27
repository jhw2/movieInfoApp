import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VisualTxt from './components/VisualTxt';
import menu from './menus';

const App = ()=>{
  const location = useLocation();
  console.log(location)
  const {menuList, menuInfo} = menu;
  let currentPage = '', pageTitle ='', pageInfo = '';
  if(location.state){
    currentPage = location.state.key;
    pageTitle = menuInfo[currentPage].title;
    pageInfo = menuInfo[currentPage].cont;
  }

  return (
    <div id="wrap">
      <Header menuList={menuList}></Header>
      <VisualTxt pageTitle={pageTitle} pageInfo={pageInfo}></VisualTxt>
      <section id="contents">
        <div className='group'>
          <div className='cont'>
            <Switch>
              {menuList.map((menu, i)=>{
                const { url, component, key } = menu;
                return  <Route key={key} exact path={url} component={component} />
              })}
            </Switch>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

export default App;

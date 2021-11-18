import './App.css';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, VisualTxt, Footer } from './components/layout'; 
import menu from './menus';
import Auth from './hoc/auth';

const App = ()=>{
  const {menuList} = menu;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    
  }, []);

  return (
    <div id="wrap" >
      <Header menuList={menuList}></Header>
      <VisualTxt></VisualTxt>
      <section id="contents">
        <div className='group'>
          <div className='cont'>
            <Switch>
              {menuList.map((menu, i)=>{
                const { url, component, key, auth } = menu;
                return  <Route key={key} exact path={url} component={Auth(component, auth)} />
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

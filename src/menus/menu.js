import DailyRank from '../components/DailyRank';
import WeeklyRank from '../components/WeeklyRank';
import MovieDetail from '../components/MovieDetail';
import ActorList from '../components/ActorList';
import ActorDetail from '../components/ActorDetail';

export const menuList = [
    {key: 'dailyRank', txt: '일간박스오피스', cont: '일간 박스오피스를 조회해보세요.', url: '/dailyRank', component: DailyRank, gnb: true},
    {key: 'weeklyRank', txt: '주간박스오피스', cont: '주간 박스오피스를 조회해보세요.', url: '/weeklyRank', component: WeeklyRank, gnb: true},
    {key: 'movieDetail', txt: '영화상세정보', cont: '영화상세정보를 확인하세요.', url: '/movieDetail/:movieCd/', component: MovieDetail, gnb: false},
    {key: 'actors', txt: '영화인정보', cont: '배우, 감독, 스텝 영화인을 검색해보세요.', url: '/actors', component: ActorList, gnb: true},
    {key: 'actorDetail', txt: '영화인상세정보', cont: '영화인상세정보를 확인하세요.', url: '/actorDetail/:peopleCd/', component: ActorDetail, gnb: false}
  ]
export let menuInfo = {};
menuList.forEach((menu, i)=>{
    const {key, cont, txt} = menu;
    menuInfo[key] = {};
    menuInfo[key].cont = cont;
    menuInfo[key].title = txt;
});

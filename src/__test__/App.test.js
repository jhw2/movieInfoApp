import { render, screen } from '@testing-library/react';
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainSlider from '../components/main/MainSlider';
configure({ adapter: new Adapter() });

let temp, connection;
describe("simple test", () => {

  //맨처음과 맨 끝에만 한번 실행되는 함수
  beforeAll(() => {
    //conection = openConnection({ host: "...", port: "..." });
  });
  afterAll(() => {
    //conection.close();
  });

  //beforeEach는 test()가 실행할 때마다 실행해주는 전처리기.
  beforeEach(() => {
    temp = 1;
  });
  //afterEach의 경우 test()가 종료될 때마다 실행하는 후처리. 테스트 한개 처리후 다시 초기화 해야 하는 변수가 있을 경우 응용 가능 
  afterEach(() => {
    temp = 0;
    console.log('test!!!!!');
  });

  /**
   * test("테스트 설명", () => {
      expect("검증 대상").toXxx("기대 결과");
    });
   */
  //toBe는 단순 비교, toEqual은 배열이나 객체 내부까지 깊은 비교.
  test('1 is 1', () => {
    expect(1).toBe(1);
  });
  test('[1,2,3] is [1,2,3]', () => {
    expect([1,2,3]).toEqual([1,2,3]);
  });


  /**
   * toThrow 함수를 이용하여 컴포넌트 출력 오류가 있는지 체크 
   * 프로퍼티 항목이 다른 코드에 영향을 주는지 확인하고 싶다면 모든 테스트 코드 과정에 이 부분 추가
   * ex) movieList props를 제거 시 movieList.length 구문에 오류가 생김
   */
  test('컴포넌트 출력오류 테스트', () => {
    const txt = 'test';
    expect(()=>{
      shallow(<MainSlider movieList={[]} title={txt} done={true} />);
    }).not.toThrow('error');
  });
    /**
   * enzyme shallow 함수를 이용해 컴포넌트를 불러온다. 
   * find함수를 통해 엘리먼트에 점근하며 props()함수를 통해 props 값을 가져 올 수 있음
   * ex) expect(mainSlider.find("h3").prop('children')).toBe(txt); 
   *     => 메인슬라이더 컴포넌트의 h3 엘리먼트에 접근해 텍스트값이 전달한 값과 같은지 비교
   */
  test('props 전달 테스트', () => {
    const txt = 'test';
    const mainSlider = shallow(<MainSlider movieList={[]} title={txt} done={true} />);
    const props = mainSlider.find(".mainSliderGrp").props();//mainSlider 컴포넌트의 .mainSliderGrp 엘리먼트가 가지고있는 pros를 가져온다
    console.log(props)
    expect(mainSlider.find("h3").prop('children')).toBe(txt); //엘리먼트의 텍스트값은 props명이 children으로 되어있음
  })



})

import React from 'react';
const axios = require("axios");
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import http from '../http/http-common-naver';
import MovieSearchService from '../http/MovieSearchService';
configure({ adapter: new Adapter() });

describe("MOCK test", () => {

/**
 * jset는 가짜 함수(mock functiton)를 생성할 수 있도록 jest.fn() 함수를 제공
 * mockReturnValue(리턴 값) 함수를 이용해서 가짜 함수가 어떤 값을 리턴해야할지 설정해줄 수 있음
 */
 const mockFn = jest.fn();
 mockFn.mockReturnValue("I am a mock!");
//어떤 인자를 넘겨도 retrun값은 "I am a mock!"
 mockFn();
 mockFn(1);
 mockFn("a");
 mockFn([1, 2], { a: "b" });
 
 //비슷한 방식으로 mockResolvedValue(Promise가 resolve하는 값) 함수를 이용하면 가짜 비동기 함수를 만들 수 있음.
  mockFn.mockResolvedValue("I will be a mock!");
  mockFn().then((result) => {
    console.log(result); // I will be a mock!
  });

  //뿐만 아니라 mockImplementation(구현 코드) 함수를 이용하면 아예 해당 함수를 통째로 즉석해서 재구현해버릴 수도 있음
  mockFn.mockImplementation((name) => `I am ${name}!`);
  console.log(mockFn("Dale")); // I am Dale!

  //테스트를 작성할 때 가짜 함수가 진짜로 유용한 이유는 가짜 함수는 자신이 어떻게 호출되었는지를 모두 기억한다는 점
  const mockFn2 = jest.fn();
  mockFn2("a");
  mockFn2(["b", "c"]);
  expect(mockFn2).toBeCalledTimes(2);//함수 실행된 횟수
  expect(mockFn2).toBeCalledWith("a");//인자값 검증
  expect(mockFn2).toBeCalledWith(["b", "c"]);


  /**
   * 어떤 객체에 속한 함수의 구현을 가짜로 대체하지 않고, 
   * 해당 함수의 호출 여부와 어떻게 호출되었는지만을 알아내야 할 때가 있습니다. 
   * 이럴 때, Jest에서 제공하는 jest.spyOn(object, methodName) 함수를 이용하면 됩니다.
   */

  test('spyOn test : MovieSearchService 객체의 getSearchPoster 함수를 스파잉 하는 테스트', async()=>{
    const spyGet = jest.spyOn(MovieSearchService, "getSearchPoster");
    const { data } = await MovieSearchService.getSearchPoster('스윙키즈');

    expect(spyGet).toBeCalledTimes(1);
    expect(spyGet).toBeCalledWith('스윙키즈');
  });

  test('영화 포스터 api call 함수 검증', async () => {
    /**
     * 실제 api를 call 할 경우 서버가 다운 됐거나 네트워크 단절 상황에서 테스트가 오류나게 됨
     * 테스트는 deterministic 해야한다. (언제 실행되든 항상 같은 결과를 내야한다.)”라는 원칙에 위배. 
     * 외부 환경에 의존되지 않도록 getSearchPoster를 Mocking하는 예제
     */
     http.get = jest.fn().mockResolvedValue({
        title: '스윙키즈',
        image: "https://ssl.pstatic.net/imgmovie/mdi/mit110/1641/164101_P62_155759.jpg",
    });

    const spyGet = jest.spyOn(http, "get");
    const realData = await MovieSearchService.getSearchPoster('스윙키즈');
    console.log(realData)
    expect(spyGet).toBeCalledTimes(1);
    expect(realData).toHaveProperty('image', 'https://ssl.pstatic.net/imgmovie/mdi/mit110/1641/164101_P62_155759.jpg');

    /* then을 쓸 경우 return을 해줘야 정상적인 테스트 결과가 나온다
      return MovieSearchService.MovieSearchService('스윙키즈').then((realData)=>{
        expect(spyGet).toBeCalledTimes(1);
     })
    */
  });

  

})

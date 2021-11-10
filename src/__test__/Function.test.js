import React from 'react';
const axios = require("axios");
import Adapter from 'enzyme-adapter-react-16';
import { getDayTxt, getDateObj } from '../utils/dayInfo';

describe("dayInfo Functions test", () => {

  // test.only("이 함수만 실행 됨", () => {
  // });
  // test.skip("이 함수만 제외 됨", () => {
  // });

  beforeEach(() => {
    //현재 날짜 고정하는 mock 함수
    Date.now = jest.fn(() => new Date(2021, 10, 4));
  });

  test("getDayTxt 함수 테스트 return 형식 YYYYMMDD", () => {
    const today = Date.now();
    console.log(today.getFullYear())
    const result = getDayTxt(today);

    expect(typeof result).toBe('string');
    expect(result).toBe('20211104');
  });

  test("getDateObj 함수 날짜 형식 잘못 넘길 경우 오류 처리 확인", () => {
    //toThrow() 사용시 반드시 expect() 함수에 넘기는 검증 대상을 함수로 한 번 감싸줘야 함
    expect(() => getDateObj('20211104;')).toThrow();
  });

  test("getDateObj 함수 return값 Date Object 맞는지 확인", () => {
    const result = getDateObj('20211104');

    expect(result.getFullYear()).toBe(2021);
    expect(result.getMonth()+1).toBe(11);
    expect(result.getDay()).toBe(4);
  });

})

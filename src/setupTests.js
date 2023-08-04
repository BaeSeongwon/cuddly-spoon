// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { matchers } from "@emotion/jest";

// emotion 문법의 style을 테스트할 수 있는 함수를 추가한다.
expect.extend(matchers);
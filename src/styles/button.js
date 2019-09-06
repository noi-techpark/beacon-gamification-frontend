import { css } from "lit-element";

export const buttonStyle = css`
  button,
  .btn {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #fff;
    border: 0.05rem solid #5755d9;
    border-radius: 0.1rem;
    color: #5755d9;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8rem;
    height: 1.8rem;
    line-height: 1.2rem;
    outline: 0;
    padding: 0.25rem 0.4rem;
    text-align: center;
    text-decoration: none;
    transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
`;

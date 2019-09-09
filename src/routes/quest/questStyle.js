import { css } from "lit-element";

export const questStyle = css`
  .quest_inspector_container {
    display: flex;
  }
  .quest_list {
    width: 20%;
    border-right: 1px solid #eaeaea;
  }
  .quest_list button {
    width: 100%;
  }
  p {
    margin: 0;
    padding: 0 8px;
  }
  .quest_list__element {
    padding: 16px 0;
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .quest_list__element button {
    width: auto;
  }
  .quest_list__element p {
    width: 60%;
  }
  .quest_list__element p:hover {
    text-decoration: underline;
  }
  .quest_steps_list {
    width: 40%;
    border-right: 1px solid #eaeaea;
  }
  .quest_steps_list button {
    width: 100%;
  }
  .quest_step {
    padding: 16px 0;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
  }
  .quest_step__content {
    width: 80%;
  }
  .quest_steps_list .quest_step button {
    width: 20%;
  }
`;

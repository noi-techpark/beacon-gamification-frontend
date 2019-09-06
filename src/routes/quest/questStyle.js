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
    padding: 0 16px;
  }
  .quest_list__element {
    padding: 16px 0;
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
  }
  .quest_list__element:hover {
    background-color: #eaeaea;
  }
  .quest_steps_list {
    width: 80%;
    padding: 16px 0;
  }
  .quest_step {
    padding: 16px 0;
    border-bottom: 1px solid #eaeaea;
  }
`;

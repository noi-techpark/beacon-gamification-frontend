import { css } from "lit-element";

export const questStyle = css`
  .quest_inspector_container {
    display: flex;
  }
  .quest_list {
    width: calc(20% - 2rem);
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .quest_list button {
    width: 100%;
  }
  p {
    margin: 0;
  }
  h3 {
    margin: 0.5rem 0 0 0;
    padding: 0 1rem;
  }
  .element_active {
    background-color: #eaeaea;
  }
  .quest_list__element {
    padding: 1rem;
    border-radius: 4px;
    margin-top: 0.5rem;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(50, 50, 93, 0.11);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .quest_list__element button {
    width: auto;
  }
  .quest_list__element p {
    width: 60%;
    cursor: pointer;
  }
  .quest_list__element p:hover {
    text-decoration: underline;
  }
  .quest_steps_list {
    width: 40%;
  }
  .quest_steps_list button {
    width: 100%;
  }
  .quest_step {
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid rgba(50, 50, 93, 0.11);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  .quest_step__content {
    width: 80%;
    cursor: pointer;
  }
  .quest_steps_list .quest_step button {
    width: auto;
  }
  .quest_steps_details {
    width: calc(40% - 1rem);
    margin-left: 1rem;
    padding: 1rem;
  }
  .quest_steps_details form {
    display: flex;
    flex-direction: column;
  }

  .quest_steps_details h3 {
    padding: 0px;
  }
`;

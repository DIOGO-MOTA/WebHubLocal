import styled from 'styled-components';

export const Container = styled.header`
  width: auto;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  color: #fff;

  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 2rem;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

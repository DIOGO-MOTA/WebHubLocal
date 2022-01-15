import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;

  max-width: 1120px;
  margin: 0 auto;

  padding: 2.5rem 1rem;

  flex-direction: column;
  align-items: center;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    tr {
      border: 0;
      margin-top: 10px;
    }

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
    }

    button {
      font-size: 1rem;
      color: #3e3b47;
      background: var(--background);
      border: 0;
      padding: 0 2rem;
      border-radius: 0.25rem;
      height: 3rem;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;

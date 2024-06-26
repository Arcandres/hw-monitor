import styled from "styled-components";


export const Container = styled.div`
    background-color: #2b2b2b;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
`;

export const StyledButton = styled.button`
  background-color: #f3eae8;
  color: #212830;
  border-radius: 4px;
  border: none;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  padding: 4px 8px;
  margin: 0 5px;
  &:hover {
    color: #212830;
    background-color: #f3eae8;
  }
  svg {
    margin-right: 8px;
  }
`;


export const ConfigContainer = styled.div`
    padding: 20px;
    background-color: #3a3a3a;
    color: white;
    border-radius: 10px;
    margin: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h2`
    text-align: center;
`;

export const SectionTitle = styled.h3`
    margin-top: 20px;
    margin-bottom: 10px;
`;

export const Separator = styled.hr`
    border: 0;
    height: 1px;
    background: #444;
    margin: 20px 0;
`;

export const Label = styled.label`
    display: block;
    margin: 10px 0;
`;

export const Input = styled.input`
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    background: #333;
    color: white;
    margin-top: 5px;
`;

export const ColorInput = styled.input`
    width: 50px;
    height: 30px;
    margin-left: 10px;
    border: none;
`;

export const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin: 5px 0;
`;

export const CheckboxInput = styled.input`
    margin-right: 10px;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ColorLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
`;

export const ColorLabelText = styled.span`
    flex: 1;
    margin-right: 10px;
`;

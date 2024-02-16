import { MapContainer } from "react-leaflet";
import styled from "styled-components";

type SListItemTextType = { primary: string };

export const SList = styled.ul`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  padding: 0.063rem;
  margin-top: 5rem;
  align-items: center;
  cursor: pointer;
  background: white;
  border-radius: var(--primary-border-radius);
  width: 100%;
  z-index: 20;
`;

export const SListItem = styled.li`
  display: flex;
  background-color: white;
  padding: 0.313rem 0;
  font-weight: bold;
  border-radius: var(--primary-border-radius);
  cursor: pointer;
  &:hover {
    background: #99bb58;
  }
`;

export const SListItemIcon = styled.div`
  text-align: left;
`;

export const SListItemText = styled.p<SListItemTextType>`
  text-align: left;
  color: #333;
  font-size: 0.875rem;
  font-family: Arial, sans-serif;
  font-weight: normal;
  font-style: normal;
  padding: 0.313rem;
`;

export const SDivider = styled.hr`
  height: 0.063rem;
  background-color: white;
  margin: 0.063rem 0;
`;

export const SMap = styled(MapContainer)`
  width: 100%;
  height: 18.75rem;
  z-index: 1;
  border-radius: 0.625rem;

  @media screen and (max-width: 48.75rem) {
    height: 12.5rem;
  }
`;

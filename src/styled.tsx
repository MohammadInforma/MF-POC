import styled from "@emotion/styled";
import {  PaginationLink } from "reactstrap";
import {defaultPaginationConfig} from './components/Pagination.tsx';


export const StyledPaginationLink = styled(PaginationLink)<{config?: any}>`
    ${({config=defaultPaginationConfig}) => ` 
        color: ${config.theme.pagination.color};
        font-weight: 600;
        font-size: 16px;
        border-radius: 50%;
        padding: 5px 12px;
        border: none;
        & *{
            color: ${config.theme.pagination.color};
        }
    `}
    
`;
import { Button, ButtonGroup } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useBudgets } from "../contexts/BudgetsContext";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";


export const FilterDate = () => {

    const { filterDate, setFilterDate } = useBudgets();
    const [show, setShow] = useState(false);
    const month = filterDate.month;
    const year = filterDate.year;

    const modalRef = useRef();

    const meses_abreviado =
        [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez'
        ];

    const closeOnClickOutside = (event) => {
        if (show && !modalRef.current.contains(event.target)) {
            setShow(false);
        }
    };


    useEffect(() => {
        document.addEventListener('click', closeOnClickOutside);
        return () => {
            document.removeEventListener('click', closeOnClickOutside);
        };
    });

    const handleYearChange = (option) => {
        if (option === 'next') {
            setFilterDate(prevDate => ({ ...prevDate, year: ++prevDate.year }))
        } else {
            setFilterDate(prevDate => ({ ...prevDate, year: --prevDate.year }))
        }
    }

    const handleDateStepChange = (option) => {
        if (option === 'next') {
            if (month === 11) {
                setFilterDate(prevDate => ({ ...prevDate, month: 0 }))
                setFilterDate(prevDate => ({ ...prevDate, year: prevDate.year+1 }))
            }
            else {
                setFilterDate(prevDate => ({ ...prevDate, month: prevDate.month + 1 }))
            }

        } else {
            if (month === 0) {
                setFilterDate(prevDate => ({ ...prevDate, month: 11 }))
                setFilterDate(prevDate => ({ ...prevDate, year: prevDate.year-1 }))
            }
            else {
                setFilterDate(prevDate => ({ ...prevDate, month: prevDate.month - 1 }))
            }
        }
    }

    const onClickMonth = (month) => {
        setFilterDate(prevDate => ({ ...prevDate, month }))
        setShow(false);
    }


    return (
        <Group className="me-auto" ref={modalRef}>
            <Button variant="outline-primary" onClick={handleDateStepChange}>
                <FaChevronLeft />
            </Button>
            <Button variant="outline-secondary" onClick={() => setShow((prev) => !prev)}>
                <span>{meses_abreviado[filterDate.month]} {filterDate.year}</span>
            </Button>
            <Button variant="outline-primary" onClick={() => handleDateStepChange("next")}>
                <FaChevronRight />
            </Button>
            <ModalPiker show={show}>
                <Years>
                    <Button variant="outline-primary" size="sm" onClick={handleYearChange} >
                        <FaChevronLeft />
                    </Button>
                    <span className="text-left" >{year}</span>
                    <Button variant="outline-primary" size="sm" onClick={() => handleYearChange("next")}>
                        <FaChevronRight />
                    </Button>
                </Years>

                {meses_abreviado.map((mes, index) =>
                    <Months active={month === index ? true : false} key={index} onClick={() => onClickMonth(index)}>{mes}</Months>
                )}
            </ModalPiker>
        </Group>
    )
};

const Group = styled(ButtonGroup)`
    min-width: 300px;
`;

const ModalPiker = styled.div`
    display: none;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    align-items: center;
    margin-inline: auto;
    padding: 0.2rem 0.3rem;
    position: absolute;
    z-index: 10;
    top: 100%;
    width: 100%;
    left: 0;
    background: #fff;
    border: 1px solid #ccc;


    ${props => props.show && 'display: grid;'}
`;

const Months = styled.div`
    cursor: pointer;
    user-select: none;
    text-align: center;
    font-size: 1.15rem;
    border-radius: 3px;
    line-height: 3.3rem;
    padding: 0.05rem .5rem;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        background: #ccc;
    }

    ${props => props.active && `
        background: #0d6efd;
        color: #fff;
        &:hover {
            background: #0d6efd;
            }
    `}

`;

const Years = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
    text-align: center;
    padding:0.5rem 1rem .5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    grid-column: 1 / -1;
    border-bottom: 1px solid #ccc;
`;
import React, { useState } from 'react';
import { Pathway } from '../App';
import "./CourseCard.css"
import {
	Button, Box, Image
} from "@chakra-ui/react"

export interface ICourseCard {
	courseName: string,
	courseNumber: string,
	pathway: Pathway,
	timeReq: number,
	professor: string,
	professorImg: string,
}

export interface ICourseCardProps extends ICourseCard {
	hours: number,
	setHours: (hours: number) => void
}

const getPathwayString = (pathway: Pathway) => {
	switch (pathway) {
		case 'ai': {
			return 'Artificial Intelligence'
		}
		case 'compbio': {
			return 'Computational Biology'
		}
		case 'architecture': {
			return 'Computer Architecture'
		}
		case 'data': {
			return "Data"
		}
		case 'design': {
			return "Design"
		}
		case 'security': {
			return "Security"
		}
		case 'systems': {
			return "Computer Systems"
		}
		case 'theory': {
			return "Theory"
		}
		case 'visual': {
			return 'Visual Computing'
		}
	}
}

export const CourseCard = (props: ICourseCardProps) => {
	const { courseName, courseNumber, pathway, timeReq, professor, hours, setHours, professorImg } = props

	const [selected, setSelected] = useState(false);

	const handleSelect = (timeReq: number) => {
		selected ? setHours(hours - timeReq) : setHours(hours + timeReq)
		setSelected(!selected)
	}
	return (
		<div className="coursecard-wrapper">
			<Image
				src={professorImg}
				alt='Professor Image'
				boxSize='60px'
				style={{ marginRight: 20 }}
				objectFit='cover'
			/>
			<div className="card-content">

				<div>

					<div>{`CSCI ${courseNumber}`}</div>
					<div className="coursename">{courseName}</div>
				</div>
				<div>
					<div>{getPathwayString(pathway)}, {`${timeReq} hr/week`}</div>
					<div>{`Prof. ${professor}`}</div>
				</div>
			</div>
			{selected ? (
				<Button colorScheme='teal' variant="solid" size='xs' onClick={() => handleSelect(timeReq)}>
					-
				</Button>
			) : (
				<Button colorScheme='teal' variant="outline" size='xs' onClick={() => handleSelect(timeReq)}>
					+
				</Button>)
			}
		</div >
	);
}
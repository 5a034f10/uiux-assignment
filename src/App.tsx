import * as React from "react"
import {
	ChakraProvider,
	Heading,
	theme,
	Select,
	FormControl,
	FormLabel
} from "@chakra-ui/react"
import "./App.css"
import { useState } from "react"
import { CourseCard, ICourseCard } from "./components/CourseCard"

export type Pathway = 'ai' | 'compbio' | 'architecture' | 'data' | 'design' | 'security' | 'systems' | 'theory' | "visual"
export type TimeReqType = "lessthan5" | "5to10" | "10to15" | "15to20" | "morethan20"

export const coursesArray: ICourseCard[] = [
	{
		courseName: "User Interface and User Experience",
		courseNumber: "1300",
		pathway: "design",
		timeReq: 8,
		professor: "Jeff Huang",
		professorImg: "https://vivo.brown.edu/profile-images/532/017/d77/d4d/4d5/994/fb0/a57/2ba/5e9/16/jeffh_photo_.jpg"
	},
	{
		courseName: "Introduction to Computing Foundations: Data",
		courseNumber: "0111",
		pathway: "data",
		timeReq: 13,
		professor: "Milda Zizyte",
		professorImg: "https://vivo.brown.edu/profile-images/098/a02/b3c/628/425/f88/aeb/d65/f0a/d11/d6/mzizyte_photo_.jpg"
	},
	{
		courseName: "Program Design with Data Structures and Algorithms",
		courseNumber: "0200",
		pathway: "systems",
		timeReq: 21,
		professor: "Kathi Fisler",
		professorImg: 'https://cs.brown.edu/~kfisler/Images/kathi-lab.jpg'
	},
	{
		courseName: "Intermediate 3D Computer Animation",
		courseNumber: "1280",
		pathway: "visual",
		timeReq: 27,
		professor: "Barbara J Meier",
		professorImg: "https://i1.rgstatic.net/ii/profile.image/502955930341376-1496925446245_Q512/Barbara-Meier-6.jpg"
	},
	{
		courseName: "Fundamentals of Computer Systems",
		courseNumber: "1310",
		pathway: "systems",
		timeReq: 19,
		professor: "Malte Schwarzkopf",
		professorImg: "https://people.csail.mit.edu/malte/images/malte-large.jpg"
	},
	{
		courseName: "Human Factors in Cybersecurity",
		courseNumber: "1360",
		pathway: "security",
		timeReq: 3,
		professor: "Ernesto R Zaldivar",
		professorImg: "https://watson.brown.edu/rhodes/files/rhodes/styles/personimage/public/imce/people/advisors/Ernesto%20Zaldivar.jpg?itok=oNEM9vba"
	},
	{
		courseName: "Distributed Computer Systems",
		courseNumber: "1380",
		pathway: "systems",
		timeReq: 20,
		professor: "Nikos Vasilakis",
		professorImg: "http://nikos.vasilak.is/img/sq-tiny.jpg"
	},
	{
		courseName: "Machine Learning",
		courseNumber: "1410",
		pathway: "ai",
		timeReq: 15,
		professor: "Stephen Bach",
		professorImg: "https://cs.brown.edu/people/sbach/img/headshot.jpg"
	},
	{
		courseName: "Computer Vision",
		courseNumber: "1430",
		pathway: "ai",
		timeReq: 10,
		professor: "James H Tompkin",
		professorImg: "https://vivo.brown.edu/profile-images/394/10/jtompki1_photo_.jpg"
	},
	{
		courseName: "Deep Learning",
		courseNumber: "1470",
		pathway: "ai",
		timeReq: 9,
		professor: "Ritambhara Singh",
		professorImg: "https://vivo.brown.edu/profile-images/9a6/bdd/03c/b9e/442/69c/6fd/fd5/822/fe2/00/rsingh47_photo_.jpg"
	},
	{
		courseName: "Applied Cryptography",
		courseNumber: "1515",
		pathway: "theory",
		timeReq: 13,
		professor: "Peihan Miao",
		professorImg: "https://lh4.googleusercontent.com/dLQSqkVI9ELkRi80tbvBmCwaqIrlOkw3twL-RMNBDHejNh-MGLoK-FkKMbIsLl5JNg1dQAjqfrgDcYVca6oav_7xuwceF3YYcaHaO7H9AIXZY3czBJeQ1D_GQzNaYJq9gdqc5N0l355YLmhZK40cuhF_RoIVjtdEQbdbmGorqfzO-VFDGHQym8kPm-86hHI=w1280"
	},
	{
		courseName: "Algorithmic Game Theory",
		courseNumber: "1440",
		pathway: "theory",
		timeReq: 17,
		professor: "Amy R Greenwald",
		professorImg: "https://cs.brown.edu/media/filer_public/07/85/0785fa57-ab65-4762-8c16-8ed184ad541a/amy-greenwald.png"
	},
	{
		courseName: "Computer Systems Security Lab",
		courseNumber: "1620",
		pathway: "security",
		timeReq: 5,
		professor: "Bernardo Palazzi",
		professorImg: "https://cs.brown.edu/media/filer_public_thumbnails/filer_public/88/43/88434588-9e60-4a2f-9b2b-3f24241fad9e/bernardo_palazzi.jpg__240x360_q85_crop-1_subsampling-2.jpg"
	},
	{
		courseName: "Operating Systems",
		courseNumber: "1670",
		pathway: "systems",
		timeReq: 35,
		professor: "Thomas W Doeppner",
		professorImg: "https://cs.brown.edu/media/filer_public_thumbnails/filer_public/82/77/827753b7-8a7b-4563-a71b-de52bee23718/preferred_2021.jpg__240x360_q85_crop-1_subsampling-2.jpg"
	},
	{
		courseName: "Computer Graphics",
		courseNumber: "1230",
		pathway: "visual",
		timeReq: 32,
		professor: "Daniel Ritchie",
		professorImg: "https://dritchie.github.io/img/me.jpg"
	},
]

export const App = () => {
	const [currentArray, setCurrentArray]: [ICourseCard[], any] = useState(coursesArray)
	const [pathwayState, setPathwayState]: [Pathway | undefined, any] = useState(undefined)
	const [timeReqState, setTimeReqState]: [TimeReqType | undefined, any] = useState(undefined)
	const [rankingState, setRankingState]: [boolean | undefined, any] = useState(false) // false is low to high
	const [hours, setHours] = useState(0)

	React.useEffect(() => {
		calcDisplayableCards()
	}, [pathwayState, timeReqState, rankingState])

	const changePathwayState = (e: any) => {
		const state = e.target.value
		if (state === "") {
			setPathwayState(undefined)
		} else {
			setPathwayState(state)
		}
	}

	const changeRankingState = (e: any) => {
		const state = e.target.value
		if (state === "hightolow") {
			setRankingState(true)
		} else {
			setRankingState(false)
		}
	}

	const changeTimeReqState = (e: any) => {
		const state = e.target.value
		if (state === "") {
			setTimeReqState(undefined)
		} else {
			setTimeReqState(state)
		}
	}


	const calcDisplayableCards = () => {
		let resultArray: ICourseCard[] = JSON.parse(JSON.stringify(coursesArray))
		console.log("sorting")
		// sort
		if (rankingState === false) {
			resultArray = resultArray.sort((a: ICourseCard, b: ICourseCard) => {
				return Number(a.courseNumber) - Number(b.courseNumber)
			})
		} else {
			resultArray = resultArray.sort((a: ICourseCard, b: ICourseCard) => {
				return Number(b.courseNumber) - Number(a.courseNumber)

			})
		}

		// filter by pathway
		if (pathwayState !== undefined) {
			resultArray = resultArray.filter((course) => {
				return (course.pathway === pathwayState)
			})
		}
		console.log(timeReqState)
		// filter by timereq
		if (timeReqState !== undefined) {
			resultArray = resultArray.filter((course) => {
				switch (timeReqState) {
					case 'lessthan5': {
						return (course.timeReq < 5)
					}
					case '5to10': {
						return (course.timeReq < 10 && course.timeReq >= 5)
					}
					case '10to15': {
						return (course.timeReq < 15 && course.timeReq >= 10)
					}
					case '15to20': {
						return (course.timeReq < 20 && course.timeReq >= 15)
					}
					case 'morethan20': {
						return (course.timeReq >= 20)
					}
				}
			})
		}

		setCurrentArray(resultArray)

	}

	return (
		<ChakraProvider theme={theme} >
			<div className="wrapper">
				<Heading as='h2' size='xl' className="heading">
					Brown Computer Science Course Picker
				</Heading>
				<div className="filter-wrapper">
					<FormControl className="filter" onChange={(e) => changePathwayState(e)}>
						<FormLabel>Pathways</FormLabel>
						<Select placeholder='All Pathways'>
							<option value='ai'>Artificial Intelligence</option>
							<option value='compbio'>Computational Biology</option>
							<option value='architecture'>Computer Architecture</option>
							<option value='data'>Data</option>
							<option value='design'>Design</option>
							<option value='security'>Security</option>
							<option value='systems'>Systems</option>
							<option value='theory'>Theory</option>
							<option value='visual'>Visual Computing</option>
						</Select>
					</FormControl>
					<FormControl className="filter" onChange={(e) => changeTimeReqState(e)}>
						<FormLabel>Time Requirement</FormLabel>
						<Select placeholder='No requirement'>
							<option value='lessthan5'>Less than 5 hours</option>
							<option value='5to10'>5 to 10 hours</option>
							<option value='10to15'>10 to 15 hours</option>
							<option value='15to20'>15 to 20 hours</option>
							<option value='morethan20'>More than 20 hours</option>
						</Select>
					</FormControl>
					<FormControl className="filter" onChange={(e) => changeRankingState(e)}>
						<FormLabel>Sort by Course Number</FormLabel>
						<Select>
							<option value='lowtohigh'>From low to high</option>
							<option value='hightolow'>From high to low</option>
						</Select>
					</FormControl>
					<div className="total-hours">
						<b>Total amount of work per week</b>
						<div>{hours} hours</div>
					</div>
				</div>
				<div className="courselist">
					{currentArray.map((course) => {
						return (
							<CourseCard
								key={course.courseNumber}
								courseName={course.courseName}
								courseNumber={course.courseNumber}
								pathway={course.pathway}
								timeReq={course.timeReq}
								professor={course.professor}
								hours={hours}
								setHours={setHours}
								professorImg={course.professorImg}
							/>)
					})}
				</div>
			</div>

		</ChakraProvider >
	)
}
